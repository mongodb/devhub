import React from 'react';
import PropTypes from 'prop-types';

const PlayIcon = ({ width = '80px', height = '80px', ...props }) => (
    <svg width={width} height={height} fill="none" {...props}>
        <title>Play</title>
        <circle
            cx="40"
            cy="40"
            r="39"
            stroke="url(#play-icon-linear-1)"
            strokeWidth="2"
        />
        <path
            stroke="url(#play-icon-linear-2)"
            strokeWidth="2"
            d="M56.7 39.16a1 1 0 010 1.68L32.89 56.32a1 1 0 01-1.55-.84V24.52a1 1 0 011.55-.84L56.7 39.16z"
        />
        <defs>
            <linearGradient
                id="play-icon-linear-1"
                x1="78.34"
                x2="1"
                y1="78.74"
                y2="1"
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#F7A76F" />
                <stop offset=".38" stopColor="#E55F55" />
                <stop offset=".54" stopColor="#E55F55" />
                <stop offset=".73" stopColor="#D34F94" />
                <stop offset="1" stopColor="#D34F94" />
            </linearGradient>
            <linearGradient
                id="play-icon-linear-2"
                x1="49.11"
                x2="26.89"
                y1="80"
                y2="14.44"
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#F7A76F" />
                <stop offset=".38" stopColor="#E55F55" />
                <stop offset=".54" stopColor="#E55F55" />
                <stop offset=".73" stopColor="#D34F94" />
                <stop offset="1" stopColor="#D34F94" />
            </linearGradient>
        </defs>
    </svg>
);

PlayIcon.propTypes = {
    height: PropTypes.string,
    width: PropTypes.string,
};

export default PlayIcon;
