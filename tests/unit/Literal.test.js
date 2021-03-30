import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import { shallow } from 'enzyme';
import Literal from '../../src/components/Literal';
import { darkTheme } from '../../src/components/dev-hub/theme';

// data for this component
import mockData from './data/Literal.test.json';

it('renders correctly', () => {
    const tree = shallow(
        <ThemeProvider theme={darkTheme}>
            <Literal nodeData={mockData} />
        </ThemeProvider>
    );
    expect(tree).toMatchSnapshot();
});
