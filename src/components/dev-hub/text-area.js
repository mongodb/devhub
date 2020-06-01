import React from 'react';
import styled from '@emotion/styled';
import {
    animationSpeed,
    fontSize,
    FORM_ELEMENT_BORDER,
    layer,
    size,
} from './theme';
import Label from './input-label';

const LABEL_ABSOLUTE_LEFT = 18;
const LABEL_END_TOP = -10;
const LABEL_START_TOP = 0;

const StyledTextArea = styled('textarea')`
    background-color: ${({ theme }) => theme.colorMap.greyDarkTwo};
    border: ${FORM_ELEMENT_BORDER} solid transparent;
    color: ${({ theme }) => theme.colorMap.devWhite};
    font-family: 'Fira Mono', monospace;
    font-size: ${fontSize.small};
    height: 180px;
    outline: none;
    padding: ${size.default};
    position: relative;
    resize: none;
    width: 100%;
    :focus {
        border-image: ${({ theme }) => theme.gradientMap.magentaSalmonYellow} 1;
        transition: border ${animationSpeed.fast} linear ${animationSpeed.fast};
    }
    /* Needed for IE 11 */
    ::-ms-textarea-placeholder {
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
        textarea::-ms-textarea-placeholder {
            opacity: 0;
        }
        textarea::placeholder {
            opacity: 0;
        }
    }
    :not(:focus-within) {
        label {
            opacity: 0;
            top: calc(${LABEL_START_TOP}px + ${size.small});
            transition: top 0s ease-in-out ${animationSpeed.fast},
                opacity ${animationSpeed.fast},
                z-index 0s ease-in-out ${animationSpeed.fast};
            /* Need to push to back layer to allow clicking over */
            z-index: ${layer.superBack};
        }
        textarea::ms-textarea-placeholder {
            opacity: 1;
            transition: opacity ${animationSpeed.fast} ease-in-out
                ${animationSpeed.fast};
        }
        textarea::placeholder {
            opacity: 1;
            transition: opacity ${animationSpeed.fast} ease-in-out
                ${animationSpeed.fast};
        }
    }
`;
const TextArea = ({ value, ...props }) => {
    const isEmpty = !value;
    return (
        <InputContainer isEmpty={isEmpty}>
            <Label
                labelAbsoluteLeft={LABEL_ABSOLUTE_LEFT}
                labelStartTop={LABEL_START_TOP}
            >
                {props.placeholder}
            </Label>
            <StyledTextArea value={value} {...props} />
        </InputContainer>
    );
};

export default TextArea;
