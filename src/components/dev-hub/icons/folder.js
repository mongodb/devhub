import React from 'react';
import { useTheme } from 'emotion-theming';

const Folder = ({ color, ...props }) => {
    const theme = useTheme();
    const folderColor = color ? color : theme.colorMap.greyLightTwo;
    return (
        <svg fill={folderColor} width="25" height="25" viewBox="0 0 24 24" {...props}>
            <g>
                <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
            </g>
        </svg>
    )
}

export default Folder;
