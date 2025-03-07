import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config"; // Import API base URL

function Register() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload

        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:5000/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ full_name: fullName, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess("Registration successful! Redirecting to login...");
                setTimeout(() => navigate("/login"), 200); // Redirect after 2 seconds
            } else {
                setError(data.message); // Show error message from backend
            }
        } catch (err) {
            setError("Registration failed. Please try again.");
        }
    };
    const handlelogin = () => {
        return navigate("/login")
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-500 to-blue-600 p-6">
            <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-2xl p-8 max-w-sm w-full animate-fadeIn">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Register to Confideo IT Services</h2>
                {error && <p className="text-red-500 text-center">{error}</p>}
                {success && <p className="text-green-500 text-center">{success}</p>}
                <div className="flex flex-col space-y-4">
                    <input 
                        type="text" 
                        placeholder="Enter your full name" 
                        className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                    <input 
                        type="email" 
                        placeholder="Enter your email" 
                        className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input 
                        type="password" 
                        placeholder="Create a password" 
                        className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input 
                        type="password" 
                        placeholder="Confirm password" 
                        className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button 
                    type="submit" 
                    className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg font-semibold transition duration-300"
                >
                    Register
                </button>
                <button
                    type="submit" onClick={()=> handlelogin()}
                    className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg font-semibold transition duration-300"
                >
                    Login
                </button>
            </form>
        </div>
    );
}

export default Register;
