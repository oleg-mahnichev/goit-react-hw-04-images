import React from 'react';
import ReactModal from 'react-modal';



const CustomModal = ({ isOpen, onRequestClose, largeImageURL }) => {
    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Large Image Modal"
        >
            <img src={largeImageURL} alt="Large" />
            {/* <button onClick={onRequestClose}>Close Modal</button> */}
        </ReactModal>
    );
};

export default CustomModal;
