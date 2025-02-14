import React from "react";

function Register()
{
    return(
    
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-500 to-blue-600 p-6">
        <form className="bg-white shadow-lg rounded-2xl p-8 max-w-sm w-full animate-fadeIn">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Register to Confideo IT Services</h2>
          <div className="flex flex-col space-y-4">
            <input 
              type="text" 
              placeholder="Enter your full name" 
              className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition" 
            />
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition" 
            />
            <input 
              type="password" 
              placeholder="Create a password" 
              className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition" 
            />
            <input 
              type="password" 
              placeholder="Confirm password" 
              className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition" 
            />
          </div>
          <button 
            type="submit" 
            className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg font-semibold transition duration-300"
          >
            Register
          </button>
        </form>
      </div>
          
          );
        }
        

export default Register