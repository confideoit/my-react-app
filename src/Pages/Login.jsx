import { Link } from "react-router-dom";

function Login() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-6">
            <form className="bg-white shadow-lg rounded-2xl p-8 max-w-sm w-full animate-fadeIn">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Confideo IT Services</h2>
                <div className="flex flex-col space-y-4">
                    <input 
                        type="text" 
                        placeholder="Enter your name" 
                        className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition" 
                    />
                    <input 
                        type="email" 
                        placeholder="Enter your email" 
                        className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition" 
                    />
                    <input 
                        type="password" 
                        placeholder="Enter your password" 
                        className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition" 
                    />
                </div>
                <button 
                    type="submit" 
                    className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg font-semibold transition duration-300"
                >
                    Submit
                </button>
                <p className="text-center mt-4 text-gray-600">
                    Don't have an account? <Link to="/r" className="text-blue-500 hover:underline">Register</Link>
                </p>
            </form>
        </div>
    );
}

export default Login;
