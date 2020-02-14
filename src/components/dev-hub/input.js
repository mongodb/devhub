import React from 'react';
import styled from '@emotion/styled';
import {
    animationSpeed,
    colorMap,
    fontSize,
    FORM_ELEMENT_BORDER,
    gradientMap,
    layer,
    size,
} from './theme';

const LABEL_ABSOLUTE_LEFT = 22;
const LABEL_END_TOP = -14;
const LABEL_START_TOP = 9;

const StyledLabel = styled('label')`
    background: linear-gradient(
        180deg,
        transparent 50%,
        ${colorMap.greyDarkOne} 50%
    );
    font-family: 'Fira Mono', monospace;
    left: ${LABEL_ABSOLUTE_LEFT}px;
    position: absolute;
    top: ${LABEL_START_TOP}px;
    opacity: 0;
    z-index: ${layer.front};
`;

const StyledInput = styled('input')`
    background-color: ${colorMap.greyDarkOne};
    border: ${FORM_ELEMENT_BORDER} solid transparent;
    color: ${colorMap.devWhite};
    font-family: 'Fira Mono', monospace;
    font-size: ${fontSize.default};
    outline: none;
    padding: ${({ narrow }) =>
        narrow ? `${size.small} ${size.medium}` : size.medium};
    position: relative;
    width: calc(
        100% - ${size.medium} - ${size.medium} - ${FORM_ELEMENT_BORDER} -
            ${FORM_ELEMENT_BORDER}
    );

    :focus {
        border-image: ${gradientMap.magentaSalmonYellow} 1;
        transition: border ${animationSpeed.fast} linear ${animationSpeed.fast};
    }

    /* Needed for IE 11 */
    ::-ms-input-placeholder {
        color: ${colorMap.greyLightTwo};
        opacity: 1;
    }

    ::placeholder {
        color: ${colorMap.greyLightTwo};
        opacity: 1;
    }
`;

const InputContainer = styled('div')`
    position: relative;

    :focus-within {
        label {
            opacity: 1;
            top: ${LABEL_END_TOP}px;
            transition: ${({ isEmpty }) =>
                isEmpty
                    ? `top ${animationSpeed.fast}`
                    : `opacity ${animationSpeed.fast}`};
        }
        input::-ms-input-placeholder {
            opacity: 0;
        }
        input::placeholder {
            opacity: 0;
        }
    }

    :not(:focus-within) {
        label {
            opacity: 0;
            top: ${({ narrow }) =>
                narrow
                    ? `${LABEL_START_TOP}px`
                    : `calc(${LABEL_START_TOP}px + ${size.small})`};
            transition: top 0s ease-in-out ${animationSpeed.fast},
                opacity ${animationSpeed.fast},
                z-index 0s ease-in-out ${animationSpeed.fast};
            /* Need to push to back layer to allow clicking over */
            z-index: ${layer.superBack};
        }
        input::ms-input-placeholder {
            opacity: 1;
            transition: opacity ${animationSpeed.fast} ease-in-out
                ${animationSpeed.fast};
        }
        input::placeholder {
            opacity: 1;
            transition: opacity ${animationSpeed.fast} ease-in-out
                ${animationSpeed.fast};
        }
    }
`;

const FormInput = ({ narrow, value, ...props }) => {
    const isEmpty = !value;
    return (
        <InputContainer isEmpty={isEmpty} narrow={narrow}>
            <StyledLabel>{props.placeholder}</StyledLabel>
            <StyledInput narrow={narrow} {...props} />
        </InputContainer>
    );
};

export default FormInput;
