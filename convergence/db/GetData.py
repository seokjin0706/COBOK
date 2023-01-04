import ccxt
import pandas as pd
import datetime as datetime
import pymysql
import time
import sqlalchemy
from sqlalchemy import create_engine

def timestemp_to_int(dt):
    dt = datetime.datetime.timestamp(dt)
    dt = int(dt) * 1000
    return dt
# 미국 데이터 이므로 차이가 있을 수 있다.
def GetCoinData(start_date,TimeFrame = "1m",target_name = "BTC/USDT"):
    binance = ccxt.binance()
    col = ['datetime', 'open', 'high', 'low', 'close', 'volume']
    df = pd.DataFrame(columns = col)

    format = '%Y-%m-%d %H:%M:%S'
    start_date = datetime.datetime.strptime(start_date,format)
    start_date = timestemp_to_int(start_date)
    print(">> 데이터 수집중입니다...")
    while True:
        try:
            btc_ohlcv = binance.fetch_ohlcv(target_name,limit = 1500,timeframe = TimeFrame,since = start_date)
        except:
            print(">> 데이터 수집 오류입니다.")
            return df.drop(['datetime'],axis = 1)
        data = pd.DataFrame(btc_ohlcv,columns=col)
        data['datetime'] = pd.to_datetime(data['datetime'], unit='ms')
        data.set_index('datetime', inplace=True)

        if not btc_ohlcv:
            break
        else:
            df = pd.concat([df,data])
            start_date = btc_ohlcv[-1][0] + 1
        time.sleep(0.5)
    print(">> 데이터 수집 완료!")
    return df.drop(['datetime'],axis = 1)
def Create_db_table(name,frame):
    # STEP 2: MySQL Connection 연결
    print(">> MySql Connection중..")
    try:
        con = pymysql.connect(host='127.0.0.1', user='root', password='825582qaz',
                        db='CoinData', charset='utf8') # 한글처리 (charset = 'utf8')
        print(">> Connection complate!")
    except:
        print(">> Connection 실패")
        return False
    # STEP 3: Connection 으로부터 Cursor 생성
    cur = con.cursor()
    
    sql = '''CREATE TABLE '''+ name.replace('/','_')+'_'+frame +'''(
            timestamp datetime,
            open float(32),
            high float(32),
            low float(32),
            close float(32),
            volume float(32)
            )
    '''
    try:
        cur.execute(sql) # sql문  실행
        print(">> "+name.replace('/','_')+'_'+frame+" 테이블 생성 성공!")
    except pymysql.err.OperationalError:
        print(">> 테이블 생성 실패 : 이미 생성된 테이블입니다.")
        return False
    except pymysql.err.ProgrammingError:
        print(">> 테이블 생성 실패 : sql문 에러입니다.")
        return False
    return True
def Insert_db_table(df,name,frame):
    print(">> MySql Connection중..")
    try:
        db_connection_str = "mysql+pymysql://root:825582qaz@127.0.0.1/CoinData"
        db_connection = create_engine(db_connection_str)
        conn = db_connection.connect()
        print(">> Connection complate!")
    except:
        print(">> Connection 실패")
        return df
    df['timestamp'] = df.index
    dtypesql = {"timestamp":sqlalchemy.types.DateTime(), 
            'open':sqlalchemy.types.Float(32), 
            'high':sqlalchemy.types.Float(32),
            'low':sqlalchemy.types.Float(32),
            'close':sqlalchemy.types.Float(32),
            'volume':sqlalchemy.types.Float(32),
    }
    print(">> 데이터베이스에 데이터 업로드 시작")
    try:
        df.to_sql(name = name.replace('/','_')+'_'+frame,con = conn,if_exists='append',index=False,dtype = dtypesql)
        print(">> 데이터 업로드 성공!")
        return True
    except:
        print(">> 데이터 업로드 실패... 파라미터를 확인하세요")
        return df
def DataBase_to_CSV(table_name = "BTC_USDT_1d"):
    try:
        con = pymysql.connect(host='127.0.0.1', user='root', password='825582qaz',
                        db='CoinData', charset='utf8') # 한글처리 (charset = 'utf8')
        print(">> Connection complate!")
    except:
        print(">> Connection 실패")
        return False
    cur = con.cursor()
    sql = "select * from "+table_name 
    cur.execute(sql)
    result = cur.fetchall()
    con.close()
    df = pd.DataFrame(result,columns=["datetime","open","high","low",'close',"volume"])
    df.to_csv(table_name+".csv")
def Update_Data():
    # STEP 2: MySQL Connection 연결
    con = pymysql.connect(host='127.0.0.1', user='root', password='825582qaz',
                        db='CoinData', charset='utf8') # 한글처리 (charset = 'utf8')
    
    # STEP 3: Connection 으로부터 Cursor 생성
    cur = con.cursor()
    db_name_sql = '''SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'CoinData'
    ORDER BY TABLE_NAME;'''
    cur.execute(db_name_sql) # sql문  실행
    db_name_list = cur.fetchall()
    con.close()
    cur.close()
    
    split_data = []
    for i in db_name_list:
        split_data.append(i[0].split('_'))
    
    for i in range(len(split_data)):
        name = split_data[i][0] + '/' + split_data[i][1]
        frame = split_data[i][2]

        con = pymysql.connect(host='127.0.0.1', user='root', password='825582qaz',
                            db='CoinData', charset='utf8') # 한글처리 (charset = 'utf8')
        cur = con.cursor()
        DB_Feature_sql = "select * from "+str(split_data[i][0])+'_'+str(split_data[i][1])+'_'+str(split_data[i][2]) +" order by timestamp desc limit 1;"
        print(DB_Feature_sql)
        cur.execute(DB_Feature_sql) # sql문  실행
        db_Feature_list = cur.fetchall()
        con.close()
        cur.close()

        last_date = db_Feature_list[0][0]
        update_date = db_Feature_list[0][0] - datetime.timedelta(days=1)
        update_date = last_date.strftime("%Y-%m-%d %H:%M:%S")

        data = GetCoinData(update_date,TimeFrame = frame,target_name = name)
        data = data.loc[update_date:].iloc[1:]
        Insert_db_table(data,name,frame)
        
def CoinData_collection(name,frame,start_date):
    if not Create_db_table(name,frame): return
    data = GetCoinData(start_date,frame,name)
    Insert_db_table(data,name,frame)
    return data