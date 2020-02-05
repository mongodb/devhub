import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { P } from './text';
import { colorMap, fontSize, size } from './theme';

const transitionIntoFocus = css`
    border: 2px solid;
    border-image: linear-gradient(
            270deg,
            ${colorMap.violet} 0%,
            ${colorMap.magenta} 49.99%,
            ${colorMap.orange} 100%
        )
        1;
    transition: border 0.1s linear 0.1s;
    legend {
        opacity: 1;
        transition: opacity 0.1s linear 0.1s;
    }
    input:placeholder-shown ~ span {
        transition: top 0.1s linear 0.1s;
    }
    input:not(:placeholder-shown) ~ span {
        transition: opacity 0.1s linear 0.1s;
    }
    span {
        left: 24px;
        top: 0px;
    }
`;

const transitionOutOfFocus = css`
    transition: border 0.1s linear 0.1s;
    legend {
        transition: opacity 0.1s linear 0.1s;
    }
    input:placeholder-shown ~ span {
        transition: opacity 0.1s linear 0.1s, top 0.1s linear 0.1s;
    }
    input:not(:placeholder-shown) ~ span {
        opacity: 0;
    }
`;

const LegendPlaceholderText = styled(P)`
    opacity: 0;
`;

const InputContainer = styled('div')`
    position: relative;
    width: 100%;
`;

const PlaceholderSpan = styled('span')`
    color: ${colorMap.greyLightTwo};
    left: 24px;
    opacity: 1;
    position: absolute;
    top: 30px;
`;

const StyledFieldset = styled('fieldset')`
    border: none;
    padding: 0;

    :focus-within {
        ${transitionIntoFocus};
    }
    :not(:focus-within) {
        ${transitionOutOfFocus};
    }
`;

const StyledInput = styled('input')`
    border: none;
    background-color: ${colorMap.greyDarkOne};
    color: ${colorMap.devWhite};
    font-size: ${fontSize.default};
    outline: none;
    padding: ${size.medium};
    width: calc(100% - ${size.medium} - ${size.medium});

    ::placeholder {
        opacity: 0;
    }

    /* Needed for Edge */
    ::ms-input-placeholder {
        opacity: 0;
    }
`;

const StyledLegend = styled('legend')`
    > * {
        opacity: 0;
    }
    margin-left: 17px;
    margin-bottom: -8px;
    opacity: 0;
`;

const FormInput = props => {
    return (
        <InputContainer>
            <StyledFieldset>
                {props.placeholder && (
                    <StyledLegend>
                        <LegendPlaceholderText collapse>
                            {props.placeholder}
                        </LegendPlaceholderText>
                    </StyledLegend>
                )}
                <StyledInput {...props} />
                {props.placeholder && (
                    <PlaceholderSpan>{props.placeholder}</PlaceholderSpan>
                )}
            </StyledFieldset>
        </InputContainer>
    );
};

export default FormInput;
