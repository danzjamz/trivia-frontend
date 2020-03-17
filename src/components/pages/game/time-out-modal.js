import React from 'react';
import ReactModal from 'react-modal';

ReactModal.setAppElement('.app-wrapper');

export default function TimoutModal(props) {
    const modalStyles = {
        content: {
            top: '40%',
            left: '50%',
            right: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '20em',
            height: '15em',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: '10px'
        }
    }

    return (
        <ReactModal style={ modalStyles } isOpen={ props.isOpen }>
            <h1>You're out of time!</h1>
            <div className='timer no-time'>00</div>
            <button className='modal-btn' onClick={ props.toggleModal }>
                { props.isLastQ ? 'Finish' : 'Next Question' }
            </button>
        </ReactModal>
    )
}