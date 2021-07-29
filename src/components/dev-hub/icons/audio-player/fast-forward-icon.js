import React from 'react';
import PropTypes from 'prop-types';

const FastForwardIcon = ({ width = '35px', height = '40px', ...props }) => (
    <svg width={width} height={height} fill="none" {...props}>
        <title>Fast forward</title>
        <path
            fill="url(#paint0_linear)"
            fillRule="evenodd"
            d="M21.67 4.36c.82.48.82 1.68 0 2.16L16.1 9.75a1.25 1.25 0 01-1.88-1.08V6c-6.3.4-11.3 5.68-11.3 12.15 0 6.74 5.41 12.18 12.07 12.18s12.07-5.44 12.07-12.18a1 1 0 112 0c0 7.83-6.3 14.18-14.07 14.18A14.12 14.12 0 01.93 18.14C.93 10.58 6.81 4.4 14.23 4V2.2c0-.97 1.05-1.57 1.88-1.08l5.56 3.23zm-5.44-.85v3.86l3.32-1.93-3.32-1.93z"
            clipRule="evenodd"
        />
        <path
            fill="url(#paint1_linear)"
            d="M11.7 13.9c.54 0 1.01.1 1.41.3.4.18.7.43.92.75.22.32.33.67.33 1.05 0 .5-.16.92-.47 1.26-.3.35-.7.58-1.18.69a2.2 2.2 0 011.37.6c.36.34.54.82.54 1.44 0 .47-.12.9-.37 1.28-.25.39-.6.7-1.06.91a3.97 3.97 0 01-3.08.04c-.47-.2-.86-.49-1.18-.86l.83-.72c.23.27.5.47.8.6.32.14.65.21 1 .21.51 0 .92-.13 1.21-.4.3-.28.46-.65.46-1.11 0-.97-.54-1.45-1.6-1.45h-.72l.16-.99h.5c.42 0 .76-.1 1.04-.33s.42-.55.42-.97c0-.4-.14-.7-.4-.92-.26-.22-.6-.33-1.03-.33-.34 0-.64.06-.91.18-.28.12-.54.3-.8.56l-.72-.77a3.52 3.52 0 012.54-1.02zm7.56 0c.92 0 1.62.38 2.1 1.12.48.74.72 1.8.72 3.18a5.9 5.9 0 01-.72 3.2 2.34 2.34 0 01-2.1 1.1c-.92 0-1.62-.36-2.1-1.1a5.9 5.9 0 01-.72-3.2c0-1.38.24-2.44.72-3.18a2.34 2.34 0 012.1-1.12zm0 1.04c-.48 0-.84.26-1.09.78a6.13 6.13 0 00-.37 2.48c0 1.15.12 1.99.37 2.5.25.53.61.79 1.1.79.47 0 .84-.26 1.08-.78.25-.52.38-1.36.38-2.5 0-1.15-.13-1.98-.38-2.5-.24-.51-.6-.77-1.09-.77zm0 2.5c.23 0 .41.07.57.22.15.15.22.34.22.55a.77.77 0 01-.8.8.77.77 0 01-.55-.23.79.79 0 01-.22-.57.77.77 0 01.78-.78z"
        />
        <defs>
            <linearGradient
                id="paint0_linear"
                x1="1.17"
                x2="32.11"
                y1="32.22"
                y2="4.33"
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#F7A76F" />
                <stop offset=".38" stopColor="#E55F55" />
                <stop offset=".54" stopColor="#E55F55" />
                <stop offset=".73" stopColor="#D34F94" />
                <stop offset="1" stopColor="#D34F94" />
            </linearGradient>
            <linearGradient
                id="paint1_linear"
                x1="23.34"
                x2="9.5"
                y1="25.31"
                y2="10.4"
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

FastForwardIcon.propTypes = {
    height: PropTypes.string,
    width: PropTypes.string,
};

export default FastForwardIcon;
