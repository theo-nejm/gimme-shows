import React, {useEffect, useState} from 'react';
import {Container} from "./style";
import {BiTrashAlt} from "react-icons/bi";
import {HiOutlinePencilAlt} from "react-icons/hi";
import axios from '../../services/axios/instance';
import { UserModal } from '../UserModal';

export function User({ user }) {
    const [isOpened, setIsOpened] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [data, setData] = useState(user);

    async function handleDelete() {
        await axios.delete('/api/user/'+user.id);
        setIsDeleted(true)
    }

    console.log(data)

    useEffect(() => {
        axios.get(`/api/user/${user.id}`)
            .then(res => {
                setData(res.data)
            })
    }, [isOpened])

    if(isDeleted) return null;

    return (
        <>
            <Container>
                <h4>{data.username}</h4>
                <p>Roles: {data.authorities.map(auth => auth.authority).join(', ').replaceAll('ROLE_', '')}</p>
                <div className="actions">
                    <button type='button' onClick={handleDelete}>
                        <BiTrashAlt />
                    </button>
                    <button type='button' onClick={() => setIsOpened(true)}>
                        <HiOutlinePencilAlt />
                    </button>
                </div>
            </Container>
            <UserModal isOpened={isOpened} setIsOpened={setIsOpened} user={data} />
        </>
    )
}