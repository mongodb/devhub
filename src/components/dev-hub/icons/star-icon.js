import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@emotion/react';
import { size } from '~components/dev-hub/theme';

const StarIcon = ({ color, isActive, name, children, size: iconSize, ...props }) => {
    const theme = useTheme();
    const iconColor = color || theme.colorMap.greyDarkOne;

    return (
        <svg
            aria-label="Star"
            width={iconSize || size.default}
            height={iconSize || size.default}
            viewBox="0 0 576 512"
            {...props}
        >
            <linearGradient id={name}>{children}</linearGradient>
            <path
                fill={isActive ? `url(#${name})` : iconColor}
                d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
            />
        </svg>
    );
};

StarIcon.propTypes = {
    children: PropTypes.node, // Gradient
    color: PropTypes.string,
    isActive: PropTypes.bool,
    name: PropTypes.string.isRequired, // Need for gradient
    width: PropTypes.string,
};

export default React.memo(StarIcon);
