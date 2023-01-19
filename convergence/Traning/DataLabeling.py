from tqdm import tqdm
import math
import pandas as pd
POSITIVE_INF = math.inf
NEGATIVE_INF = -math.inf
class DataLaeling():
    def __init__(self,lookahead_range,data,target_price = "close"):
        self.lookahead_range = lookahead_range
        self.target_price = target_price
        self.data = data
    def test(self,high_range,low_range):
        temp = [0 for i in range(len(self.data))]
        self.data['label'] = temp
        # 상승구간 0, 하락구간 1
        # 저점 먼저 시작
        if high_range[0][0] > low_range[0][0]:
            for i in tqdm(range(len(high_range))):
                for j in range(2):
                    if i == len(high_range)-1 and j == 1:
                        break
                    if j == 0:
                        idx = [self.data.index[k] for k in range(low_range[i+j][0],high_range[i][0])]
                        self.data.loc[idx,['label']] = 0
                    else:
                        idx = [self.data.index[k] for k in range(high_range[i][0], low_range[i+j][0])]
                        self.data.loc[idx,['label']] = 1
        # 고점 먼저 시작
        else:
            for i in tqdm(range(len(low_range))):
                for j in range(2):
                    if i == len(low_range)-1 and j == 1:
                        break
                    if j == 0:
                        idx = [self.data.index[k] for k in range(high_range[i+j][0],low_range[i][0])]
                        self.data.loc[idx,['label']] = 1
                    else:
                        idx = [self.data.index[k] for k in range(low_range[i][0], high_range[i+j][0])]
                        self.data.loc[idx,['label']] = 0
    def find_max(self,idx):
        for i in range(idx+1,idx + self.lookahead_range + 1):
            if self.data.iloc[i][self.target_price] > self.data.iloc[idx][self.target_price]:
                return False
        return True
    def find_min(self,idx):
        for i in range(idx+1,idx + self.lookahead_range + 1):
            if self.data.iloc[i][self.target_price] < self.data.iloc[idx][self.target_price]:
                return False
        return True
    def StartSearching(self):
        max_index = self.data[self.data[self.target_price] == max(self.data[self.target_price][:self.lookahead_range])].index[0]
        min_index = self.data[self.data[self.target_price] == min(self.data[self.target_price][:self.lookahead_range])].index[0]
        max_num = [i for i in range(len(self.data)) if max_index == self.data.index[i]][0]
        min_num = [i for i in range(len(self.data)) if min_index == self.data.index[i]][0]

        if max_index > min_index:
            Last_label = max_index
            ck,start = 1,max_num

            if not self.find_max(max_num):
                Last_label = min_index
                ck,start = 0,min_num

        elif min_index > max_index:
            Last_label = min_index
            ck,start = 0,min_num

            if not self.find_min(min_num):
                Last_label = max_index
                ck,start = 1,max_num

        return Last_label,ck,start
    def find_mid_point(self,start,end,target):
        result = POSITIVE_INF
        idx = 0
        for i in range(start,end + 1):
            if abs(target - self.data.iloc[i][self.target_price]) < result:
                result = abs(target - self.data.iloc[i][self.target_price])
                idx = i
        return idx
    def labeing(self):
        Last_label, ck, start_index = self.StartSearching()
        temp_line = []
        high_label = []
        low_label = []

        if ck == 0:
            temp_line.append(start_index-1)
            temp_line.append(self.data.index[start_index-1])
            low_label.append(temp_line)

            max = self.data.iloc[start_index-1][self.target_price]
            previous_min = self.data.iloc[start_index-1][self.target_price]
            min = POSITIVE_INF
        else:
            temp_line.append(start_index-1)
            temp_line.append(self.data.index[start_index-1])
            high_label.append(temp_line)

            previous_max = self.data[self.target_price][start_index-1]
            min_index = [start_index-1]
            min = self.data[self.target_price][start_index-1]
            max = NEGATIVE_INF

            temp_index = 0
        for i in tqdm(range(start_index,len(self.data)-self.lookahead_range)):
            line = []
            if ck == 0: # 고점을 찾는다
                if self.data.iloc[i][self.target_price] > max and self.data.iloc[i][self.target_price] >= previous_min: # 만약 현재 인덱스 값이 max보다 클시
                    if self.data.iloc[i+1:i+self.lookahead_range+1][self.target_price].max() < self.data.iloc[i][self.target_price]: # 만약에 앞에 term일 동안 더 큰 값이 없으면 고점이라고 판단
                        line.append(i)
                        line.append(self.data.index[i])
                        high_label.append(line)
                        previous_max = self.data.iloc[i][self.target_price]
                        max = NEGATIVE_INF
                        ck = 1

                        temp_index = i
                    elif not self.find_max(i): # 만약 앞에 term일 동안 더 큰 값이 있으면 고점이 아님 , max값만 업데이트
                        max = self.data.iloc[i][self.target_price]
            elif ck == 1: # 저점을 찾는다.
                if self.data.iloc[i][self.target_price] < min and self.data.iloc[i][self.target_price] <= previous_max:
                    if self.data.iloc[i+1:i+self.lookahead_range+1][self.target_price].min() > self.data.iloc[i][self.target_price]:
                        line.append(i)
                        line.append(self.data.index[i])
                        low_label.append(line)
                        previous_min = self.data.iloc[i][self.target_price]
                        min = POSITIVE_INF
                        ck = 0

                        temp_index = i
                    elif not self.find_min(i):
                        min = self.data.iloc[i][self.target_price]
        last_index = -1
        for i in range(temp_index,len(self.data)):
            
            if self.data.iloc[i][self.target_price] == max:
                last_index = i
            
            elif self.data.iloc[i][self.target_price] == min:
                last_index = i
            
            elif self.data.iloc[i][self.target_price] > max and ck == 0:
                last_index = i
                max = self.data.iloc[i][self.target_price]
            
            elif self.data.iloc[i][self.target_price] < min and ck == 1:
                last_index = i
                min = self.data.iloc[i][self.target_price]
            
        if ck == 0:
            line.append(last_index)
            line.append(self.data.index[last_index])
            high_label.append(line)
        else:
            line.append(last_index)
            line.append(self.data.index[last_index])
            low_label.append(line)

        self.test(high_label,low_label)
data = pd.read_csv('Coin_Data/BTC_USDT_1d.csv')
BackTesting_Bot = DataLaeling(70,data)
BackTesting_Bot.labeing()
print(BackTesting_Bot.data)