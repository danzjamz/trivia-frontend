import React from 'react';

export function Login() {
    const user = {
        "username": "Zuko",
        "password": "foodfoodfood"
    }

    function login(username, password) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        };
    
        return fetch('http://127.0.0.1:4200/login', requestOptions)
            .then(handleResponse)
            .then(user => {
                // login successful if there's a user in the response
                if (user) {
                    // store user details and basic auth credentials in local storage 
                    // to keep user logged in between page refreshes
                    user.authdata = window.btoa(username + ':' + password);
                    localStorage.setItem('user', JSON.stringify(user));

                    console.log('yoyoyo', user)
                }
                return user;
            });

        function handleResponse(response) {
            return response.text().then(text => {
                const data = text && JSON.parse(text);
                if (!response.ok) {
                    if (response.status === 401) {
                        // auto logout if 401 response returned from api
                        logout();
                        location.reload(true);
                    }
        
                    const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);
                }
        
                return data;
            });
        }
    }
    
    login(user.username, user.password)

    return (
        <div>
            <h1>Login</h1>
        </div>
    )
}

// use TradeWinds font google

// login fetch found at https://jasonwatmore.com/post/2018/09/11/react-basic-http-authentication-tutorial-example