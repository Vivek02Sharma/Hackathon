import pandas as pd
from xgboost import XGBClassifier
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import pickle

df = pd.read_csv("sensor_dataset.csv")
X = df.drop('fail', axis = 1)
y = df['fail']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.20)
XGBoost =  XGBClassifier(subsample = 0.3, eval_metric = 'error', n_estimators = 500, max_depth = 7, learning_rate = 0.01, objective = 'binary:logistic')

XGBoost.fit(X_train, y_train)
y_pred = XGBoost.predict(X_test)
print(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"Accuracy: {accuracy * 100:.2f}%")

# with open('xgboost.pkl', 'wb') as file:
#     pickle.dump(XGBoost, file)

