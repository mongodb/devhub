import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import { darkTheme } from '../src/components/dev-hub/theme';

const ThemeDecorator = storyFn => (
    <ThemeProvider theme={darkTheme}>{storyFn()}</ThemeProvider>
);

export default ThemeDecorator;
