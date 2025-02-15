import time
from datetime import datetime
import pickle
import pandas as pd
from pymongo import MongoClient

MONGO_URL = "mongodb://localhost:27017/sensor"

# MongoDB Configuration
client = MongoClient(MONGO_URL)
mydb = client["sensor"]
collection = mydb["sensor-dataset"]
cursor = collection.find()
df = pd.DataFrame(list(cursor))
df = df.drop(["_id", "fail"], axis=1)

alert_db = client["alert-database"]
alert_collection = alert_db["alerts"]

# Load the saved model
with open('xgboost.pkl', 'rb') as file:
    loaded_model = pickle.load(file)

print("Model loaded successfully!")

# Function to run predictions and store alerts
def run_predictions_and_create_alerts():
    try:
        alerts = []
        for i in range(len(df)):
            data_point = df.iloc[i:i+1]
            probability = loaded_model.predict(data_point)[0]

            if probability == 1:
                sensor_data = data_point.to_dict(orient="records")[0]
                sensor_data = {key: (value.item() if isinstance(value, pd.Timestamp) else value) for key, value in sensor_data.items()}

                alert_message = {
                    "timestamp": datetime.fromtimestamp(time.time()),
                    "sensor_data": sensor_data,
                    "failure_probability": int(probability),
                    "alert_message": "High probability of equipment failure detected."
                }
                alerts.append(alert_message)

                alert_collection.insert_one(alert_message)
                print(f"Alert saved: {alert_message}")

        if alerts:
            print(f"{len(alerts)} alerts created.")
        else:
            print("No alerts created.")

    except Exception as e:
        print(f"Error in prediction or alert creation: {e}")

# Run the function to create alerts
run_predictions_and_create_alerts()
# time.sleep(5)

