import React from 'react';
import { useTheme } from 'emotion-theming';

const DIRECTION_TO_SVG_PATH = {
    down: 'M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z',
    right: 'M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z',
    up: 'M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z',
};

const ArrowheadIcon = ({ color, direction = 'up' }) => {
    const theme = useTheme();
    const iconColor = color ? color : theme.colorMap.greyLightTwo;
    return (
        <svg height="24" viewBox="0 0 24 24" width="24">
            <path d={DIRECTION_TO_SVG_PATH[direction]} fill={iconColor} />
            <path d="M0 0h24v24H0V0z" fill="none" />
        </svg>
    );
};

export default ArrowheadIcon;
