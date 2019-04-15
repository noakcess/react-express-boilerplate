import React from 'react';

const Log = window.Log;

//https://reactjs.org/docs/context.html#updating-context-from-a-nested-component
const entryRoute = window.location.pathname;

const defaultFn = ( opts = {} ) => {
    Log.info({ opts });
};
const handleResize = defaultFn;
export const DefaultOptions = {
    entryRoute,
    defaultFn,
    handleResize
};

export const DefaultContext = React.createContext({
    ...DefaultOptions
});
