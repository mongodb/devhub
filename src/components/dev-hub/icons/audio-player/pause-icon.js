import React from 'react';
import PropTypes from 'prop-types';

const PauseIcon = ({ width = '80px', height = '80px', ...props }) => (
    <svg
        width={width}
        height={height}
        fill="none"
        viewBox="0 0 80px 80px"
        {...props}
    >
        <title>Pause</title>
        <circle
            cx="40"
            cy="40"
            r="39"
            stroke="url(#pause-icon-linear-1)"
            strokeWidth="2"
        />
        <path
            stroke="url(#pause-icon-linear-2)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M47.33 25.44v29.12"
        />
        <path
            stroke="url(#pause-icon-linear-3)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M34 25.44v29.12"
        />
        <defs>
            <linearGradient
                id="pause-icon-linear-1"
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
                id="pause-icon-linear-2"
                x1="48.33"
                x2="39.18"
                y1="55.56"
                y2="26.72"
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#F7A76F" />
                <stop offset=".38" stopColor="#E55F55" />
                <stop offset=".54" stopColor="#E55F55" />
                <stop offset=".73" stopColor="#D34F94" />
                <stop offset="1" stopColor="#D34F94" />
            </linearGradient>
            <linearGradient
                id="pause-icon-linear-3"
                x1="35"
                x2="25.84"
                y1="55.56"
                y2="26.72"
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

PauseIcon.propTypes = {
    height: PropTypes.string,
    width: PropTypes.string,
};

export default PauseIcon;
