import React from 'react';
import { render } from 'enzyme';

import { ThemeProvider } from '@emotion/react';
import { darkTheme } from '~components/dev-hub/theme';
import PlayerListenOn from '~components/dev-hub/podcast-player/player-listen-on';

describe('PlayerListenOn', () => {
    it('renders correctly', () => {
        const tree = render(
            <ThemeProvider theme={darkTheme}>
                <PlayerListenOn />
            </ThemeProvider>
        );
        expect(tree).toMatchSnapshot();
    });
});
