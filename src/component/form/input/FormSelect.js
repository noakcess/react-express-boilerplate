import React from 'react'
import { FormGroup } from 'reactstrap';

import { DefaultOptions } from 'Context/DefaultContext';

import deCamelize from 'decamelize';

import { FormLabel } from 'Input/Common'
// const Log = window.Log;

const FormSelect = ({ label = true, name, value, opts=[], onChange = DefaultOptions.defaultFn }) => {
    const render = () => {
        return (
            <select
                className={'form-control'}
                name={name}
                id={`id-${name}`}
                value={ value }
                title={value.toString()}
                onChange={onChange.bind(this)}
            >
                {opts.map(opt => {
                    const label = deCamelize(opt, ' ');
                    return <option key={opt} value={opt.toString()}>{label}</option>
                })}
            </select>
        )
    };
    const select = render();
    return (
        <FormGroup>
            {label ? <FormLabel name={name} input={select} /> : select}
        </FormGroup>
    )
};

export default FormSelect;
