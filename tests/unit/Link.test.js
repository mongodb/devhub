import React from 'react';
import { render } from 'enzyme';
import Link from '../../src/components/Link';
import { ThemeProvider } from 'emotion-theming';
import { darkTheme} from '../../src/components/dev-hub/theme';

const setup = ({ text, ...rest }) => render(<ThemeProvider theme={darkTheme}><Link {...rest}>{text}</Link></ThemeProvider>);

describe('Link component renders a variety of strings correctly', () => {
    it('empty string', () => {
        const tree = setup({ to: '', text: 'Empty string' });
        expect(tree).toMatchSnapshot();
    });

    it('external URL', () => {
        const tree = setup({
            to: 'http://mongodb.com',
            text: 'MongoDB Company',
        });
        expect(tree).toMatchSnapshot();
    });

    it('internal link', () => {
        const tree = setup({
            to: 'drivers/c',
            text: 'C Driver',
            className: 'test-class',
        });
        expect(tree).toMatchSnapshot();
    });
});
