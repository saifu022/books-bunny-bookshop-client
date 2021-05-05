import React, { useContext } from 'react';
import './login.css'
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faGoogle
} from "@fortawesome/free-brands-svg-icons";

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

const Login = () => {
    // eslint-disable-next-line
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const userUpdateAndRedirect = (userInfo) => {
        const { displayName, email, photoURL } = userInfo;
        const newUserInfo = {
            name: displayName,
            email: email,
            photoUrl : photoURL
        };
        setLoggedInUser(newUserInfo);
        history.replace(from);
    }

    const handleGoogleSignIn = () => {
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(googleProvider)
            .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
                userUpdateAndRedirect(result.user);
            }).catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage)
            });
    }
    
    return (
        <div className="container">
            <div className="logIn ">
                <div>
                    <h1>Sign In!</h1> <br />
                    <button type="button" className="btn btn-outline-primary" onClick={handleGoogleSignIn}> <FontAwesomeIcon icon={faGoogle} /> Sign In with Google</button>
                </div>
            </div>
        </div>
    );
};

export default Login;