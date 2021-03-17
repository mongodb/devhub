import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { fontSize, lineHeight, screenSize, size } from './theme';
import MongodbLogoIcon from './icons/mongodb-logo';
import Link from './link';
import FacebookIcon from './icons/facebook-icon';
import TwitterIcon from './icons/twitter-icon';
import LinkedIn from './icons/linkedin';
import Github from './icons/github';
import Youtube from './icons/youtube';
import Twitch from './icons/twitch';
import { P } from './text';
import { useTheme } from 'emotion-theming';
import { FORUMS_URL } from '~src/constants';

// Logo size 150px + 64px padding right
const LOGO_DESKTOP_COLUMN_SIZE = 214;

const siteLinks = [
    {
        name: 'Developer Hub',
        url: '/',
    },
    {
        name: 'Documentation',
        url: 'https://docs.mongodb.com/',
    },
    {
        name: 'University',
        url: 'https://university.mongodb.com/',
    },
    {
        name: 'Community Forums',
        url: FORUMS_URL,
    },
];

const iconstyles = theme => css`
    &:hover {
        fill: ${theme.colorMap.darkGreen};
        g {
            fill: ${theme.colorMap.darkGreen};
            path {
                fill: ${theme.colorMap.darkGreen};
            }
        }
    }
`;

const iconProps = theme => {
    return {
        height: 15,
        width: 15,
        color: theme.colorMap.greyLightTwo,
        css: iconstyles(theme),
    };
};

const iconLinks = theme => {
    const props = iconProps(theme);
    return [
        {
            name: <Github {...props} />,
            url: 'https://github.com/mongodb',
        },
        {
            name: <Twitch {...props} />,
            url: 'https://twitch.tv/mongodb/profile',
        },
        {
            name: <Youtube {...props} />,
            url: 'https://www.youtube.com/user/mongodb',
        },
        {
            name: <TwitterIcon {...props} />,
            url: 'https://twitter.com/MongoDB/',
        },
        {
            name: <FacebookIcon {...props} />,
            url: 'https://www.facebook.com/MongoDB/',
        },
        {
            name: <LinkedIn {...props} />,
            url: 'https://www.linkedin.com/company/mongodbinc/',
        },
    ];
};

const GlobalFooter = styled('footer')`
    background: ${({ theme }) => theme.colorMap.greyDarkThree};
    width: 100%;
`;
const FooterContent = styled('div')`
    color: ${({ theme }) => theme.colorMap.greyLightTwo};
    display: grid;
    @media ${screenSize.mediumAndUp} {
        grid-gap: 0 ${size.xlarge};
        grid-template-areas:
            'logo list'
            'logo icons'
            'logo copyright';
        grid-template-columns: ${LOGO_DESKTOP_COLUMN_SIZE}px auto;
        padding: ${size.large} ${size.default};
    }
    @media ${screenSize.upToMedium} {
        grid-template-areas:
            'list list'
            'icons icons'
            'logo copyright';
        grid-template-columns: 49% 49%;
        padding: 0 ${size.default};
    }
    margin: 0 auto;
    max-width: ${size.maxWidth};
    width: 100%;
`;
const logoStyles = css`
    @media ${screenSize.upToMedium} {
        height: 26px;
        width: 100px;
    }
`;
const LogoContainer = styled('section')`
    align-items: center;
    display: flex;
    grid-area: logo;
    justify-content: center;
    @media ${screenSize.mediumAndUp} {
        border-right: 1px solid ${({ theme }) => theme.colorMap.greyLightTwo};
        padding-right: ${size.xlarge};
    }
    @media ${screenSize.upToMedium} {
        border-top: 1px solid ${({ theme }) => theme.colorMap.greyLightTwo};
        justify-content: flex-start;
        padding: ${size.default} 0;
    }
`;
const listStyles = css`
    display: flex;
    list-style-type: none;
    padding: 0;
    @media ${screenSize.upToMedium} {
        justify-content: center;
    }
`;
const LinksList = styled('ul')`
    ${listStyles}
    grid-area: list;
    @media ${screenSize.upToSmall} {
        flex-direction: column;
    }
`;
const IconList = styled('ul')`
    ${listStyles}
    @media ${screenSize.upToSmall} {
        justify-content: space-between;
    }
    grid-area: icons;
`;
const Copyright = styled(P)`
    font-size: ${fontSize.micro};
    grid-area: copyright;
    @media ${screenSize.upToMedium} {
        align-items: center;
        border-top: 1px solid ${({ theme }) => theme.colorMap.greyLightTwo};
        display: flex;
        font-size: ${fontSize.micro};
        justify-content: flex-end;
        margin: 0;
        padding: ${size.default} 0;
    }
`;
const FooterLink = styled(Link)`
    color: ${({ theme }) => theme.colorMap.greyLightTwo};
    &:visited {
        color: ${({ theme }) => theme.colorMap.greyLightTwo};
    }
    &:hover {
        color: ${({ theme }) => theme.colorMap.darkGreen};
    }
    font-size: ${fontSize.small};
    line-height: ${lineHeight.small};
    padding: ${size.tiny};
    text-decoration: none;
`;
const ListItem = styled('li')`
    @media ${screenSize.mediumAndUp} {
        text-align: center;
    }
    ${props =>
        props.isListType &&
        `@media ${screenSize.upToSmall} {
            &:not(:first-of-type) {
                margin-top: ${size.default};
            }
        }`}
    @media ${screenSize.smallAndUp} {
        &:not(:first-of-type) {
            margin-left: ${size.large};
        }
    }
`;
const getLinksList = (link, isListType) => (
    <ListItem isListType={isListType} key={link.url}>
        <FooterLink href={link.url}>{link.name}</FooterLink>
    </ListItem>
);
export default () => {
    const theme = useTheme();
    return (
        <GlobalFooter>
            <FooterContent>
                <LogoContainer>
                    <FooterLink
                        css={iconstyles(theme)}
                        href="https://www.mongodb.com/"
                    >
                        <MongodbLogoIcon css={logoStyles} />
                    </FooterLink>
                </LogoContainer>
                <LinksList>
                    {siteLinks.map(list => getLinksList(list, true))}
                </LinksList>
                <IconList>
                    {iconLinks(theme).map(list => getLinksList(list, false))}
                </IconList>
                <Copyright collapse>© MongoDB, Inc.</Copyright>
            </FooterContent>
        </GlobalFooter>
    );
};
