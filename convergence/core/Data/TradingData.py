import pandas as pd
import os
def getTradingData():
    data = pd.read_csv(os.path.dirname(__file__) + "/TradingData.csv").drop(['Unnamed: 0'],axis = 1)
    result = {}
    for i in data.columns:
        result[i] = str(data[i].iloc[0])

    return result