import React, { useMemo } from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { colorMap, gradientMap, size } from './theme';
import { P3 } from './text';

const RANGE_BUFFER_SIZE = '6px';

const inputThumbStyle = css`
    -webkit-appearance: none;
    background: ${colorMap.sherbet};
    background-size: 100%;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    height: ${size.default};
    margin-top: -${RANGE_BUFFER_SIZE};
    width: ${size.default};
`;

const inputTrackStyle = percentage => css`
    border-radius: ${RANGE_BUFFER_SIZE};
    background: ${gradientMap.magentaSalmonSherbet} ${colorMap.greyDarkTwo};
    background-repeat: no-repeat;
    background-size: ${`${percentage}%`} 100%;
    height: 4px;
    margin-bottom: ${RANGE_BUFFER_SIZE};
    margin-top: ${RANGE_BUFFER_SIZE};
`;

const SliderContainer = styled('div')`
    align-items: center;
    display: flex;
    width: 100%;
`;

const StyledInput = styled('input')`
    -webkit-appearance: none;
    background: none;
    width: 100%;
    /* Style the input "thumb" */
    ::-webkit-slider-thumb {
        ${inputThumbStyle};
    }
    ::-moz-range-thumb {
        ${inputThumbStyle};
    }
    /* Style the input "track" */
    ::-webkit-slider-runnable-track {
        ${({ percentage }) => inputTrackStyle(percentage)};
    }
    ::-moz-range-track {
        ${({ percentage }) => inputTrackStyle(percentage)};
    }
`;

const SliderLabelText = styled(P3)`
    font-family: 'Fira Mono';
    margin: 0 ${size.default} 0 0;
    :last-of-type {
        margin-right: 0;
        margin-left: ${size.default};
    }
`;

const Slider = ({ current, currentLabel, onChange, total, totalLabel }) => {
    const sliderPercentage = useMemo(() => Math.ceil((current / total) * 100), [
        current,
        total,
    ]);
    return (
        <SliderContainer>
            <SliderLabelText>{currentLabel || current}</SliderLabelText>
            <StyledInput
                min={0}
                max={total}
                onInput={e => onChange(e.target.value)}
                percentage={sliderPercentage}
                type="range"
                value={current}
            />
            <SliderLabelText>{totalLabel || total}</SliderLabelText>
        </SliderContainer>
    );
};

export default Slider;
