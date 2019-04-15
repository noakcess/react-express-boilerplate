import React from 'react'
import { Button } from 'reactstrap';

// const Log = window.Log;

const FormButton = ({ label = 'Button', type= 'btn-success', onClick = () => {} }) => {
    return (
        <Button onClick={onClick}>
            {label}
        </Button>
    )
};

export default FormButton;
