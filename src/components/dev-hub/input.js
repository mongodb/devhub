import React from 'react';
import styled from '@emotion/styled';
import {
    animationSpeed,
    fontSize,
    FORM_ELEMENT_BORDER,
    layer,
    lineHeight,
    size,
} from './theme';
import Label from './input-label';

const LABEL_ABSOLUTE_LEFT = 18;
const LABEL_END_TOP = -10;
const LABEL_START_TOP = 0;

const StyledInput = styled('input')`
    background-color: ${({ theme }) => theme.colorMap.greyDarkTwo};
    border: ${FORM_ELEMENT_BORDER} solid transparent;
    color: ${({ theme }) => theme.colorMap.devWhite};
    font-family: 'Fira Mono', monospace;
    font-size: ${fontSize.small};
    line-height: ${lineHeight.small};
    outline: none;
    padding: ${({ narrow }) => (narrow ? `6px ${size.default}` : size.default)};
    position: relative;
    width: 100%;
    :focus {
        border-image: ${({ theme }) => theme.gradientMap.magentaSalmonYellow} 1;
        transition: border ${animationSpeed.fast} linear ${animationSpeed.fast};
    }
    /* Needed for IE 11 */
    ::-ms-input-placeholder {
        color: ${({ theme }) => theme.colorMap.greyLightTwo};
        opacity: 1;
    }
    ::placeholder {
        color: ${({ theme }) => theme.colorMap.greyLightTwo};
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
    // Value can sometimes be null, this does not properly clear out the text field
    const inputValue = isEmpty ? '' : value;
    return (
        <InputContainer isEmpty={isEmpty} narrow={narrow}>
            <Label
                labelAbsoluteLeft={LABEL_ABSOLUTE_LEFT}
                labelStartTop={LABEL_START_TOP}
            >
                {props.placeholder}
            </Label>
            <StyledInput value={inputValue} narrow={narrow} {...props} />
        </InputContainer>
    );
};

export default FormInput;
