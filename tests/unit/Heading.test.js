import React from 'react';
import { render } from 'enzyme';
import Heading from '../../src/components/Heading';
import { ThemeProvider } from '@emotion/react';
import { darkTheme} from '../../src/components/dev-hub/theme';

// data for this component
import mockData from './data/Heading.test.json';

it('renders correctly', () => {
    const tree = render(<ThemeProvider theme={darkTheme}><Heading nodeData={mockData} sectionDepth={3} /></ThemeProvider>);
    expect(tree).toMatchSnapshot();
});
