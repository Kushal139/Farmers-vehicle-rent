import { useState } from "react";
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import './styles.css';

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleApi = () => {
        axios.post("http://localhost:4000/login", { username, password })
            .then((res) => {
                if (res.data.token) {
                    localStorage.setItem('token', res.data.token);
                    navigate('/');
                } else {
                    setError("Invalid credentials");
                }
            })
            .catch(() => {
                setError("Server error, please try again later.");
            });
    };

    const handleGoogleLogin = () => {
        window.location.href = 'YOUR_GOOGLE_OAUTH_URL'; // Replace with your actual Google OAuth URL
    };

    return (
        <div>
            <Header />
            <h2>Welcome to Login Page</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
                <label>Username</label>
                <input 
                    type="text" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                />
            </div>
            <div>
                <label>Password</label>
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
            </div>
            <div>
                <button onClick={handleApi}>Login</button>
                <button onClick={handleGoogleLogin}>Login with Google</button>
            </div>
            <Link to="/signup">Sign Up</Link>
        </div>
    );
}

export default Login;
