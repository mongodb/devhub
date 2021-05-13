import React from 'react';
import PropTypes from 'prop-types';
import DevHubLink from './dev-hub/link';
import { isLinkForImage } from '~utils/is-link-for-image';
import { isPreviewMode } from '~utils/is-preview-mode';

/*
 * Note: This component is not suitable for internal page navigation:
 * https://www.gatsbyjs.org/docs/gatsby-link/#recommendations-for-programmatic-in-app-navigation
 */

// Since DOM elements <a> cannot receive activeClassName and partiallyActive,
// destructure the prop here and pass it only to GatsbyLink.
const Link = React.forwardRef(
    ({ children, to, activeClassName, partiallyActive, ...other }, ref) => {
        if (!to) to = '';
        // Assume that external links begin with http:// or https:// or have mailto
        const external =
            /^http(s)?:\/\/|^mailto:[\w-.]+@(\w+.)/.test(to) ||
            isLinkForImage(to);
        const anchor = to.startsWith('#');

        // Use Gatsby Link for internal links, and <a> for others
        if (!isPreviewMode() && to && !external && !anchor) {
            if (!to.startsWith('/')) to = `/${to}`;
            return (
                <DevHubLink
                    ref={ref}
                    to={to}
                    activeClassName={activeClassName}
                    partiallyActive={partiallyActive}
                    {...other}
                >
                    {children}
                </DevHubLink>
            );
        }
        if (anchor) {
            // We don't want any target="_blank" to apply
            return (
                <DevHubLink ref={ref} href={to} {...other} target="_self">
                    {children}
                </DevHubLink>
            );
        }
        return (
            <DevHubLink ref={ref} href={to} {...other}>
                {children}
            </DevHubLink>
        );
    }
);

Link.propTypes = {
    to: PropTypes.string.isRequired,
};

export default Link;
