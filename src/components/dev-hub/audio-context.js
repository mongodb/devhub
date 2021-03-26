import { createContext } from 'react';

const defaultContextValue = {
    activeAudioNode: null,
    setActiveAudioNode: () => null,
};

const AudioContext = createContext(defaultContextValue);
const AudioContextProvider = AudioContext.Provider;

export { AudioContext, AudioContextProvider };
