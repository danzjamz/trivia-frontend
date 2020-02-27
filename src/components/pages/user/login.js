import React from 'react';

export function Login() {
    const user = {
        "username": "Zuko",
        "password": "foodfoodfood"
    }

        // function login(username, password) {
        //     const requestOptions = {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify({ username, password })
        //     };
        
        //     return fetch(`${config.apiUrl}/users/authenticate`, requestOptions)
        //         .then(handleResponse)
        //         .then(user => {
        //             // login successful if there's a user in the response
        //             if (user) {
        //                 // store user details and basic auth credentials in local storage 
        //                 // to keep user logged in between page refreshes
        //                 user.authdata = window.btoa(username + ':' + password);
        //                 localStorage.setItem('user', JSON.stringify(user));
        //             }
        
        //             return user;
        //         });
        // }

    return (
        <div>
            <h1>Login</h1>
        </div>
    )
}

// use TradeWinds font google