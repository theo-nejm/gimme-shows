import React, {useEffect, useRef, useState} from 'react';
import {Overlay} from "./style";
import axios from '../../services/axios/instance';

function formatDate(date) {
    return String(date.toLocaleDateString()).split('/').reverse().join('-')
}

export function EventModal(props) {
    const { isOpened, setIsOpened, event } = props;
    const [bands, setBands] = useState([])
    const nameInputRef = useRef();
    const dateInputRef = useRef();
    const bandsSelectRef = useRef();

    useEffect( () => {
        axios.get('/api/band')
            .then(res => setBands(res.data.bands))
    }, [])

    async function handleSubmit(e) {
        e.preventDefault();

        const eventBands = []

        const bands = bandsSelectRef.current.options
        for(let band of bands) {
            band.selected && eventBands.push({ id: Number(band.value) })
        }

        const data = {
            name: nameInputRef.current.value,
            date: new Date(dateInputRef.current.value).toJSON(),
            bands: eventBands
        }

        if(event) {
            await axios.put('/api/event/'+event.id, {...data, id: event.id})
        } else {
            await axios.post('/api/event', data);
        }

        setIsOpened(false);
    }
    if(isOpened) {
        return <Overlay>
            <div className='modal'>
                <h3>{event ? 'Edit event' : 'Create event'}</h3>
                <form onSubmit={handleSubmit}>
                    <input
                        type='text'
                        placeholder='Event name:'
                        autoFocus
                        ref={nameInputRef}
                        defaultValue={event ? event.name : ''}
                    />
                    <input
                        type='date'
                        placeholder='Event date:'
                        ref={dateInputRef}
                        defaultValue={event ? formatDate(new Date(event.date)) : ''}
                    />

                    <select multiple ref={bandsSelectRef}>
                        {
                            bands.map(band => <option
                                key={band.id}
                                value={band.id}
                                selected={event && !!event.bands.map(current => current.id).includes(band.id)}
                            >{band.name}</option>)
                        }
                    </select>

                    <div className='actions'>
                        <button type='button' className='cancel' onClick={() => setIsOpened(false)}>Cancel</button>
                        <button type='submit' className='submit'>Submit</button>
                    </div>
                </form>
            </div>
        </Overlay>
    } else {
        return null;
    }
}