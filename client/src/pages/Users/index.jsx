import React, {useEffect, useState} from 'react';
import { PageContainer } from "../../styles/global";
import {Container} from "./style";
import Auth from '../../security/auth';
import {useHistory} from "react-router-dom";
import {Header} from "../../components/Header";
import {User} from "../../components/User";
import axios from '../../services/axios/instance';
import { UserModal } from '../../components/UserModal';

export function Users() {
    const [isVerified, setIsVerified] = useState(false);
    const [data, setData] = useState(null)
    const [isOpened, setIsOpened] = useState(false);
    const history = useHistory();

    (async function verifyAdmin() {
        const isAdmin = await Auth.isAdmin();
        if(!isAdmin) {
            history.push('/')
        } else {
            setIsVerified(true)
        }
    })()

    useEffect(() => {
        axios.get('/api/user')
            .then(res => setData(res.data.users))
    }, [isOpened])

    return (
        isVerified &&
        <PageContainer>
            <Header />
            <Container>
                <div className="top">
                    <h2>Users</h2>
                    <button onClick={() => setIsOpened(true)}>+ register user</button>
                </div>
                <div className="users">
                    {
                        data && data.map(user => <User user={user} key={user.id} />)
                    }
                </div>
            </Container>
            <UserModal isOpened={isOpened} setIsOpened={setIsOpened} />
        </PageContainer>
    )
}