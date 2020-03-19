import React from 'react';
import jwt from 'jsonwebtoken';


export default function GetPublicTrivias() {
    return fetch('https://danzjamz-trivia.herokuapp.com/trivias/public')
        .then(res => res.json())
        .then(data => data.trivias)
}

export function GetTrivia(triviaId) {
    let user = null;
    if (localStorage.user) {
        user = localStorage.user;
    }

    if (user) {
        const token = JSON.parse(user).access_token;

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }
        }

        return fetch(`https://danzjamz-trivia.herokuapp.com/trivia/${ triviaId }`, requestOptions)
            .then(res => res.json())
            .then(data => {
                const trivia = {
                    user_id: data.user_id,
                    trivia_id: data.id,
                    title: data.title,
                    description: data.description,
                    questions: [...data.questions],
                    is_open: data.is_open,
                    should_wait: data.should_wait
                }
                return trivia;
            }).catch(err => {
                console.log('get trivia by id ->', err)
            });
    } else {
        console.log('user not logged in!');
    }
}


