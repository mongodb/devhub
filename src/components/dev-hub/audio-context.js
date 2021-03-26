import { createContext } from 'react';

const defaultContextValue = {
    activeAudioFile: null,
};

const AudioContext = createContext(defaultContextValue);

export { AudioContext };
