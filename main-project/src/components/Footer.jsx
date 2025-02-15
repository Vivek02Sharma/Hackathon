import React from 'react'
// import { Button } from "./ui/button.tsx";
// import { Input } from "./ui/input.tsx";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  User,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-custom-gray text-black py-12">

        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div>
            <h4 className="text-2xl font-bold mb-4">SensoPredict</h4>
            <p>
              Advanced AI-powered predictive maintenance system that helps you prevent equipment failures before they occur
            </p>
          </div>

          <div>
            <h5 className="text-xl font-semibold mb-4">Quick Links</h5>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-blue-400">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400">
                  Our Causes
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400">
                  Get Involved
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400">
                  Contact
                </a>
              </li>
            </ul>
          </div>
  
        </div>


        <div className="container mx-auto px-4 mt-8 pt-8 border-t border-gray-700 text-center flex-col">
          <p>&copy; 2025 SensoPredict. All rights reserved.</p>
          <p className="text-sm mt-4 pt-4">
            Made with <span className="text-red-500">&hearts;</span> in India
          </p>
        </div>
      </footer>
  )
}