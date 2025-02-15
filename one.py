import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression  
from sklearn.metrics import mean_squared_error
import matplotlib.pyplot as plt
import datetime

np.random.seed(0) 
n_samples = 100
dates = pd.date_range(start='2023-01-01', periods=n_samples)
pm25 = np.random.uniform(10, 50, n_samples) + np.sin(np.linspace(0, 10, n_samples)) * 10  
temperature = np.random.uniform(10, 30, n_samples)  
humidity = np.random.uniform(40, 80, n_samples)  
df = pd.DataFrame({'Date': dates, 'PM25': pm25, 'Temperature': temperature, 'Humidity': humidity})
df.set_index('Date', inplace=True)
df['DayOfWeek'] = df.index.dayofweek
df['Month'] = df.index.month

X = df[['Temperature', 'Humidity', 'DayOfWeek', 'Month']] 
y = df['PM25']  
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = LinearRegression()  
model.fit(X_train, y_train)
y_pred = model.predict(X_test)
rmse = np.sqrt(mean_squared_error(y_test, y_pred))
print(f"RMSE: {rmse}")
future_date = pd.to_datetime('2023-04-01')
future_data = pd.DataFrame({'Temperature': [25], 'Humidity': [60], 'DayOfWeek': [future_date.dayofweek], 'Month': [future_date.month]}, index=[future_date])
predicted_pm25 = model.predict(future_data)
print(f"Predicted PM2.5 for {future_date}: {predicted_pm25[0]}")
plt.figure(figsize=(10, 6))
plt.plot(df.index, df['PM25'], label='Actual PM2.5')
plt.plot(X_test.index, y_pred, label='Predicted PM2.5 (Test)')
plt.scatter(future_date, predicted_pm25, color='red', label='Future Prediction') 
plt.xlabel('Date')
plt.ylabel('PM2.5 Level')
plt.title('Air Quality Monitoring and Prediction')
plt.legend()
plt.grid(True)
plt.show()