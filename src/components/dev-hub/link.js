import React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Link as RouterLink } from 'gatsby';
import { addTrailingSlashBeforeParams } from '../../utils/add-trailing-slash-if-missing';
import { fontSize } from './theme';

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

const tertiaryLinkStyling = theme => css`
    color: ${theme.colorMap.greyLightThree};
    font-family: 'Fira Mono', monospace;
    font-size: ${fontSize.small};
    display: block;
    text-decoration: none;
    &:hover {
        cursor: pointer;
        color: ${theme.colorMap.lightGreen};
    }

    &:after {
        /* 2192 is "RIGHTWARDS ARROW" */
        content: ' \u2192';
    }
`;

const linkStyling = theme => css`
    color: ${theme.colorMap.devWhite};
    font-size: inherit;
    text-decoration: underline;
    &:visited {
        color: ${theme.colorMap.devWhite};
    }
    &:hover {
        color: ${theme.colorMap.darkGreen};
    }
`;

const StyledLink = styled('a')`
    ${({ tertiary, theme }) =>
        tertiary ? tertiaryLinkStyling(theme) : linkStyling(theme)}
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
const Link = React.forwardRef(
    ({ href, onClick, target, tertiary, to, ...rest }, ref) => {
        if (to) {
            const AsInternalLink = StyledLink.withComponent(RouterLink);
            const absoluteLink = to.startsWith('/') ? to : `/${to}`;
            const linkWithTrailingSlash = addTrailingSlashBeforeParams(
                absoluteLink
            );
            return (
                <AsInternalLink
                    ref={ref}
                    onClick={onClick}
                    to={linkWithTrailingSlash}
                    tertiary={tertiary}
                    {...rest}
                />
            );
        }
        return (
            <StyledLink
                ref={ref}
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
    }
);

Link.displayName = 'Link';

export default Link;
