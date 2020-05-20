import { configure, addDecorator, addParameters } from '@storybook/react';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';
import { action } from '@storybook/addon-actions';
import theme from './theme';
import ThemeDecorator from './theme-decorator';

const WELCOME_PAGE_KIND = 'Welcome';

addParameters({
    options: {
        theme,
        storySort: (a, b) => {
            if (a[1].kind === WELCOME_PAGE_KIND) {
                return 0;
            }
            if (b[1].kind === WELCOME_PAGE_KIND) {
                return 1;
            }
            return a[1].kind === b[1].kind
                ? 0
                : a[1].id.localeCompare(b[1].id, undefined, { numeric: true });
        },
    },
    docs: {
        container: DocsContainer,
        page: DocsPage,
        prepareForInline: storyFn => storyFn(),
    },
});

// Gatsby's Link overrides:
// Gatsby defines a global called ___loader to prevent its method calls from creating console errors you override it here
global.___loader = {
    enqueue: () => {},
    hovering: () => {},
};
// Gatsby internal mocking to prevent unnecessary errors in storybook testing environment
global.__PATH_PREFIX__ = '';
// This is to utilized to override the window.___navigate method Gatsby defines and uses to report what path a Link would be taking us to if it wasn't inside a storybook
window.___navigate = pathname => {
    action('NavigateTo:')(pathname);
};

configure(require.context('../src', true, /\.stories\.(js|mdx)$/), module);
addDecorator(ThemeDecorator);
