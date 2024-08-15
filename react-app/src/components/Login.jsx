import { useState } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './styles.css';

function Login() {
    const navigate = useNavigate();
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');

    const url = "http://localhost:4000/login";
    const data = {username, password};
    const handleapi = ()=> {
        axios(url, data)
            .then((res)=>{
                console.log(res);
                if(res.data.token){
                    localStorage.setItem('token',  res.data.token);
                    navigate('/');
                }
            })
            .catch(()=>{
                console.log("server err");
            })
    }
    return (
        <div>
            <Header/>
            Welcome to login page
            <br />
            USERNAME
            <input type="text" value={username} 
                onChange={(e) => {
                    setusername(e.target.value);
                }}/>
            <br />
            PASSWORD
            <input type="text" value={password} 
                onChange={(e) => {
                    setpassword(e.target.value);
                }}/>
            <br />
            <button onClick={handleapi}>Login</button>
            <Link to="/signup">SIGNUP</Link>
        </div>
    )
}

export default Login;