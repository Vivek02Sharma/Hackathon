"use client";

import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { AlertCircle, CheckCircle } from "lucide-react";
import Footer from "./Footer";

export default function Dashboard() {
  const [fullData, setFullData] = useState([]);
  const [sensorData, setSensorData] = useState([]);
  const [alerts, setAlerts] = useState(0);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/sensors");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        const formattedData = data.map((item, i) => ({
          timestamp: new Date().toLocaleTimeString(), // FIXED: Dynamic Time
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

        setFullData(formattedData);
        setIndex(0);
      } catch (error) {
        console.error("Error fetching sensor data:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 3 * 60 * 1000); // Fetch every 3 minutes

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (fullData.length === 0) return;

    const updateChart = () => {
      setSensorData((prev) => {
        const nextIndex = index % fullData.length;
        setIndex((prevIndex) => prevIndex + 1);

        const newEntry = {
          ...fullData[nextIndex],
          timestamp: new Date().toLocaleTimeString(), // FIXED: Update Time Every 3s
        };

        return [...prev.slice(-9), newEntry]; // Keep last 10 points
      });

      setAlerts(fullData[index]?.fail > 0 ? 1 : 0);
    };

    const interval = setInterval(updateChart, 5 * 1000); // Update every 3s

    return () => clearInterval(interval);
  }, [fullData, index]);

  const sensorConfigs = [
    { key: "temperature", label: "Temperature", color: "#8884d8" },
    { key: "footfall", label: "Footfall", color: "#82ca9d" },
    { key: "uss", label: "Ultra Sonic Sensor", color: "#ff7300" },
    { key: "cs", label: "Current Sensor", color: "#ff0000" },
    { key: "voc", label: "Volatile Organic Compounds", color: "#00C49F" },
    { key: "rp", label: "Relative Pressure", color: "#0088FE" },
    { key: "ip", label: "Input Power", color: "#FFBB28" },
    { key: "aq", label: "Air Quality", color: "#FF8042" },
    { key: "tempMode", label: "Ambient Temperature Mode", color: "#A020F0" }
  ];

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
            <span>{alerts === 0 ? "System Healthy" : "Issues Detected"}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sensorConfigs.map(({ key, label, color }) => {
          const latestValue = sensorData.length > 0 ? sensorData[sensorData.length - 1][key] : "N/A";

          return (
            <div key={key} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-semibold">{label}</h3>
                <span className="text-gray-600 text-xs">{latestValue}</span>
              </div>

              <div className="h-[150px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sensorData.slice(-10)}>
                    <CartesianGrid strokeDasharray="5 5" stroke="#ddd" />
                    <XAxis dataKey="timestamp" tick={{ fontSize: 8 }} />
                    <YAxis domain={["auto", "auto"]} tick={{ fontSize: 8 }} />
                    <Tooltip />
                    <Line type="monotone" dataKey={key} stroke={color} strokeWidth={1.5} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Predictive Insights</h2>
        <div className="space-y-4">
          {alerts === 0 ? (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-medium">All systems operating within normal parameters</span>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <span className="font-medium">{alerts} issues detected. Check system logs.</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}