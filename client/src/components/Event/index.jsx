import React, {useCallback, useEffect, useState} from 'react';
import {Container} from "./style";
import {Model} from "rest-models";
import { AiOutlineZoomIn, AiOutlineZoomOut } from 'react-icons/ai';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { BiTrashAlt } from 'react-icons/bi';
import { EventModal } from '../EventModal';
import axios from '../../services/axios/instance';

const endpoint = '/api/event'
export function Event({ event }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isOpened, setIsOpened] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [data, setData] = useState(event);

    async function handleDelete() {
        await axios.delete(`${endpoint}/${event.id}`)
        setIsDeleted(true);
    }

    useEffect(() => {
        axios.get(`${endpoint}/${event.id}`)
            .then(res => {
                setData(res.data)
            })
    }, [isOpened])

    if(isDeleted) return null;

    return (
        <>
            <Container isExpanded={isExpanded}>
                <h4>{data.name}</h4>
                <p>{`Date: ${new Date(data.date).toLocaleDateString()}`}</p>
                <div className='bands'>Bands: {!isExpanded ? data.bands.length : (
                    data.bands.length === 0
                        ? "\n\n There isn't bands in this show."
                        : data.bands.map(band => <p>{`🎙️ ${band.name}`}</p>))}
                </div>
                <div className="actions">
                    <button type='button' onClick={handleDelete}>
                        <BiTrashAlt />
                    </button>
                    <button type='button' onClick={() => setIsOpened(true)}>
                        <HiOutlinePencilAlt />
                    </button>
                    <button type='button' id='expand' onClick={() => setIsExpanded(!isExpanded)}>
                        {
                            isExpanded ? <AiOutlineZoomOut /> : <AiOutlineZoomIn />
                        }
                    </button>
                </div>
            </Container>
            <EventModal isOpened={isOpened} setIsOpened={setIsOpened} event={data} />
        </>
    )
}