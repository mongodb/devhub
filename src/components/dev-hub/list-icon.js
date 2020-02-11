import React from 'react';
import { colorMap } from './theme';

const ListIcon = ({ color = colorMap.greyLightTwo, ...props }) => (
    <svg viewBox="0 0 60.123 60.123" width="25" height="25" {...props}>
        <g>
            <path
                fill={color}
                d="M57.124,51.893H16.92c-1.657,0-3-1.343-3-3s1.343-3,3-3h40.203c1.657,0,3,1.343,3,3S58.781,51.893,57.124,51.893z"
            />
            <path
                fill={color}
                d="M57.124,33.062H16.92c-1.657,0-3-1.343-3-3s1.343-3,3-3h40.203c1.657,0,3,1.343,3,3
                C60.124,31.719,58.781,33.062,57.124,33.062z"
            />
            <path
                fill={color}
                d="M57.124,14.231H16.92c-1.657,0-3-1.343-3-3s1.343-3,3-3h40.203c1.657,0,3,1.343,3,3S58.781,14.231,57.124,14.231z"
            />
            <circle fill={color} cx="4.029" cy="11.463" r="4.029" />
            <circle fill={color} cx="4.029" cy="30.062" r="4.029" />
            <circle fill={color} cx="4.029" cy="48.661" r="4.029" />
        </g>
    </svg>
);

export default ListIcon;
