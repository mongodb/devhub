import React from 'react';

const SuccessIcon = ({ color, id = 'linearGradient-1', ...props }) => {
    color = color || `url(#${id})`;
    return (
        <svg width="48px" height="48px" viewBox="0 0 48 48" {...props}>
            <defs>
                <linearGradient
                    x1="99.849632%"
                    y1="99.849632%"
                    x2="0%"
                    y2="0%"
                    id={id}
                >
                    <stop stopColor="#7ACFDD" offset="0.0501478041%"></stop>
                    <stop stopColor="#0AD05B" offset="49.9626814%"></stop>
                    <stop stopColor="#13AA52" offset="100%"></stop>
                </linearGradient>
            </defs>
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g transform="translate(-696.000000, -366.000000)" fill={color}>
                    <g
                        id={`Modal${id}`}
                        transform="translate(420.000000, 326.000000)"
                    >
                        <g
                            id={`Group-3${id}`}
                            transform="translate(40.000000, 20.000000)"
                        >
                            <g
                                id={`Copy-success${id}`}
                                transform="translate(236.000000, 20.000000)"
                            >
                                <path
                                    d="M24,0 C37.254834,0 48,10.745166 48,24 C48,37.254834 37.254834,48 24,48 C10.745166,48 0,37.254834 0,24 C0,10.745166 10.745166,0 24,0 Z M33.5250346,15.0256227 C32.9617628,15.1157429 32.4555408,15.4382887 32.1178282,15.9222421 L21.9340957,30.5002816 L15.4583833,25.03533 C14.5296495,24.2849411 13.2025725,24.455275 12.4715653,25.4186959 C11.7405581,26.3821168 11.8738167,27.7851595 12.771487,28.5764881 L20.9937679,35.5137491 C21.4527486,35.8924064 22.0367701,36.0605765 22.6145006,35.9804419 C23.1922311,35.9003074 23.7151748,35.5785949 24.0657345,35.0876497 L35.5834603,18.6112014 C35.9208742,18.1263211 36.061724,17.5198644 35.9749897,16.9253928 C35.8882554,16.3309213 35.5810507,15.7971911 35.1210322,15.441747 C34.6624432,15.0851972 34.0883064,14.9355025 33.5250346,15.0256227 Z"
                                    id={`Combined-Shape${id}`}
                                ></path>
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    );
};
export default SuccessIcon;
