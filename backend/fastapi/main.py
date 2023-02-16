from fastapi import FastAPI, status
import sys, os
sys.path.append(os.path.dirname(__file__) + "/../../convergence/core")
from AutoTrading import trade
from Data.TradingData import getTradingData
app = FastAPI()
from pydantic import BaseModel

from fastapi.middleware.cors import CORSMiddleware
origins = [
    "http://localhost:3001",
    "http://localhost:3000",
    "http://localhost:8080",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
class User(BaseModel):
    userName : str
    apiKey : str
    apiSecretKey :str


@app.post("/api/{coinId}/auto-trading")
def autoTrading(coinId, user: User):
    trade(user.apiKey, user.apiSecretKey)
    return {"message" : "done"}

@app.get("/api/{coinId}/auto-trading-data")
def autoTradingData():
    return getTradingData()
