import React, {useEffect, useState} from 'react';
import { Container } from './style'
import {useHistory} from "react-router-dom";
import Auth from '../../security/auth';

export function Header() {
    const [isLogged, setIsLogged] = useState(false);
    const [userAdmin, setUserAdmin] = useState(false);
    const [error, setError] = useState(null);

    const history = useHistory();

    function verifyLoggedIn() {
        Auth.loggedIn().then(setIsLogged)
    }

    function verifyAdmin() {
        Auth.isAdmin().then(setUserAdmin)
    }

    useEffect(() => {
        verifyLoggedIn()
        verifyAdmin()
    }, [])

    async function handleClick (e) {
        const link = e.target.innerText.toLowerCase()

        switch(link) {
            case 'home':
                history.push('/');
                break;
            case 'logout':
                Auth.logOut();
                history.push('login')
                break;
            case 'login':
                history.push(link)
                break;
            default:
                if (isLogged) {
                    history.push(link)
                } else {
                    setError('You must be logged-in to access this page.')
                    setTimeout(() => setError(null),5000)
                }
        }
    }

    return (
        <Container>
            <h1>gimme <span>shows</span></h1>

            <nav>
                <ul>
                    <li onClick={handleClick}>Home</li>
                    <li onClick={handleClick}>Bands</li>
                    <li onClick={handleClick}>Events</li>
                    {userAdmin && <li onClick={handleClick}>Users</li>}
                    <li onClick={handleClick}>{isLogged ? 'Logout' : 'Login'}</li>
                </ul>
            </nav>
            <div className={`error ${error && 'shown'}`}>{error}</div>
        </Container>
    )
}