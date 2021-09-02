import React, {useEffect, useState} from 'react';
import {Header} from "../../components/Header";
import {PageContainer} from "../../styles/global";
import { Container } from "./style";
import {useHistory} from "react-router-dom";
import Auth from "../../security/auth";
import axios from "../../services/axios/instance";
import {Event} from "../../components/Event";
import {EventModal} from "../../components/EventModal";

export function Events() {
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
        axios.get('/api/event')
            .then((res) => setData(res.data))
    }, [isOpened])

    return (
        <PageContainer>
            <Header />
            <Container>

                <div className="top">
                    <h2>Events</h2>
                    <button onClick={() => setIsOpened(true)}>+ register event</button>
                </div>
                <div className="events">
                    {
                        data && data.events.map(event => <Event event={event} key={event.id} />)
                    }
                </div>
            </Container>
            <EventModal isOpened={isOpened} setIsOpened={setIsOpened} />
        </PageContainer>
    )
}