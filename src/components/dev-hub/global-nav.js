import React, { useCallback, useEffect, useState } from 'react';
import dlv from 'dlv';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { graphql, useStaticQuery } from 'gatsby';
import LeafLogo from './icons/mdb-dev-logo-leaf';
import MobileLeafLogo from './icons/mdb-dev-logo-leaf-mobile';
import { showOnDeviceSize } from '~utils/show-on-device-size';
import Link from '../Link';
import { fontSize, layer, lineHeight, screenSize, size } from './theme';
import useMedia from '~hooks/use-media';
import Button from './button';
import NavItem, { MobileNavItem } from './nav-item';
import MenuToggle from './menu-toggle';
import Searchbar from './searchbar';

// The searchbar expand button is 20px with 4px padding on each side
const EXPAND_BUTTON_GRID_WIDTH = '28px';
const GREEN_BORDER_SIZE = '2px';
// Account for bottom bar on mobile browsers
const MOBILE_MENU_ADDITIONAL_PADDING = '256px';
const MOBILE_NAV_BREAK = screenSize.upToSmallDesktop;
// nav height is 58px: 24px line height + 2 * 17px vertical padding
const LINK_VERTICAL_PADDING = '17px';

const center = css`
    margin: 0 auto;
`;

const expandedState = css`
    opacity: 0.2;
    pointer-events: none;
`;

const showOnDesktopOnly = css`
    ${showOnDeviceSize(screenSize.smallDesktopAndUp)};
`;

const Nav = styled('nav')`
    background-color: ${({ theme }) => theme.colorMap.greyDarkThree};
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    &:after {
        background: radial-gradient(circle, #3ebb8c 0%, #76d3b1 100%);
        content: ' ';
        height: ${GREEN_BORDER_SIZE};
        width: 100%;
    }
`;

const MobileLoginButtonContainer = styled('div')`
    display: flex;
    margin-top: ${size.mediumLarge};
    width: 100%;
`;

const MobileNavMenu = styled('div')`
    background-color: ${({ theme }) => theme.colorMap.greyDarkThree};
    position: absolute;
    /* Add 2px for green border to show */
    top: calc(100% + ${GREEN_BORDER_SIZE});
    width: 100%;
    z-index: ${layer.front};
    @media ${MOBILE_NAV_BREAK} {
        /* 100% would not work since the nav itself does not have 100% height */
        height: 100vh;
        padding-bottom: ${MOBILE_MENU_ADDITIONAL_PADDING};
        overflow: scroll;
    }
`;

const MaxWidthContainer = styled('div')`
    align-items: center;
    column-gap: ${size.default};
    display: grid;
    grid-template-columns: auto ${EXPAND_BUTTON_GRID_WIDTH} max-content max-content;
    margin: 0 auto;
    padding-right: ${size.default};
    max-width: ${size.maxWidth};
    position: relative;
    width: 100%;
    @media ${MOBILE_NAV_BREAK} {
        grid-template-columns: auto ${EXPAND_BUTTON_GRID_WIDTH} max-content;
    }
`;

const NavContent = styled('div')`
    align-items: center;
    color: ${({ theme }) => theme.colorMap.devWhite};
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    ${({ isExpanded }) => isExpanded && expandedState};
    @media ${MOBILE_NAV_BREAK} {
        display: grid;
        /* Using 36px here as the menu is 20px with 16px margin to the left */
        grid-template-columns: 36px auto;
        padding: 0;
    }
`;

const NavLink = styled(Link)`
    font-size: ${fontSize.small};
    font-weight: 300;
    letter-spacing: 1px;
    line-height: ${lineHeight.small};
    padding: ${LINK_VERTICAL_PADDING} ${size.xlarge};
    text-decoration: none;
    &:hover,
    &[aria-current='page'] {
        /* greyDarkTwo at 40% opacity on greyDarkThree */
        background-color: #2c3d47;
    }
`;

const HomeLink = styled(NavLink)`
    align-items: center;
    display: flex;
    padding: ${LINK_VERTICAL_PADDING} ${size.xlarge} ${LINK_VERTICAL_PADDING}
        ${size.medium};
    &:hover,
    &[aria-current='page'] {
        background-color: unset;
    }
    /* The SVG is slightly un-centered. This will move up 1px without impacting
    overall size */
    svg {
        transform: translate(0, -1px);
    }
    @media ${screenSize.upToXlarge} {
        padding: ${LINK_VERTICAL_PADDING} ${size.default};
    }
`;

const SignInButton = styled(Button)`
    align-self: center;
    padding: ${size.xsmall} ${size.default};
    white-space: nowrap;
    @media ${screenSize.upToMedium} {
        padding: ${size.xsmall} ${size.default};
    }
`;

const topNavItems = graphql`
    query TopNavItems {
        strapiTopNav {
            items {
                ...topNavItem
            }
        }
    }
`;

const MobileItems = ({ isSearchbarExpanded, items }) => {
    const [isOpen, setIsOpen] = useState(false);
    const closeMenu = useCallback(() => setIsOpen(false), []);
    const toggleIsOpen = useCallback(() => setIsOpen(!isOpen), [isOpen]);
    useEffect(() => {
        // This effect prevents scrolling outside the opened nav
        // We restore normal scrolling when the nav is closed
        if (document) {
            if (isOpen) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        }
    }, [isOpen]);
    return (
        <>
            <MenuToggle isOpen={isOpen} toggleIsOpen={toggleIsOpen} />
            {isOpen && !isSearchbarExpanded && (
                <MobileNavMenu>
                    {items.map(item => (
                        <MobileNavItem
                            onLinkClick={closeMenu}
                            key={item.name}
                            item={item}
                        />
                    ))}
                    <MobileLoginButtonContainer>
                        <SignInButton secondary hasArrow={false} css={center}>
                            Sign In
                        </SignInButton>
                    </MobileLoginButtonContainer>
                </MobileNavMenu>
            )}
        </>
    );
};

const GlobalNav = () => {
    const [isSearchbarExpanded, setIsSearchbarExpanded] = useState(false);
    const data = useStaticQuery(topNavItems);
    const items = dlv(data, ['strapiTopNav', 'items'], []);
    const isMobile = useMedia(MOBILE_NAV_BREAK);
    const onSearchbarExpand = useCallback(isExpanded => {
        // On certain screens the searchbar is never collapsed
        setIsSearchbarExpanded(isExpanded);
    }, []);
    return (
        <Nav>
            <MaxWidthContainer>
                <NavContent isExpanded={isSearchbarExpanded}>
                    {isMobile ? (
                        <>
                            <MobileItems
                                isSearchbarExpanded={isSearchbarExpanded}
                                items={items}
                            />
                            <HomeLink aria-label="Home" to="/">
                                <MobileLeafLogo />
                            </HomeLink>
                        </>
                    ) : (
                        <>
                            <HomeLink aria-label="Home" to="/">
                                <LeafLogo />
                            </HomeLink>
                            {items.map(item => (
                                <NavItem key={item.name} item={item} />
                            ))}
                        </>
                    )}
                </NavContent>
                <Searchbar
                    isExpanded={isSearchbarExpanded}
                    setIsExpanded={onSearchbarExpand}
                />
                <SignInButton primary hasArrow={false}>
                    Sign Up
                </SignInButton>
                <SignInButton
                    secondary
                    hasArrow={false}
                    css={showOnDesktopOnly}
                >
                    Sign In
                </SignInButton>
            </MaxWidthContainer>
        </Nav>
    );
};

export default GlobalNav;
