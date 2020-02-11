import React from 'react';
import styled from '@emotion/styled';
import {
    animationSpeed,
    colorMap,
    fontSize,
    FORM_ELEMENT_BORDER,
    size,
} from './theme';

const StyledLabel = styled('label')`
    font-family: 'Fira Mono', monospace;
    position: absolute;
    top: 12px;
    left: 22px;
    background: linear-gradient(
        180deg,
        transparent 50%,
        ${colorMap.greyDarkOne} 50%
    );
    z-index: 1;
    opacity: 0;
`;

const StyledInput = styled('input')`
    border: 2px solid transparent;
    background-color: ${colorMap.greyDarkOne};
    color: ${colorMap.devWhite};
    font-family: 'Fira Mono', monospace;
    font-size: ${fontSize.default};
    outline: none;
    position: relative;
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
        transition: border ${animationSpeed.fast} linear ${animationSpeed.fast};
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

const InputContainer = styled('div')`
    position: relative;

    :focus-within {
        label {
            color: ${colorMap.devWhite};
            opacity: 1;
            top: -14px;
            ${({ isEmpty }) =>
                isEmpty ? 'transition: top 0.2s' : 'transition: opacity 0.2s'};
            z-index: 1;
        }
        input::placeholder {
            opacity: 0;
        }
    }

    :not(:focus-within) {
        label {
            opacity: 0;
            top: 12px;
            transition: top 0s ease-in-out 0.4s, opacity 0.4s,
                z-index 0s ease-in-out 0.4s;
            z-index: -1;
        }
        input::placeholder {
            opacity: 1;
            transition: opacity 0.15s;
            ${({ isEmpty }) => isEmpty && 'transition-delay: 0.4s;'};
        }
    }
`;

const FormInput = ({ narrow, value, ...props }) => {
    const hasValue = !!value;
    return (
        <InputContainer isEmpty={!hasValue}>
            <StyledLabel>{props.placeholder}</StyledLabel>
            <StyledInput narrow={narrow} {...props} />
        </InputContainer>
    );
};

export default FormInput;
