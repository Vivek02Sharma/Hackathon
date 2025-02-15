// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App


import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import Dashboard from "./components/Dashboard"
import LandingPage from "./components/LandingPage"
// import MaintenanceHistory from "./components/MaintenanceHistory"
// import Predictions from "./components/Predictions"
// import Equipment from "./components/Equipment"
import { AlertProvider } from "./contexts/AlertContext"

function App() {
  return (
    <Router>
      <AlertProvider>
        <div className="flex h-screen bg-gray-100">
          <Sidebar />
          <div className="flex-1 overflow-auto">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/dashboard" element={<Dashboard />} />

              {/* <Route path="/maintenance" element={<MaintenanceHistory />} /> */}
              {/* <Route path="/predictions" element={<Predictions />} /> */}
              {/* <Route path="/equipment" element={<Equipment />} /> */}
            </Routes>
          </div>
        </div>
      </AlertProvider>
    </Router>
    // <>
    // <h1>Hello Coders</h1>
    // </>
  )
}

export default App

