import React from 'react';
import { ButtonLM } from "./Button.styled"

const Button = ({ onClick, disabled, showLoadMoreMessage }) => {
    const handleClick = () => {
        if (!showLoadMoreMessage) {
            onClick();
        }
    };

    return (
        <ButtonLM type="button" className="Button" onClick={handleClick} disabled={disabled || showLoadMoreMessage}>
            {showLoadMoreMessage ? 'No more images to load' : 'Load more'}
        </ButtonLM>
    );
};

export default Button;
