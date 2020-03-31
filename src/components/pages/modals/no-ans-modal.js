import React from 'react';
import ReactModal from 'react-modal';

ReactModal.setAppElement('.app-wrapper');

export default function NoAnsModal(props) {
    const modalStyles = {
        content: {
            top: '40%',
            left: '50%',
            right: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '30em',
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
            <h1>You didn't choose an answer!</h1>
            <div className='no-ans-btns'>
                <button className='modal-btn' onClick={ () => props.toggleModal('BACK') }>
                    Go back to question!
                </button>
                <button className='modal-btn' onClick={ () => props.toggleModal('CONTINUE') }>
                    I know, continue anyway
                </button>
            </div>
        </ReactModal>
    )
}