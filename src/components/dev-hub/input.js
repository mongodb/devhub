import React from 'react';
import styled from '@emotion/styled';
import { colorMap, fontSize, size } from './theme';

const StyledInput = styled('input')`
    border: none;
    background-color: ${colorMap.greyDarkOne};
    color: ${colorMap.devWhite};
    font-size: ${fontSize.default};
    outline: none;
    padding: ${size.medium};
    width: calc(100% - ${size.medium} - ${size.medium});

    :focus {
        border: 2px solid;
        border-image: linear-gradient(
                270deg,
                ${colorMap.violet} 0%,
                ${colorMap.magenta} 49.99%,
                ${colorMap.orange} 100%
            )
            1;
        transition: border 0.1s linear 0.1s;
    }

    ::placeholder {
        color: ${colorMap.greyLightTwo};
        opacity: 1;
    }

    /* Needed for Edge */
    ::ms-input-placeholder {
        color: ${colorMap.greyLightTwo};
        opacity: 1;
    }
`;

const FormInput = ({ value, ...props }) => {
    const hasValue = !!value;
    return (
        <div>
            {props.placeholder && hasValue && (
                <label>{props.placeholder}</label>
            )}
            <StyledInput {...props} />
        </div>
    );
};

export default FormInput;
