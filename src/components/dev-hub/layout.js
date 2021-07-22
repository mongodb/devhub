import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { Global, ThemeProvider, css } from '@emotion/react';
import styled from '@emotion/styled';
import { useLocation } from '@reach/router';
import { useSiteMetadata } from '../../hooks/use-site-metadata';
import { addTrailingSlashIfMissing } from '../../utils/add-trailing-slash-if-missing';
import { removePathPrefixFromUrl } from '../../utils/remove-path-prefix-from-url';
import ConsistentNav from './consistent-nav';
import { TabProvider } from './tab-context';
import GlobalFooter from './global-footer';
import { darkTheme, fontSize, lineHeight, screenSize, size } from './theme';
import TopBanner from './top-banner';
import '../../styles/font.css';
import 'typeface-fira-mono';

const globalStyles = theme => css`
    html {
        box-sizing: border-box;
        height: 100%;
    }

    *,
    *::before,
    *::after {
        box-sizing: inherit;
    }
    body {
        background: ${theme.colorMap.pageBackground};
        color: ${theme.colorMap.devWhite};
        font-family: akzidenz, -apple-system, BlinkMacSystemFont, 'Segoe UI',
            Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
            'Segoe UI Symbol';
        font-size: ${fontSize.default};
        line-height: ${lineHeight.medium};
        margin: 0;
        padding: 0;
    }
    main > section {
        padding: ${size.large} 120px;
        @media ${screenSize.upToLarge} {
            padding: ${size.medium};
        }
    }
    img {
        max-width: 100%;
    }
`;

const Main = styled('main')`
    /* ensure content takes up full space between header & footer*/
    margin: 0 auto;
    max-width: ${size.maxWidth};
    min-height: calc(100vh - 300px);
    width: 100%;
`;

const GlobalWrapper = styled('div')`
    background: ${({ theme }) => theme.colorMap.pageBackground};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 100vh;
    width: 100%;
`;
export const StorybookLayout = ({ children }) => {
    const style = useMemo(() => globalStyles(darkTheme), []);
    return (
        <ThemeProvider theme={darkTheme}>
            <GlobalWrapper>
                <TabProvider>
                    <Global styles={style} />
                    <main>{children}</main>
                </TabProvider>
            </GlobalWrapper>
        </ThemeProvider>
    );
};

export default ({ children, includeCanonical = true }) => {
    const style = useMemo(() => globalStyles(darkTheme), []);
    const { siteUrl } = useSiteMetadata();
    const { pathname } = useLocation();
    const localPagePath = removePathPrefixFromUrl(pathname);
    const canonicalUrl = addTrailingSlashIfMissing(
        `${siteUrl}${localPagePath}`
    );
    return (
        <ThemeProvider theme={darkTheme}>
            <GlobalWrapper>
                <Helmet htmlAttributes={{ lang: 'en' }}>
                    <meta name="robots" content="index" />
                    <link
                        type="application/opensearchdescription+xml"
                        rel="search"
                        href="https://developer.mongodb.com/opensearch.xml"
                        title="MongoDB Developer Hub"
                    />
                    <link
                        rel="shortcut icon"
                        href="https://www.mongodb.com/assets/images/global/favicon.ico"
                    />
                    {includeCanonical && (
                        <link rel="canonical" href={canonicalUrl} />
                    )}
                </Helmet>
                <Global styles={style} />
                <TopBanner />
                <ConsistentNav />
                <TabProvider>
                    <Main>{children}</Main>
                </TabProvider>
                <GlobalFooter />
            </GlobalWrapper>
        </ThemeProvider>
    );
};
