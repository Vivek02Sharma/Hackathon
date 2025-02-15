"use client"

import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { AlertCircle, CheckCircle } from "lucide-react";
import Footer from "./Footer";

export default function Dashboard() {
  const [sensorData, setSensorData] = useState([]);
  const [alerts, setAlerts] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/sensors");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        const formattedData = data.map((item) => ({
          timestamp: new Date().toLocaleTimeString(),
          footfall: item.footfall,
          tempMode: item.tempMode,
          aq: item.AQ,
          uss: item.USS,
          cs: item.CS,
          voc: item.VOC,
          rp: item.RP,
          ip: item.IP,
          temperature: item.Temperature,
          fail: item.fail,
        }));

        setSensorData((prev) => [...prev.slice(-20), ...formattedData]);
      } catch (error) {
        console.error("Error fetching sensor data:", error);
      }
    };

    // Fetch data initially and then every 5 seconds
    fetchData();
    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 space-y-6 mt-20">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Real-time Monitoring Dashboard</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-yellow-600">
            <AlertCircle className="w-5 h-5" />
            <span>{alerts} Active Alerts</span>
          </div>
          <div className="flex items-center space-x-2 text-green-600">
            <CheckCircle className="w-5 h-5" />
            <span>System Healthy</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {[
          { key: "temperature", label: "Temperature" },
          { key: "footfall", label: "Footfall" },
          { key: "uss", label: "Ultra Sonic Sensor" },
          { key: "cs", label: "Current Sensor" },
          { key: "voc", label: "Volatile Organic Compounds" },
          { key: "rp", label: "Relative Pressure" },
          { key: "ip", label: "Input Power" },
          { key: "aq", label: "Air Quality" },
          { key: "tempMode", label: "Ambient Temperature Mode" },
          { key: "fail", label: "Fail" },
        ].map(({ key, label }) => (
          <div key={key} className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">{label}</h3>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sensorData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timestamp" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey={key} stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Predictive Insights</h2>
        <div className="space-y-4">
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-medium">All systems operating within normal parameters</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}
