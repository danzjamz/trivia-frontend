import React from 'react';

export function Login() {
    const user = {
        "username": "Zuko",
        "password": "foodfoodfood"
    }

    fetch('http://127.0.0.1:4200/trivias')
        .then((response) => {
            return response.json();
        })
        .then((myJson) => {
            console.log(myJson);
        });

    return (
        <div>
            <h1>Login</h1>
        </div>
    )
}

// use TradeWinds font google