import React from 'react'
import { DefaultContext } from './DefaultContext';
// const Log = window.Log;

const handleDefault = DefaultContext.defaultFn;
/*  import */
export const BlankOptions = {

};

export const BlankContext = React.createContext({
    ...BlankOptions,
    handleDefault
});
/*
    Copy BlankContext.js to new file to create new Context files
    Do not edit the BlankContext.js
    Rename "BlankOptions" and "BlankContext" to better describe the purpose.
    All Context modules are imported into the SystemContext.
    SystemContext is added to Landing "state" and disseminated to the below route Components.
    
    Tips:
        - Always import DefaultContext and assign any functions to DefaultContext.defaultFn.
* */
