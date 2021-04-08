import React from 'react';
import { useTheme } from '@emotion/react';

const CloseIcon = ({ color, ...props }) => {
    const theme = useTheme();
    const iconColor = color ? color : theme.colorMap.greyDarkTwo;
    return (
        <svg height="36" viewBox="0 0 36 36" width="36" {...props}>
            <path
                d="m19.3727528 18 8.6272472 8.6272472-1.3727528 1.3727528-8.6272472-8.6272472-8.62724724 8.6252867-1.37275276-1.3727528 8.6272472-8.6252867-8.62528668-8.62724724 1.37275275-1.37275276 8.62528673 8.6272472 8.6272472-8.6272472 1.3727528 1.37275276z"
                fill={iconColor}
                fill-rule="evenodd"
            />
        </svg>
    );
};

export default CloseIcon;
