import React from 'react';
import ReactModal from 'react-modal';
import { Link } from 'react-router-dom';

ReactModal.setAppElement('.app-wrapper');

export default function LoginModal(props) {
    const modalStyles = {
        content: {
            top: '40%',
            left: '50%',
            right: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '20em',
            height: '12em',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            border: '1px solid #82088B',
            borderRadius: '10px'
        }
    }

    return (
        <ReactModal style={ modalStyles } isOpen={ props.isOpen }>
            <h1 className='modal-msg'>You must be logged in to create a trivia!</h1>
            <Link className='login-btn' to='/login' onClick={ props.toggleModal }>Login</Link>
        </ReactModal>
    )
}