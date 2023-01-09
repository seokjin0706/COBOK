import ccxt
import joblib
import time
import numpy as np
import pandas as pd
import sys
import json
from keras.models import load_model
from datetime import datetime
sys.path.append("/Users/yuhyeonseog/COBOK/COBOK/convergence/indicator")
from DATA_INDICATORS import *
def download_data(frame):
  binance = ccxt.binance()
  btc_ohlcv = binance.fetch_ohlcv("BTC/USDT",limit = 500,timeframe=frame)
  df = pd.DataFrame(btc_ohlcv, columns=['datetime', 'open', 'high', 'low', 'close', 'volume'])
  df['datetime'] = pd.to_datetime(df['datetime'], unit='ms')
  df.set_index('datetime', inplace=True)
  return df
def buy(Account,price):
  Account["average_price"] = ( ( Account["amount"] * Account["average_price"] ) + ( price * 0.01 ) ) / ( Account["amount"] + 0.01 )
  Account["amount"] += 0.01
  return Account

def sell(Account,price):
  Account["result"] += (price - Account["average_price"]) * Account["amount"]
  Account["amount"] = 0
  Account["average_price"] = 0
  return Account
def timestemp_to_int(dt):
    dt = datetime.timestamp(dt)
    dt = int(dt) * 1000
    return dt
def info(binance, info_data):
  balance = binance.fetch_balance(params={"type": "future"})
  Now_price = binance.fetch_ticker("BTC/USDT")["close"]
  positions = balance['info']['positions']
  for position in positions:
      if position["symbol"] == "BTCUSDT":
          Now_price = float(binance.fetch_ticker("BTC/USDT")["close"])
          entry_price = float(position["entryPrice"])
          leverage = float(position["leverage"])
          Margin = float(position["positionInitialMargin"])
          amount = position["positionAmt"]
          ROE = round((Now_price - entry_price) / Now_price * leverage * 100 ,2)
          print("현재 코인 가격 :",Now_price)
          print("현재 보유 수량 :",amount) # 수량
          print("현재 평단가 :",entry_price) # 진입가격 -> 평단가       
          print("현재 적용 레버리지 :",position["leverage"]) # 레버리지
          if float(position["positionAmt"]) == 0.0:
            info_data["profit_rate"] = 0.0
            print("현재 포지션 수익률 :",0.0,"%")
          else:
            info_data["profit_rate"] = ROE
            print("현재 포지션 수익률 :",ROE,"%")
          print("현재 포지션 수익(달러) :",round(ROE/100 * Margin,2),"$")
          info_data["profit"] = round(ROE/100 * Margin,2)
  info_data["quantity"] = amount
  info_data["average"] = entry_price
  info_data["profit_rate"] = entry_price
def Re_ROE(binance):
  balance = binance.fetch_balance(params={"type": "future"})
  Now_price = binance.fetch_ticker("BTC/USDT")["close"]
  positions = balance['info']['positions']
  for position in positions:
      if position["symbol"] == "BTCUSDT":
          Now_price = float(binance.fetch_ticker("BTC/USDT")["close"])
          entry_price = float(position["entryPrice"])
          leverage = float(position["leverage"])
          ROE = round((Now_price - entry_price) / Now_price * leverage * 100 ,2)
          break
  return ROE

def Re_Amount(binance):
  balance = binance.fetch_balance(params={"type": "future"})
  Now_price = binance.fetch_ticker("BTC/USDT")["close"]
  positions = balance['info']['positions']
  amount = 0
  for position in positions:
      if position["symbol"] == "BTCUSDT":
          amount = position["positionAmt"]
          break
  return amount

def Get_Trading_Data():
    df = pd.read_csv("Data/Trading_Data.csv")
    result = df.to_json(orient="split")
    parsed = json.loads(result)
    json_data = json.dumps(parsed)
    return json_data

def trade(api_key,secret):
  Account = {
    "result" : 0,
    "amount" : 0,
    "average_price" : 0
  }
  info_data = {
    "raw_Time" : 0,
    "time" : 0,
    "quantity" : 0,
    "average" : 0,
    "leverage" : 0,
    "quantity" : 0,
    "profit_rate" :0,
    "profit" : 0,
    "signal" : 0,
    "total_profit" : 0,
  }
  model = load_model("model/keras_DNN_modelV2")
  binance = ccxt.binance(config={
    'apiKey': api_key, 
    'secret': secret,
    'enableRateLimit': True,
    'options': {
        'defaultType': 'future'
        }
    })
  leverage = 10
  markets = binance.load_markets()
  symbol = "BTC/USDT"
  market = binance.market(symbol)
  resp = binance.fapiPrivate_post_leverage({
      'symbol': market['id'],
      'leverage': leverage
  })
  buy_min = -1
  while(True):
    data = download_data('1m')
    df1 = data
    df1 = add_rsi(df1)
    df1 = add_ma(df1,period=7)
    df1 = add_ema(df1,period=7)
    df1 = add_ma(df1,period=25)
    df1 = add_ema(df1,period=25)
    df1 = add_ma(df1,period=99)
    df1 = add_ema(df1,period=99)
    df1 = add_stochastic(df1)
    df1 = add_bb(df1,length=21)
    df1 = add_disparity(df1,period=25)
    df1 = add_macd(df1)
    df1 = add_kdj(df1)
    df1 = df1.dropna()


    x = df1.iloc[-10:]
    pred = model.predict(x)

    Trading_Flag = -1

    if pred[-1][0] > 0.92:
      Trading_Flag = 1
    elif pred[-1][0] < 0.1:
      Trading_Flag = 0

    now = datetime.now()
    now_min = now.minute

    # 이전과 시간이 다르므로 조건 만족시 구매 
    if buy_min != now_min and Trading_Flag == 1:
      # order = binance.create_market_buy_order(
      # symbol="BTC/USDT",
      # amount=0.001)
      Account = buy(Account,df1.iloc[-1]['open'])
      buy_min = now_min

    elif Trading_Flag == 0 and Account["amount"] >= 0.01 and 0.15 * leverage <= Re_ROE(binance):
      # order = binance.create_market_sell_order(
      # symbol="BTC/USDT",
      # amount=float(Re_Amount()) )
      Account = sell(Account,df1.iloc[-1]['open'])


    print("==============================================")
    print("현재 time:",now.strftime('%Y-%m-%d %H:%M:%S'))
    info(binance,info_data)
    print("매수매도 시그널(1:매수, 0:매도, -1:관망) :",Trading_Flag)
    print("토탈 수익:",Account["result"])
    info_data["time"] = now.strftime('%Y-%m-%d %H:%M:%S')

    format = '%Y-%m-%d %H:%M:%S'
    int_date = datetime.strptime(info_data["time"],format)
    info_data["raw_Time"] = timestemp_to_int(int_date)
    info_data["signal"] = Trading_Flag
    info_data["total_profit"] = Account["result"]
    Info_Df = pd.DataFrame.from_dict([info_data])
    Info_Df.to_csv("Data/Trading_Data.csv")
    time.sleep(5)