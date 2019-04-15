/*eslint-disable no-unused-vars*/

import React from 'react';
import { DefaultOptions } from 'Context/DefaultContext';
import { ConfigOptions } from 'Context/ConfigContext';
import { AppOptions } from 'Context/AppContext';
/*  import all context options above and insert into SystemOptions below */

const Log = window.Log;

export const SystemOptions = {
    route: DefaultOptions.entryRoute,
    config: './config.json',
    Config: {...ConfigOptions},
    /*  insert all other imported contexts from above, below using spread operator and camelcase property */
    App: {...AppOptions}
};

/*
*   create default functions for SystemOptions and insert below.
*   these methods should match global methods from Landing.jsx
*/
const handleContext = DefaultOptions.defaultFn;
const handleRedirect = DefaultOptions.defaultFn;

export const SystemContext = React.createContext({
    ...SystemOptions,
    handleContext,
    handleRedirect
    
});
