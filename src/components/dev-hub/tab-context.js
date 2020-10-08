import React, { useEffect, useReducer } from 'react';
import { getLocalValue, setLocalValue } from '../../utils/browser-storage';

const defaultContextValue = {
    activeTabs: {},
    setActiveTab: () => {},
};

const TabContext = React.createContext(defaultContextValue);

// Keeps track of the preferences for all tab sets
const reducer = (tabSelectionPreferences, { tabset, value }) => ({
    ...tabSelectionPreferences,
    [tabset]: value,
});

const TabProvider = ({ children }) => {
    const [activeTabs, setActiveTab] = useReducer(
        reducer,
        getLocalValue('activeTabs') || defaultContextValue.activeTabs
    );

    useEffect(() => {
        setLocalValue('activeTabs', activeTabs);
    }, [activeTabs]);

    return (
        <TabContext.Provider value={{ activeTabs, setActiveTab }}>
            {children}
        </TabContext.Provider>
    );
};

export { TabContext, TabProvider };
