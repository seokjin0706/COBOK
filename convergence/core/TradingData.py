import pandas as pd
import json

def GetTradingData():
    data = pd.read_csv("Data/TradingData.csv").drop(['Unnamed: 0'],axis = 1)
    result = {}
    for i in data.columns:
        result[i] = str(data[i].iloc[0])

    return result