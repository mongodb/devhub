import React, { useState } from 'react';
import { ThemeProvider } from 'emotion-theming';
import { darkTheme } from './theme';
import { AudioContextProvider } from './audio-context';
import Audio from './audio';

const AudioLayout = ({ children }) => {
    const [activeAudioNode, setActiveAudioNode] = useState(null);
    return (
        <ThemeProvider theme={darkTheme}>
            <AudioContextProvider
                value={{ activeAudioNode, setActiveAudioNode }}
            >
                {children}
                {activeAudioNode ? (
                    <Audio
                        onClose={() => setActiveAudioNode(null)}
                        podcast={activeAudioNode}
                    />
                ) : null}
            </AudioContextProvider>
        </ThemeProvider>
    );
};

export default AudioLayout;
