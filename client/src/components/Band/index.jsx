import React, {useEffect, useState} from 'react';
import { Container } from './style';
import { AiOutlineZoomIn, AiOutlineZoomOut } from 'react-icons/ai';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { BiTrashAlt } from 'react-icons/bi';
import {Model, setAxiosConfig} from "rest-models";
import { SERVER_URL as url } from "../../config/config";
import headers from '../../security/headers';
import { BandModal } from '../BandModal';

setAxiosConfig({baseURL: url, headers: headers()})

export const Band = ({ band }) => {
    const [isDeleted, setIsDeleted] = useState(false);
    const bandModel = new Model({url: '/api/band'});
    const [isOpened, setIsOpened] = useState(false);
    const [newName, setNewName] = useState(band.name);
    const [isExpanded, setIsExpanded] = useState(false);

    bandModel.setData(band);

    async function handleDelete() {
        setIsDeleted(true);
        await bandModel.remove()
    }

    useEffect(() => {
        bandModel.set({name: newName})
        console.log(bandModel)
    }, [newName])

    if(isDeleted) return null;

    return (
        <>
        <Container isExpanded={isExpanded} >
            <h4>{newName || bandModel.get('name')}</h4>
            <div className='shows'>Shows: {!isExpanded ? bandModel.get('events').length : (
                bandModel.get('events').length === 0
                    ? "\n\n Isn't sheduled to any shows."
                    : (
                            bandModel.get('events')
                                .map(event => <p>{"🔥" + event.name + ` ${event.bands.length === 1 
                                    ? <p>Without another bands</p>
                                    : (
                                        event.bands.length === 2 
                                            ? `with ${event.bands.filter(band => band.name !== bandModel.get('name'))[0].name}`
                                            : `with ${event.bands.filter(band => band.name !== bandModel.get('name'))[0].name} and more`
                                    )}.`}</p>)
                    )
            )}</div>

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
        <BandModal isOpened={isOpened} setIsOpened={setIsOpened} bandModel={bandModel} setNewName={setNewName}/>
        </>
    )
}