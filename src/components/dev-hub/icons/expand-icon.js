import React from 'react';
import { colorMap } from '../theme';

const ExpandIcon = ({
    color = colorMap.greyDarkTwo,
    down = false,
    ...props
}) => (
    <svg height="36" viewBox="0 0 36 36" width="36" {...props}>
        <path
            d="m19.3727528 22-1.3727528 1.3727528-1.3727528-1.3727528-8.62528668-8.6272472 1.37275275-1.3727528 8.62528673 8.6272472 8.6272472-8.6272472 1.3727528 1.3727528z"
            fill={color}
            fill-rule="evenodd"
            transform={down ? 'none' : 'matrix(1 0 0 -1 0 36)'}
        />
    </svg>
);

export default ExpandIcon;
