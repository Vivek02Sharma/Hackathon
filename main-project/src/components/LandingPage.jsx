import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import Footer from "./Footer"

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div
        className="relative h-screen flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url('https://www.pragmaworld.net/wp-content/uploads/AdobeStock_328914876-1-1320x743.jpeg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />

        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Predict Tomorrow's Maintenance
            <span className="text-custom-gray"> Today</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-200">
            Advanced AI-powered predictive maintenance system that helps you prevent equipment failures before they
            occur
          </p>
          <Link
            to="/dashboard"
            className="inline-flex items-center px-8 py-3 text-lg font-medium text-white bg-custom-gray rounded-lg hover:bg-custom-gray-dark transition-colors duration-300"
          >
            Try Out
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose SensoPredict?</h2>
            <p className="text-xl text-gray-600">Empowering industries with intelligent maintenance solutions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-custom-gray rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-custom-gray-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-time Monitoring</h3>
              <p className="text-gray-600">
                Get instant insights into your equipment's performance with real-time sensor data analysis
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-custom-gray rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-custom-gray-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Predictive Analytics</h3>
              <p className="text-gray-600">Advanced AI algorithms predict potential failures before they occur</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-custom-gray rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-custom-gray-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Cost Reduction</h3>
              <p className="text-gray-600">
                Minimize downtime and optimize maintenance schedules to reduce operational costs
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
