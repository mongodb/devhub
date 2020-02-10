import React from 'react';
import styled from '@emotion/styled';
import { colorMap, fontSize, FORM_ELEMENT_BORDER, size } from './theme';

const StyledInput = styled('input')`
    border: 2px solid transparent;
    background-color: ${colorMap.greyDarkOne};
    color: ${colorMap.devWhite};
    font-size: ${fontSize.default};
    outline: none;
    padding: ${({ narrow }) =>
        narrow ? `${size.small} ${size.medium}` : size.medium};
    width: calc(
        100% - ${size.medium} - ${size.medium} - ${FORM_ELEMENT_BORDER} -
            ${FORM_ELEMENT_BORDER}
    );

    :focus {
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

const FormInput = ({ narrow, value, ...props }) => {
    const hasValue = !!value;
    return (
        <div>
            {props.placeholder && hasValue && (
                <label>{props.placeholder}</label>
            )}
            <StyledInput narrow={narrow} {...props} />
        </div>
    );
};

export default FormInput;
