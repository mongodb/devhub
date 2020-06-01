import React from 'react';
import { useTheme } from 'emotion-theming';

const Twitch = ({ color, ...props }) => {
    const theme = useTheme();
    const iconColor = color ? color : theme.colorMap.greyLightTwo;
    return (
        <svg
            aria-label="Twitch"
            width="20"
            height="20"
            viewBox="0 0 15 16"
            {...props}
        >
            <g transform="translate(-426, -3360)" fill={iconColor} fillRule="nonzero">
                <g transform="translate(0, 3246)">
                    <g transform="translate(426, 114)">
                        <path
                            d="M0.0243902439,2.78333333 L0.0243902439,13.9126667 L3.76357724,13.9126667 L3.76357724,16 L5.80520325,16 L7.84357724,13.912 L10.9037398,13.912 L14.9843902,9.74 L14.9843902,0 L1.04357724,0 L0.0243902439,2.78333333 Z M2.40357724,1.39 L13.6243902,1.39 L13.6243902,9.04266667 L11.2439024,11.4773333 L7.50341463,11.4773333 L5.46504065,13.562 L5.46504065,11.4773333 L2.40357724,11.4773333 L2.40357724,1.39 Z"
                            id="Shape"
                        ></path>
                        <polygon points="6.14471545 4.17466667 7.50406504 4.17466667 7.50406504 8.348 6.14471545 8.348"></polygon>
                        <polygon points="9.88325203 4.17466667 11.243252 4.17466667 11.243252 8.348 9.88325203 8.348"></polygon>
                    </g>
                </g>
            </g>
        </svg>
    )
}
export default Twitch;
