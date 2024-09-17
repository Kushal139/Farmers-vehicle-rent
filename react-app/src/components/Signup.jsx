import { useState } from "react";
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import './styles.css';

function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleApi = () => {
        axios.post('http://localhost:4000/signup', { username, password })
            .then((res) => {
                if (res.data.message) {
                    alert(res.data.message);
                    navigate('/login');
                } else {
                    setError("Signup failed, please try again.");
                }
            })
            .catch(() => {
                setError("Server error, please try again later.");
            });
    };

    return (
        <div>
            <Header />
            <h2>Welcome to Signup Page</h2>
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
                <button onClick={handleApi}>Sign Up</button>
            </div>
            <Link to="/login">Login</Link>
        </div>
    );
}

export default Signup;
