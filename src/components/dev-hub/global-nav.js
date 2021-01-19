import React, { useCallback, useState } from 'react';
import dlv from 'dlv';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { graphql, useStaticQuery } from 'gatsby';
import DevLeafDesktop from './icons/mdb-dev-leaf-desktop';
import DevLeafMobile from './icons/mdb-dev-leaf-mobile';
import Link from '../Link';
import { fontSize, lineHeight, screenSize, size } from './theme';
import useMedia from '~hooks/use-media';
import NavItem, { MobileNavItem, MobileNavMenu } from './nav-item';

// nav height is 58px: 24px line height + 2 * 17px vertical padding
const LINK_VERTICAL_PADDING = '17px';

const GlobalNav = styled('nav')`
    background-color: ${({ theme }) => theme.colorMap.greyDarkThree};
    display: flex;
    flex-direction: column;
    width: 100%;
    &:after {
        background: radial-gradient(circle, #3ebb8c 0%, #76d3b1 100%);
        content: ' ';
        height: 2px;
        width: 100%;
    }
`;

const NavContent = styled('div')`
    align-items: center;
    color: ${({ theme }) => theme.colorMap.greyLightOne};
    display: flex;
    flex-wrap: wrap;
    margin: 0 auto;
    max-width: ${size.maxWidth};
    position: relative;
    width: 100%;
    @media ${screenSize.upToLarge} {
        justify-content: space-between;
        padding-right: 20px;
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
    @media ${screenSize.upToMedium} {
        font-size: ${fontSize.tiny};
        line-height: ${lineHeight.xlarge};
        padding: ${size.small} ${size.default};
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
    @media ${screenSize.upToMedium} {
        padding: ${size.default};
        svg {
            /* align svg with other nav links */
            margin-top: -4px;
            width: 100px;
        }
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

const expanded = css`
    span:nth-of-type(1) {
        left: 50%;
        top: 6px;
        width: 0%;
    }
    span:nth-of-type(2) {
        transform: rotate(45deg);
    }
    span:nth-of-type(3) {
        transform: rotate(-45deg);
    }
    span:nth-of-type(4) {
        left: 50%;
        top: 6px;
        width: 0%;
    }
`;

/** Used the third example from https://codepen.io/designcouch/pen/Atyop */
const HamburgerToggle = styled('div')`
    cursor: pointer;
    height: 10px;
    transform: rotate(0deg);
    transition: 300ms ease-in-out;
    width: 20px;
    ${({ isOpen }) => isOpen && expanded};
    span {
        background: ${({ theme }) => theme.colorMap.devWhite};
        display: block;
        height: 2px;
        left: 0;
        opacity: 1;
        position: absolute;
        transform: rotate(0deg);
        transition: 150ms ease-in-out;
        width: 100%;
        :nth-of-type(1) {
            top: 0px;
        }
        :nth-of-type(2),
        :nth-of-type(3) {
            top: 5px;
        }
        :nth-of-type(4) {
            top: 10px;
        }
    }
`;

export const AnimatedHamburger = props => (
    <HamburgerToggle {...props}>
        <span />
        <span />
        <span />
        <span />
    </HamburgerToggle>
);

const MenuToggle = ({ isOpen, toggleIsOpen }) => (
    <AnimatedHamburger isOpen={isOpen} onClick={toggleIsOpen} />
);

const MobileItems = ({ items }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleIsOpen = useCallback(() => setIsOpen(!isOpen), [isOpen]);
    return (
        <>
            <MenuToggle isOpen={isOpen} toggleIsOpen={toggleIsOpen} />
            {isOpen && (
                <MobileNavMenu>
                    {items.map(item => (
                        <MobileNavItem key={item.name} item={item} />
                    ))}
                </MobileNavMenu>
            )}
        </>
    );
};

export default () => {
    const data = useStaticQuery(topNavItems);
    const items = dlv(data, ['strapiTopNav', 'items'], []);
    const isMobile = useMedia(screenSize.upToLarge);
    return (
        <GlobalNav>
            <NavContent>
                <HomeLink aria-label="Home" to="/">
                    {isMobile ? (
                        <DevLeafMobile width={size.xxlarge} />
                    ) : (
                        <DevLeafDesktop />
                    )}
                </HomeLink>
                {isMobile ? (
                    <MobileItems items={items} />
                ) : (
                    items.map(item => <NavItem item={item} />)
                )}
            </NavContent>
        </GlobalNav>
    );
};
