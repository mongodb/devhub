import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import { render } from 'enzyme';
import DefinitionList from '../../src/components/DefinitionList';
import { darkTheme } from '../../src/components/dev-hub/theme';
import mockData from './data/DefinitionList.test.json';

it('DefinitionList renders correctly', () => {
    const tree = render(
        <ThemeProvider theme={darkTheme}>
            <DefinitionList nodeData={mockData} />
        </ThemeProvider>
    );
    expect(tree).toMatchSnapshot();
});
