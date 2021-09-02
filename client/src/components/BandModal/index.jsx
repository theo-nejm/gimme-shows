import React, {useRef} from 'react';
import {Overlay} from "./style";
import {Model} from "rest-models";

export function BandModal(props) {
    const { isOpened, setIsOpened, bandModel, setNewName } = props;

    const inputRef = useRef();

    async function handleSubmit(e) {
        e.preventDefault();
        if(bandModel) {
            bandModel.set({name: inputRef.current.value})
            setNewName(inputRef.current.value)
            await bandModel.save()
        } else {
            const model = new Model({url: '/api/band'})
            model.setData({ name: inputRef.current.value })
            await model.save()
        }

        setIsOpened(false);
    }

    if(isOpened) {
        return <Overlay>
            <div className='modal'>
                <h3>{bandModel ? 'Edit band' : 'Create band'}</h3>
                <form onSubmit={handleSubmit}>
                    <input
                        type='text'
                        placeholder='Band name:'
                        autoFocus
                        ref={inputRef}
                        defaultValue={bandModel ? bandModel.get('name') : ''}
                    />

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