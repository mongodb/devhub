import React from 'react';
import { render } from 'enzyme';

import { ThemeProvider } from '@emotion/react';
import { darkTheme } from '~components/dev-hub/theme';
import PlayerControls from '~components/dev-hub/podcast-player/player-contols';

describe('PlayerControls', () => {
    it('renders correctly play', () => {
        const tree = render(
            <ThemeProvider theme={darkTheme}>
                <PlayerControls isPlaying={false} />
            </ThemeProvider>
        );
        expect(tree).toMatchSnapshot();
    });

    it('renders correctly pause', () => {
        const tree = render(
            <ThemeProvider theme={darkTheme}>
                <PlayerControls isPlaying={true} />
            </ThemeProvider>
        );
        expect(tree).toMatchSnapshot();
    });
});
