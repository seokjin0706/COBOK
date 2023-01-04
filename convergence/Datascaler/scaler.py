import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.preprocessing import MinMaxScaler
def Data_StandardScaler(data):
    scaler = StandardScaler()
    try:
        scaler.fit(data)
        scalering_data = scaler.transform(data)
        scalering_data = pd.DataFrame(data = scalering_data, columns=data.columns)

    except ValueError:
        data = data.set_index("datetime")
        scaler.fit(data)
        scalering_data = scaler.transform(data)
        scalering_data = pd.DataFrame(data = scalering_data, columns=data.columns)
        scalering_data = scalering_data.set_index(data.index)

    return scalering_data

def MinMaxScaling():
    mms = MinMaxScaler()
    try:
        mms.fit(data)
        scaled_data = mms.transform(data)
        scaled_data = pd.DataFrame(data = scaled_data, columns=data.columns)

    except ValueError:
        data = data.set_index("datetime")
        mms.fit(data)
        scaled_data = mms.transform(data)
        scaled_data = pd.DataFrame(data = scaled_data, columns=data.columns)
