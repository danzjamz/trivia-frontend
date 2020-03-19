import React from 'react';
import jwt from 'jsonwebtoken';


export default function GetPublicTrivias() {
    return fetch('https://danzjamz-trivia-api.herokuapp.com/trivias/public')
        .then(res => res.json())
        .then(data => data.trivias)
}

export function GetTrivia(triviaId) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    }

    return fetch(`https://danzjamz-trivia-api.herokuapp.com/trivia/${ triviaId }`, requestOptions)
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
}


