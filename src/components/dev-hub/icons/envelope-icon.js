import React from 'react';

const EnvelopeIcon = ({ color, ...props }) =>{
    const iconColor = color ? color : ({ theme }) => theme.colorMap.greyLightTwo;
    return (
        <svg width="30" height="20" viewBox="0 0 125 100" {...props}>
            <path
                d="M60,0 l50,0 a10,10 0 0,1 7,17 l-50,50 a10,10 0 0,1 -13,0 l-50,-50 a10,10 0 0,1 7,-17z"
                stroke="#000"
                strokeWidth="0"
                fill={iconColor}
            />
            <path
                d="M60,90 l54,0 a10,10 0 0,0 7,-7 l0,-60 -50,50 a15,15 0 0,1 -21,0 l-50,-50 0,60 a10,10 0 0,0 7,7z"
                stroke="#000"
                strokeWidth="0"
                fill={iconColor}
            />
        </svg>
    )
}

export default EnvelopeIcon;
