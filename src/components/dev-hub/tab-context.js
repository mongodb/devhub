import React, { useCallback, useEffect, useReducer, useState } from 'react';
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
    const [debouncedTabUpdate, setDebouncedTabUpdate] = useState(null);
    const [activeTabs, setActiveTab] = useReducer(
        reducer,
        getLocalValue('activeTabs') || defaultContextValue.activeTabs
    );

    /*
      The LeafyGreen Tabs Implementation keeps adding key event handlers
      to the DOM. By using a setTimeout we can avoid duplicate events being
      run and so key events work as expected
    */
    const debouncedSetActiveTab = useCallback(
        v => {
            if (debouncedTabUpdate) {
                clearTimeout(debouncedTabUpdate);
            }
            setDebouncedTabUpdate(setTimeout(() => setActiveTab(v)));
        },
        [debouncedTabUpdate]
    );

    useEffect(() => {
        setLocalValue('activeTabs', activeTabs);
    }, [activeTabs]);

    return (
        <TabContext.Provider
            value={{ activeTabs, setActiveTab: debouncedSetActiveTab }}
        >
            {children}
        </TabContext.Provider>
    );
};

export { TabContext, TabProvider };
