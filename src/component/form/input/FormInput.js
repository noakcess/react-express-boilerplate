import React from 'react'
import { Input, FormGroup } from 'reactstrap';

import { DefaultOptions } from 'Context/DefaultContext';

import { FormLabel } from 'Input/Common'
// const Log = window.Log;

const FormInput = ({ label = true, name, value, type='text', onChange = DefaultOptions.defaultFn }) => {
    const input = <Input
        type={type}
        name={name}
        id={`id-${name}`}
        value={value}
        placeholder=''
        onChange={onChange.bind(this)}
    />;
    return (
        <FormGroup>
            {label ? <FormLabel name={name} input={input} /> : input}
        </FormGroup>
    )
};

export default FormInput;
