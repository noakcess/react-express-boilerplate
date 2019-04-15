import React from 'react'
import { DefaultContext } from './DefaultContext';
// const Log = window.Log;

const handleDefault = DefaultContext.defaultFn;
/*  import */
export const AppOptions = {
    wallpaper: `/assets/wallpaper.jpg`
};

export const AppContext = React.createContext({
    ...AppOptions,
    handleDefault
});
