import React, {useRef} from 'react';
import {Overlay} from "../EventModal/style";
import axios from "../../services/axios/instance";

export function UserModal(props) {
    const { isOpened, setIsOpened, user } = props;
    function handleSubmit(e) {
        e.preventDefault();
    }

    const usernameInputRef = useRef();
    const passwordInputRef = useRef();
    const rolesSelectRef = useRef();

    async function handleSubmit(e) {
        e.preventDefault();

        const rolesIds = []

        const roles = rolesSelectRef.current.options
        for(let role of roles) {
            role.selected && rolesIds.push(role.value)
        }

        const data = {
            username: usernameInputRef.current.value,
            rolesIds: rolesIds
        }

        const password = !user && passwordInputRef.current.value;

        if(user) {
            await axios.put('/api/user/'+user.id, data)
        } else {
            await axios.post('/api/user', {...data, password: password});
        }

        setIsOpened(false);
    }

    if(isOpened) {
        return <Overlay>
            <div className='modal' style={{ height: 'max-content' }}>
                <h3>{user ? 'Edit user' : 'Create user'}</h3>
                <form onSubmit={handleSubmit}>
                    <input
                        type='text'
                        placeholder='Username: '
                        autoFocus
                        ref={usernameInputRef}
                        defaultValue={user ? user.username : ''}
                    />
                    {!user && <input
                        type='password'
                        placeholder='Password: '
                        ref={passwordInputRef}
                    />}
                    <select multiple ref={rolesSelectRef} id='roles'>
                        <option value={1} selected={user && user.authorities.filter(auth => auth.id === 1).length > 0}>ADMIN</option>
                        <option value={2} selected={user ? user.authorities.filter(auth => auth.id === 2).length > 0 : true}>USER</option>
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