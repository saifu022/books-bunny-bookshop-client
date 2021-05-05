import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import firebase from "firebase/app";
import "firebase/auth";
import './Header.css'
import { UserContext } from '../../App';
import logo from '../../images/logo.png'

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const handleLogOut = () => {
        firebase.auth().signOut().then(() => {
            setLoggedInUser({
                name: '',
                email: '',
                photoUrl: ''
              })
          }).catch((error) => {
            console.log(error);
          });
    }
    const loginButton = <Link className="nav-link" to="/login"><button type="button" className="btn btn-primary">Log In</button></Link>;
    const logOutButton = <button type="button" className="btn btn-primary" onClick={handleLogOut}>Log Out</button>;
    const {name, email, photoUrl} = loggedInUser;
    
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container">
                    <Link className="navbar-brand header-logo" to="/home">
                        <img src={logo} alt=" Books Bunny"/>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end align-items-center" id="navbarNavAltMarkup">
                        <div className="navbar-nav align-items-center">
                            <Link className="nav-link" aria-current="page" to="/">Home</Link>
                            <Link className="nav-link" to="/orders">My Orders</Link>
                            <Link className="nav-link" to="/admin">Admin</Link>
                            <Link className="nav-link" to="/deals">Deals</Link>
                            {email &&  (<img src={photoUrl} alt={name} className="profile-image"/> || <h5 className="nav-link active">{name || email}</h5>)} 
                        </div>
                        {email? logOutButton : loginButton}
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;