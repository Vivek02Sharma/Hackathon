const API_URL = "http://localhost:5000/api/sensors"; 


export async function fetchSensorData() {
    try {
        console.log("🔄 Fetching data from:", API_URL);
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("✅ Data received:", data);

        return data;
    } catch (error) {
        console.error("❌ Error fetching sensor data:", error.message);
        throw error;
    }
}
