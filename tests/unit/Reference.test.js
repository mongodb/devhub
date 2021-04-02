import React from 'react';
import { render } from 'enzyme';
import Reference from '../../src/components/Reference';
import { ThemeProvider } from '@emotion/react';
import { darkTheme } from '../../src/components/dev-hub/theme';

// data for this component
import mockData from './data/Reference.test.json';

it('renders correctly', () => {
    const tree = render(
        <ThemeProvider theme={darkTheme}>
            <Reference nodeData={mockData} />
        </ThemeProvider>
    );
    expect(tree).toMatchSnapshot();
});
