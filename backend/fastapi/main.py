from fastapi import FastAPI, status
import sys, os
sys.path.append(os.path.dirname(__file__) + "/../../convergence/core")
from AutoTrading import trade
from Data.TradingData import getTradingData
app = FastAPI()

from pydantic import BaseModel

class User(BaseModel):
    userName : str
    apiKey : str
    apiSecretKey :str


@app.get("/api/{coinId}/auto-trading")
def autoTrading(coinId, user: User):
    trade(user.apiKey, user.apiSecretKey)
    return {"message" : "done"}

@app.get("/api/{coinId}/auto-trading-data")
def autoTradingData():
    return getTradingData()
