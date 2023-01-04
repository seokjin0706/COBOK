import pandas_ta as pta, pandas as pd, numpy as np

def add_rsi(entire_df,data_name = 'close',period = 14):
    rsi = pta.rsi(entire_df[data_name], length=period)
    entire_df['rsi'+'_'+str(period)] = rsi
    return entire_df

def add_ma(entire_df, data_name = 'close',period = 20):
    entire_df['mean'+'_'+str(period)] = entire_df[data_name].rolling(window=period).mean()
    return entire_df

def add_ema(df, period: int = 30):
    array = df['close']
    ema = pta.ma("ema", pd.Series(array.astype(float)), length=int(period))
    df['ema'+'_'+str(period)] = ema
    return df

def add_stochastic(df,n = 14,m = 5,t = 5):
    ndays_high = df.high.rolling(window = n,min_periods = 1).max()
    ndays_low = df.low.rolling(window = n,min_periods = 1).min()
    fast_k = ((df.close - ndays_low) / (ndays_high - ndays_low)) * 100
    slow_k = fast_k.ewm(span=t).mean()
    slow_d = slow_k.ewm(span=t).mean()

    df = df.assign(fast_k = fast_k, fast_d = slow_k, slow_k = slow_k, slow_d = slow_d)
    return df

def add_bb(df,length = 20,std = 2):
    currunt_close = df["close"]
    currunt_upper_bollinger_band = pta.bbands(df["close"], length = length, std = std)

    df = df.assign(BBL = currunt_upper_bollinger_band['BBL_'+str(length)+'_2.0'],BBM = currunt_upper_bollinger_band['BBL_'+str(length)+'_2.0'],
    BBU = currunt_upper_bollinger_band['BBL_'+str(length)+'_2.0'],BBP = currunt_upper_bollinger_band['BBL_'+str(length)+'_2.0'])

    return df
def add_kdj(df,high=None, low=None, close=None, length=None, signal=None, offset=None):
    temp = pta.kdj(high=df.high,low=df.low,close=df.close)
    df = pd.concat([df,temp],axis=1)
    return df
# def add_macd(df,macd_short = 12, macd_long = 26, macd_signal = 9):
#     macd_short, macd_long, macd_signal=12,26,9 #기본값

#     df["MACD_short"]=df["close"].ewm(span=macd_short).mean()

#     df["MACD_long"]=df["close"].ewm(span=macd_long).mean()

#     df["MACD"]=df.apply(lambda x: (x["MACD_short"]-x["MACD_long"]), axis=1)

#     df["MACD_signal"]=df["MACD"].ewm(span=macd_signal).mean()  

#     df["MACD_oscillator"]=df.apply(lambda x:(x["MACD"]-x["MACD_signal"]), axis=1)

#     return df
def add_macd(
    df: np.ndarray,
    fast_period: int = 12,
    slow_period: int = 26,
):

    temp = pta.macd(
        df.close,
        fast=int(fast_period),
        slow=int(slow_period),
        signal=9,
    )
    df = pd.concat([df,temp],axis=1)
    return df
def add_disparity(df,period = 20):
    # 종가기준으로 이동평균선 값을 구함
    ma = df["close"].rolling(period).mean()

    # 시가가 이평선 기준으로 얼마나 위에 있는지 구함
    df['disparity'] = 100*(df["open"]/ma)
    return df
# df = download_data(since = '2021-01-01 00:00:00').get_data()
# entire_df = add_macd(df)
# print(entire_df)