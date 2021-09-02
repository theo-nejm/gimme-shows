import { SERVER_URL as url } from '../config/config';
import axios from '../services/axios/instance';
import headers from './headers';

export default {
    logIn(auth) {
        localStorage.auth = JSON.stringify(auth)
    },
    logOut() {
        delete localStorage.auth
    },
    refreshToken() {
        axios.post('/oauth/access_token', null, { params: {
                grant_type: 'refresh_token',
                refresh_token: JSON.parse(localStorage.auth).refresh_token
            }})
            .then(checkResponseStatus)
            .then((auth) => localStorage.auth = JSON.stringify(auth.data))
            .catch((e) => { throw new Error("Unable to refresh token. \n\n" + e.message) });
    },
    async loggedIn() {
        if(!localStorage.auth) return false;

        const response = await axios.get('/api/band', {headers: headers()})
        return !!checkResponseStatus(response)
    },
    async isAdmin() {
        if(!localStorage.auth) return false;

        try {
            const response = await axios.get('/api/user', {headers: headers()})
            return !!checkResponseStatus(response)
        } catch (e) {
            return false;
        }

    }
}

export const checkResponseStatus = (response) => {
    if(response.status >= 200 && response.status < 300) {
        return response;
    } else {
        throw new Error(response.statusText);
    }
}