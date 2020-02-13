import React from 'react';
import { colorMap } from '../theme';

const ArrowheadIcon = ({ color = colorMap.greyLightTwo, down = false }) =>
    down ? (
        <svg height="24" viewBox="0 0 24 24" width="24">
            <path
                d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"
                fill={color}
            />
            <path d="M0 0h24v24H0V0z" fill="none" />
        </svg>
    ) : (
        <svg height="24" viewBox="0 0 24 24" width="24">
            <path
                d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"
                fill={color}
            />
            <path d="M0 0h24v24H0z" fill="none" />
        </svg>
    );

export default ArrowheadIcon;
