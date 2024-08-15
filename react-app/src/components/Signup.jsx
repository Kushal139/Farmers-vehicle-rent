import { useState } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import axios from "axios";
import './styles.css';

function Signup() {
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');

    const url = 'http://localhost:4000/signup';
    const data = {username, password};
    const handleapi = ()=> {
        axios.post(url, data)
            .then((res) =>{ 
                if(res.data.message){
                    alert(res.data.message);
                }
            })
            .catch((err)=>{
                console.log(err);
            })
    }
    return ( 
        <div>
            <Header/> 
            Welcome to signup page
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
            <button onClick={handleapi}>SignUp</button>
            <Link to="/login">LOGIN</Link>
        </div>
    )
}

export default Signup;