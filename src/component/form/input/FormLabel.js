/*eslint no-extend-native: "off"*/
import React from 'react'
import { Label } from 'reactstrap';
import deCamelize from 'decamelize';
import { last } from 'underscore';
const Log = window.Log;

const placeholders = require('../config/placeholder');

Log.info({placeholders});

String.prototype.ucfirst = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};
String.prototype.ucwords = function() {
    return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};
const FormLabel = ({ name, input = false }) => {
    const label = deCamelize(last(name.split('.')), ' ');
    
    return (
        <React.Fragment>
            <Label type="text" name={name} id={`id-${name}`} placeholder=''>
                {label.ucwords()}
            </Label>
            {input}
        </React.Fragment>
        
    )
};

export default FormLabel;
