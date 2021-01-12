import React, { useCallback, useState } from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import Link from '../Link';
import { P, P3 } from './text';
import { fontSize, layer, lineHeight, screenSize, size } from './theme';

// nav height is 58px: 24px line height + 2 * 17px vertical padding
const LINK_VERTICAL_PADDING = '17px';
const SUBITEM_MAX_WIDTH = '364px';

const hoverEffect = css`
    &:active,
    &:hover,
    &:focus,
    &:focus-within,
    &[aria-current='page'] {
        /* greyDarkTwo at 40% opacity on greyDarkThree */
        background-color: #2c3d47;
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

const subItemBoxShadow = css`
    margin-bottom: 1px;
    :not(:last-of-type) {
        box-shadow: 0px 1px 0px #3d4f58;
    }
`;

const NavLink = styled(Link)`
    padding: ${LINK_VERTICAL_PADDING} ${size.xlarge};
    ${hoverEffect};
    ${linkTextStyles};
`;

const NavListHeader = styled(NavLink)`
    position: relative;
`;

const NavListSubItem = styled('li')`
    background-color: ${({ theme }) => theme.colorMap.greyDarkThree};
    ${hoverEffect};
    ${subItemBoxShadow};
`;

const NavItemSublist = styled('ul')`
    display: ${({ isExpanded }) => (isExpanded ? 'block' : 'none')};
    list-style: none;
    margin-top: 0px;
    max-width: ${SUBITEM_MAX_WIDTH};
    padding-left: 0;
    position: absolute;
    z-index: ${layer.front};
    ${showGreenDivider};
`;

const NavItemMenu = styled('div')`
    &:active,
    &:hover,
    &:focus,
    &:focus-within {
        color: #0ad05b;
    }
    ${({ isExpanded }) => isExpanded && `color: #0ad05b`};
`;

const SubItemContents = styled('div')`
    padding: ${size.medium} ${size.large};
`;

const SubItemDescriptionText = styled(P3)`
    color: ${({ theme }) => theme.colorMap.greyLightTwo};
`;

const SubItemLink = styled(NavLink)`
    padding: 0;
    &:hover {
        color: white;
        ${SubItemDescriptionText} {
            color: #f9fbfa;
        }
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
        const NavListHeaderDiv = NavListHeader.withComponent('div');
        return (
            <NavItemMenu
                onBlur={closeOptionsOnBlur}
                onMouseLeave={closeMenu}
                onMouseEnter={expandMenu}
                onFocus={expandMenu}
                isExpanded={isExpanded}
                tabIndex="0"
            >
                <NavListHeaderDiv>{item.name}</NavListHeaderDiv>
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
