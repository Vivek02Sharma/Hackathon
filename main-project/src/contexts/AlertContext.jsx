"use client";

import { createContext, useContext, useState } from "react";

const AlertContext = createContext(undefined);

export function AlertProvider({ children }) {
  const [alerts, setAlerts] = useState([]);

  const addAlert = (alert) => {
    const newAlert = {
      ...alert,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
    };
    setAlerts((prev) => [...prev, newAlert]);
  };

  const removeAlert = (id) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  return (
    <AlertContext.Provider value={{ alerts, addAlert, removeAlert }}>
      {children}
    </AlertContext.Provider>
  );
}

export function useAlerts() {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error("useAlerts must be used within an AlertProvider");
  }
  return context;
}
