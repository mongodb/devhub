import React from 'react';

const Clock = ({ color, ...props }) => (
    <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill={color || 'none'}
        xmlns="http://www.w3.org/2000/svg"
        style={{
            lineHeight: '20px',
            marginRight: '4px',
            marginTop: '-3px',
            verticalAlign: 'middle',
        }}
        {...props}
    >
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0 6C0 2.68634 2.68634 0 6 0C9.31366 0 12 2.68634 12 6C12 9.31366 9.31366 12 6 12C2.68634 12 0 9.31366 0 6ZM6 3C6 2.44772 5.55228 2 5 2C4.44772 2 4 2.44772 4 3V6.375C4 6.80939 4.28044 7.1941 4.69399 7.32703L8.19399 8.45203C8.71978 8.62103 9.28302 8.3318 9.45203 7.80601C9.62103 7.28022 9.3318 6.71698 8.80601 6.54797L6 5.64604V3Z"
            fill="#B8C4C2"
        />
    </svg>
);

export default Clock;
