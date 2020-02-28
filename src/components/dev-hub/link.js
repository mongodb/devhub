import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { Link as RouterLink } from 'gatsby';
import { animationSpeed, colorMap, fontSize, screenSize } from './theme';

// Takes an event handler, and wraps it to call preventDefault.
// If the handler is falsey, it is returned unchanged.
export const wrapPreventDefault = (handler, href) => {
    if (!handler) {
        return handler;
    }

    return e => {
        if (!href) {
            e.preventDefault();
        }
        return handler(e);
    };
};
const handleEnter = handler => e => {
    e.which === 13 && handler && wrapPreventDefault(handler)(e);
};

// Extra props to pass when href is not specified.
// These help the link look and feel more like a link,
// even though the browser doesn't consider it a link.
const BUTTON_PROPS = {
    role: 'button',
    tabIndex: 0,
};

const tertiaryLinkStyling = css`
    color: ${colorMap.greyLightThree};
    font-family: 'Fira Mono', monospace;
    font-size: ${fontSize.small};
    display: block;
    text-decoration: none;
    &:hover {
        cursor: pointer;
        color: ${colorMap.magenta};
        transition: color ${animationSpeed.fast} ease ${animationSpeed.fast};
    }

    &:after {
        /* 2192 is "RIGHTWARDS ARROW" */
        content: ' \u2192';
    }
`;

const linkStyling = css`
    color: #fff;
    font-size: inherit;
    text-decoration: underline;
    &:visited {
        color: #fff;
    }
    &:hover {
        color: ${colorMap.darkGreen};
    }
`;

const StyledLink = styled('a')`
    ${props => (props.tertiary ? tertiaryLinkStyling : linkStyling)}
`;

/**
 * @param {Object<string, any>} props
 * @property {node} props.children
 * @property {string?} props.href
 * @property {func?} props.onClick
 * @property {string?} props.target
 * @property {boolean?} props.tertiary
 * @property {string?} props.to
 */
const Link = ({ href, onClick, target, tertiary, to, ...rest }) => {
    if (to) {
        const AsInternalLink = StyledLink.withComponent(RouterLink);
        return (
            <AsInternalLink
                onClick={onClick}
                to={to}
                tertiary={tertiary}
                {...rest}
            />
        );
    }
    return (
        <StyledLink
            href={href}
            onClick={wrapPreventDefault(onClick, href)}
            onKeyPress={href ? undefined : handleEnter(onClick)}
            rel={target === '_blank' ? 'noreferrer noopener' : void 0}
            target={target}
            {...(typeof href === 'undefined' ? BUTTON_PROPS : null)}
            tertiary={tertiary}
            {...rest}
        />
    );
};

Link.displayName = 'Link';

export default Link;
