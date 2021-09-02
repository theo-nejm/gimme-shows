import React, {useEffect, useState} from 'react';
import { PageContainer } from '../../styles/global';
import { Container } from './style';
import {Header} from "../../components/Header";
import { Band } from '../../components/Band';
import axios from '../../services/axios/instance';
import { BandModal } from "../../components/BandModal";
import Auth from '../../security/auth';
import {useHistory} from "react-router-dom";

export function Bands() {
    const [data, setData] = useState(null);
    const [isOpened, setIsOpened] = useState(false);

    const history = useHistory();

    (async function verifyAuth() {
        const isLoggedIn = await Auth.loggedIn();
        if(!isLoggedIn) {
            history.push('login')
        }
    })()

    useEffect(() => {
        axios.get('/api/band')
            .then((res) => setData(res.data))
    }, [isOpened])

    return (
        <PageContainer>
            <Container>
                <Header />
                <div className="top">
                    <h2>Bands</h2>
                    <button onClick={() => setIsOpened(true)}>+ register band</button>
                </div>
                <div className="bands">
                {
                    data && data.bands.map(band => <Band band={band} key={band.id} />)
                }
                </div>
            </Container>
            <BandModal isOpened={isOpened} setIsOpened={setIsOpened} />
        </PageContainer>
    )

}