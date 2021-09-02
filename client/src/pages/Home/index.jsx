import React, {useEffect, useState} from 'react';
import band from '../../assets/band.svg'
import {Container} from "./style";
import {PageContainer} from "../../styles/global";
import {Header} from "../../components/Header";
import Auth from "../../security/auth";

export function Home() {
    const [isLogged, setIsLogged] = useState(false);
    const [userAdmin, setUserAdmin] = useState(false);

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

    return (
        <>
            <Header />
            <PageContainer>
                <Container>
                    <div className='left'>
                        <img src={band} alt='Imagem de uma banda musical.' />
                    </div>
                    <div className='right'>
                        <div className='top'>
                            <h2>Welcome to gimme shows</h2>
                            <p>Here you can register your shows and bands!</p>
                        </div>
                        <div className='bottom'>
                            <h3>{!isLogged ? 'How to get started?' : 'Now you are logged in'}</h3>
                            <p>{!isLogged ? 'To access another pages, you you must log in' : 'You can access another pages'}</p>
                            <p className='tip'>{
                                userAdmin
                                ? "You are logged as a admin, be careful with your power"
                                : "If you need some user management, tell an admin."
                            }</p>
                        </div>
                    </div>
                </Container>
            </PageContainer>
        </>
    )
}