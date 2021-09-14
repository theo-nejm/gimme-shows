import React, { useRef, useState } from 'react';
import {PageContainer} from "../../styles/global";
import {Container} from "./style";
import band from "../../assets/band.svg";
import axios from '../../services/axios/instance'
import Auth, { checkResponseStatus } from '../../security/auth';
import { Header } from "../../components/Header";
import { useHistory } from "react-router-dom";

export function Login() {
    const usernameRef = useRef();
    const passwordRef = useRef();
    const history = useHistory();

    const [error, setError] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            const response = await axios.post('/api/login', {
                username: usernameRef.current.value,
                password: passwordRef.current.value
            })

            Auth.logIn(checkResponseStatus(response).data)
            history.push('/')
        } catch (e) {
            if(e.message.split(' ').includes('401')) {
                setError('Incorrect username or password.')
            } else {
                setError("Wasn't possible to login. Try again later.")
            }
            passwordRef.current.value = ''
        }
    }

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
                            <h2>Login!</h2>
                            <p>When you're logged in, you can access bands and events pages.</p>
                        </div>
                        <div className='bottom'>
                            <h3>Login fields</h3>
                            <form onSubmit={handleSubmit}>
                                <input
                                    type='text'
                                    placeholder='Your username here:'
                                    name='username'
                                    required
                                    ref={usernameRef}
                                />
                                <input
                                    type='password'
                                    placeholder='Your password here:'
                                    name='password'
                                    required
                                    ref={passwordRef}
                                />
                                <button type="submit">Submit</button>
                                <p className='error-msg'>{error}</p>
                            </form>
                        </div>
                    </div>
                </Container>
        </PageContainer>
        </>
    )
}