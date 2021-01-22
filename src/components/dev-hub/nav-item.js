import React, { useCallback, useState } from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import Link from '../Link';
import ArrowheadIcon from './icons/arrowhead-icon';
import { P, P3 } from './text';
import { fontSize, layer, lineHeight, screenSize, size } from './theme';

// nav height is 58px: 24px line height + 2 * 17px vertical padding
const LINK_VERTICAL_PADDING = '17px';
/* greyDarkTwo at 40% opacity on greyDarkThree */
const HOVER_STATE_BACKGROUND_COLOR = '#2c3d47';
const HOVER_STATE_GREEN_COLOR = '#0ad05b';
const MOBILE_NAV_BREAK = screenSize.upToLarge;
const SUBITEM_MAX_WIDTH = '350px';

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
`;

const subItemBoxShadow = theme => css`
    margin-bottom: 1px;
    :not(:last-of-type) {
        box-shadow: 0px 1px 0px ${theme.colorMap.greyDarkTwo};
    }
    :last-of-type {
        border-radius: 0 0 6px 6px;
    }
    @media ${MOBILE_NAV_BREAK} {
        :not(:last-of-type) {
            box-shadow: none;
        }
        :last-of-type {
            border-radius: 0;
        }
    }
`;

/**
 * Nav main items (a link or the top of a sublist)
 */

const navTopItemStyling = css`
    ${hoverEffect};
    ${linkTextStyles};
`;

const NavLink = styled(Link)`
    ${navTopItemStyling};
`;

const NavListHeader = styled('div')`
    ${navTopItemStyling};
    display: flex;
    position: relative;
    justify-content: space-between;
    ${({ isExpanded }) =>
        isExpanded && `background-color: ${HOVER_STATE_BACKGROUND_COLOR}`};
    padding: ${LINK_VERTICAL_PADDING} ${size.xlarge};
    @media ${screenSize.upToSmallDesktop} {
        padding: ${LINK_VERTICAL_PADDING} ${size.mediumLarge};
    }
    @media ${screenSize.upToXlarge} {
        padding: ${LINK_VERTICAL_PADDING} 40px;
    }
    @media ${MOBILE_NAV_BREAK} {
        padding: ${size.mediumLarge} ${size.default};
        box-shadow: 0px 1px 0px ${({ theme }) => theme.colorMap.greyDarkTwo};
    }
`;

/**
 * Expandable sub-list containers
 */

const NavItemSublist = styled('ul')`
    display: ${({ isExpanded }) => (isExpanded ? 'block' : 'none')};
    list-style: none;
    margin-top: 0;
    max-width: ${SUBITEM_MAX_WIDTH};
    padding-left: 0;
    position: absolute;
    z-index: ${layer.front};
    ${showGreenDivider};
    @media ${MOBILE_NAV_BREAK} {
        max-width: none;
        margin-bottom: 0;
        position: relative;
        width: 100%;
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
    ${({ isExpanded }) => isExpanded && `color: ${HOVER_STATE_GREEN_COLOR}`};
`;

/**
 * Nav menu sub-item
 */

const NavListSubItem = styled('li')`
    background-color: ${({ theme }) => theme.colorMap.greyDarkThree};
    ${hoverEffect};
    ${({ theme }) => subItemBoxShadow(theme)};
`;

const SubItemContents = styled('div')`
    padding: ${size.medium} ${size.large};
`;

const SubItemDescriptionText = styled(P3)`
    color: ${({ theme }) => theme.colorMap.greyLightTwo};
    @media ${MOBILE_NAV_BREAK} {
        font-size: ${fontSize.tiny};
        line-height: ${lineHeight.tiny};
    }
`;

const SubItemLink = styled(Link)`
    ${navTopItemStyling};
    &:hover {
        color: ${({ theme }) => theme.colorMap.devWhite};
        ${SubItemDescriptionText} {
            color: ${({ theme }) => theme.colorMap.devWhite};
        }
    }
`;

const SubItemText = styled(P)`
    margin-bottom: 4px;
`;

export const MobileNavItem = ({ item, onLinkClick }) => {
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
                            <NavItemSubItem
                                onLinkClick={onLinkClick}
                                tabIndex="0"
                                subitem={subitem}
                            />
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

const NavItemSubItem = ({ subitem, onLinkClick }) => (
    <SubItemLink onClick={onLinkClick} to={subitem.url}>
        <SubItemContents>
            <SubItemText>{subitem.name}</SubItemText>
            <SubItemDescriptionText collapse>
                {subitem.description}
            </SubItemDescriptionText>
        </SubItemContents>
    </SubItemLink>
);

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
    return (
        <NavListHeader>
            <NavLink to={item.url}>{item.name}</NavLink>
        </NavListHeader>
    );
};

export default NavItem;
