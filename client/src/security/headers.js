export default () => ({ 'Authorization': `Bearer ${localStorage.auth 
                        ? JSON.parse(localStorage.auth).access_token 
                        : null}`})