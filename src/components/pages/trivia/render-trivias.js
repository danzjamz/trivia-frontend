import React from 'react';
import { Link } from 'react-router-dom';

export default function RenderTrivias(props) {
    let route = '#';
    
    
    return props.trivias.map(trivia => {
        if (props.from === 'view-trivia') {
            route = `/trivia/${ trivia.id }`;
        }
        
        return (
            <li className='trivia-item' key={ trivia.id }>
                <Link className={  props.from === 'home' ? 'from-home' : null } to={ route }>
                    <h1>{ trivia.title }</h1>
                    <h4>{ trivia.description }</h4>
                </Link>
                <Link className='play-trivia-btn' to={ `/trivia/${ trivia.id }/play`}>Play</Link>
            </li>
        )
    })
}