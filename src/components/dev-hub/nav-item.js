import React, { useCallback, useState } from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import Link from '../Link';
import { P, P2 } from './text';
import { fontSize, layer, lineHeight, screenSize, size } from './theme';
import ArrowheadIcon from './icons/arrowhead-icon';

// nav height is 58px: 24px line height + 2 * 17px vertical padding
const LINK_VERTICAL_PADDING = '17px';
/* greyDarkTwo at 40% opacity on greyDarkThree */
const HOVER_STATE_BACKGROUND_COLOR = '#2c3d47';
const HOVER_STATE_GREEN_COLOR = '#0ad05b';
const SUBITEM_MAX_WIDTH = '364px';

const hoverEffect = css`
    &:active,
    &:hover,
    &:focus,
    &:focus-within {
        background-color: ${HOVER_STATE_BACKGROUND_COLOR};
        color: ${HOVER_STATE_GREEN_COLOR};
    }
`;

const showGreenDivider = css`
    padding-top: 1px;
    border-top: 1px solid transparent;
`;

const linkTextStyles = css`
    font-size: ${fontSize.small};
    letter-spacing: 1px;
    line-height: ${lineHeight.small};
    text-decoration: none;
    @media ${screenSize.upToMedium} {
        font-size: ${fontSize.tiny};
        line-height: ${lineHeight.xlarge};
        padding: ${size.small} ${size.default};
    }
`;

const subItemBoxShadow = theme => css`
    margin-bottom: 1px;
    @media ${screenSize.largeAndUp} {
        :not(:last-of-type) {
            box-shadow: 0px 1px 0px ${theme.colorMap.greyDarkTwo};
        }
    }
    :last-of-type {
        border-radius: 0 0 6px 6px;
    }
`;

/**
 * Nav main items (a link or the top of a sublist)
 */

const navTopItemStyling = css`
    padding: ${LINK_VERTICAL_PADDING} ${size.xlarge};
    ${hoverEffect};
    ${linkTextStyles};
`;

const NavLink = styled(Link)`
    ${navTopItemStyling};
    @media ${screenSize.upToLarge} {
        padding: 0;
    } ;
`;

const NavListHeader = styled('div')`
    ${navTopItemStyling};
    position: relative;
    ${({ isExpanded }) =>
        isExpanded && `background-color: ${HOVER_STATE_BACKGROUND_COLOR}`};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 20px;
    @media ${screenSize.upToLarge} {
        box-shadow: 0px 1px 0px ${({ theme }) => theme.colorMap.greyDarkTwo};
    }
`;

/**
 * Expandable sub-list containers
 */

const NavItemSublist = styled('ul')`
    display: ${({ isExpanded }) => (isExpanded ? 'block' : 'none')};
    list-style: none;
    margin-top: 0px;
    max-width: ${SUBITEM_MAX_WIDTH};
    padding-left: 0;
    position: absolute;
    z-index: ${layer.front};
    ${showGreenDivider};
    @media ${screenSize.upToLarge} {
        position: relative;
        max-width: none;
    }
`;

const NavItemMenu = styled('div')`
    cursor: pointer;
    &:active,
    &:hover,
    &:focus,
    &:focus-within {
        color: ${HOVER_STATE_GREEN_COLOR};
    }
    position: relative;
    ${({ isExpanded }) => isExpanded && `color: ${HOVER_STATE_GREEN_COLOR}`};
`;

/**
 * Nav menu sub-item
 */

const NavListSubItem = styled('li')`
    background-color: ${({ theme }) => theme.colorMap.greyDarkThree};
    ${hoverEffect};
    ${({ theme }) => subItemBoxShadow(theme)};
    @media ${screenSize.upToLarge} {
        padding: 12px 32px;
    } ;
`;

const SubItemContents = styled('div')`
    padding: ${size.medium} ${size.large};
    @media ${screenSize.upToLarge} {
        padding: 0;
    }
`;

const SubItemDescriptionText = styled(P2)`
    color: ${({ theme }) => theme.colorMap.greyLightTwo};
`;

const SubItemLink = styled(Link)`
    ${navTopItemStyling};
    padding: 0;
    &:hover {
        color: ${({ theme }) => theme.colorMap.devWhite};
        ${SubItemDescriptionText} {
            color: ${({ theme }) => theme.colorMap.devWhite};
        }
    }
    @media ${screenSize.upToLarge} {
        line-height: unset;
        padding: 0;
    }
`;

const SubItemText = styled(P)`
    margin-bottom: 4px;
`;

const NavItemSubItem = ({ subitem }) => (
    <SubItemLink to={subitem.url}>
        <SubItemContents>
            <SubItemText>{subitem.name}</SubItemText>
            <SubItemDescriptionText collapse>
                {subitem.description}
            </SubItemDescriptionText>
        </SubItemContents>
    </SubItemLink>
);

export const MobileNavMenu = styled('div')`
    position: absolute;
    /* Add 2px for green border to show */
    top: calc(100% + 2px);
    width: 100%;
    background-color: ${({ theme }) => theme.colorMap.greyDarkThree};
    z-index: 10;
    min-height: 100vh;
`;

export const MobileNavItem = ({ item }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleMenu = useCallback(() => setIsExpanded(!isExpanded), [
        isExpanded,
    ]);
    const hasSubMenu = !!item.subitems.length;
    if (hasSubMenu) {
        return (
            <NavItemMenu
                onClick={toggleMenu}
                isExpanded={isExpanded}
                tabIndex="0"
            >
                <NavListHeader isExpanded={isExpanded}>
                    {item.name}
                    <ArrowheadIcon down={!isExpanded} />
                </NavListHeader>
                <NavItemSublist isExpanded={isExpanded}>
                    {item.subitems.map(subitem => (
                        <NavListSubItem key={subitem.name}>
                            <NavItemSubItem tabIndex="0" subitem={subitem} />
                        </NavListSubItem>
                    ))}
                </NavItemSublist>
            </NavItemMenu>
        );
    }
    return (
        <NavListHeader>
            <NavLink to={item.url}>{item.name}</NavLink>
        </NavListHeader>
    );
};

const NavItem = ({ item }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const closeMenu = useCallback(() => setIsExpanded(false), [setIsExpanded]);
    const expandMenu = useCallback(() => setIsExpanded(true), [setIsExpanded]);
    const hasSubMenu = !!item.subitems.length;
    const closeOptionsOnBlur = useCallback(
        e => {
            // Check the event to see if the next element is a child here
            // Tabbing is a bit off due to display: none
            const isTabbingThroughOptions = e.currentTarget.contains(
                e.relatedTarget
            );
            if (!isTabbingThroughOptions) {
                closeMenu();
            }
        },
        [closeMenu]
    );
    if (hasSubMenu) {
        return (
            <NavItemMenu
                onBlur={closeOptionsOnBlur}
                onMouseLeave={closeMenu}
                onMouseEnter={expandMenu}
                onFocus={expandMenu}
                isExpanded={isExpanded}
                tabIndex="0"
            >
                <NavListHeader isExpanded={isExpanded}>
                    {item.name}
                </NavListHeader>
                <NavItemSublist isExpanded={isExpanded}>
                    {item.subitems.map(subitem => (
                        <NavListSubItem key={subitem.name}>
                            <NavItemSubItem tabIndex="0" subitem={subitem} />
                        </NavListSubItem>
                    ))}
                </NavItemSublist>
            </NavItemMenu>
        );
    }
    return <NavLink to={item.url}>{item.name}</NavLink>;
};

export default NavItem;
