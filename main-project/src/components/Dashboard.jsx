"use client"

import React from "react"
import { useState, useEffect } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { AlertCircle, CheckCircle } from "lucide-react"
import Footer from "./Footer"

// interface SensorData {
//   timestamp: string
//   temperature: number
//   vibration: number
//   pressure: number
// }

export default function Dashboard() {
  const [sensorData, setSensorData] = useState([])
  const [alerts, setAlerts] = useState(0)

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      const newData = {
        timestamp: new Date().toLocaleTimeString(),
        temperature: Math.random() * 100 + 50,
        vibration: Math.random() * 10,
        pressure: Math.random() * 50 + 100,
      }

      setSensorData((prev) => [...prev.slice(-20), newData])
    }, 1000)

    return () => clearInterval(interval)
  }, [])

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

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Temperature</h3>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sensorData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Footfall</h3>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sensorData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="vibration" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Ultra Sonic Sensor</h3>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sensorData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="pressure" stroke="#ffc658" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
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
  )
}

