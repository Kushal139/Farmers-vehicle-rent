
import {Link, useNavigate} from 'react-router-dom';

function Header(){
    const navigate = useNavigate();
    const handleLogOut = ()=> {
        localStorage.clear('token');
    }
    return (
        <div className="header">
            <Link to="/">HOME</Link>
            <span className="mt-3">Check & Post Available Equipment for Rent</span>
            {!(localStorage.getItem('token')) ? <Link to="/login">LOGIN</Link> : 
            <button onClick={handleLogOut}>LOGOUT</button>}
            
        </div>
    )
}

export default Header;