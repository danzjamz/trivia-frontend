import React from 'react';

const logout = (props) => {
    const token = JSON.parse(props).access_token;
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }
    };

    localStorage.removeItem('user');

    return fetch('https://danzjamz-trivia.herokuapp.com/logout', requestOptions)
        .then(handleResponse)
        .then(response => {
            // login successful if there's a user in the response
            console.log('Logout successful', response);
            return true;
        }).catch(err => {
            console.log('error logging out', err)
            return false;
        });

    function handleResponse(response) {
        return response.text().then(text => {
            const data = text && JSON.parse(text);
            if (!response.ok) {
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
            return data;
        });
    }
}

export default logout;