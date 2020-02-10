import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { P } from './text';
import { colorMap, size } from './theme';

const OPTIONS_POSITION_OFFSET = 36;

const activeSelectStyles = css`
    border: 2px solid;
    border-image: linear-gradient(
            270deg,
            ${colorMap.violet} 0%,
            ${colorMap.magenta} 49.99%,
            ${colorMap.orange} 100%
        )
        1;
`;

const Option = styled('li')`
    background-color: ${colorMap.greyDarkTwo};
    color: ${colorMap.greyLightTwo};
    padding: ${({ narrow }) =>
        narrow ? `${size.small} ${size.medium}` : size.medium};
    display: block;
    :hover {
        background-color: ${colorMap.greyDarkOne};
        color: ${colorMap.devWhite};
    }
`;

const Options = styled('ul')`
    border: 2px solid;
    border-image: linear-gradient(
            270deg,
            ${colorMap.violet} 0%,
            ${colorMap.magenta} 49.99%,
            ${colorMap.orange} 100%
        )
        1;
    border-top: none;
    /* -2px to account for border above */
    left: -2px;
    padding: 0;
    position: absolute;
    margin: 0;
    top: ${OPTIONS_POSITION_OFFSET}px;
    width: 100%;
`;

const StyledCustomSelect = styled('div')`
    background-color: ${colorMap.greyDarkTwo};
    /* Adding border without color to prevent jarring visual on expand */
    border: 2px solid;
    color: ${colorMap.devWhite};
    cursor: pointer;
    position: relative;
    ${({ showOptions }) => showOptions && activeSelectStyles};
`;

const SelectedOption = styled('div')`
    background-color: ${colorMap.greyDarkTwo};
    color: ${colorMap.devWhite};
    display: flex;
    justify-content: space-between;
    padding: ${({ narrow }) =>
        narrow ? `${size.small} ${size.medium}` : size.medium};
    ::after {
        content: ${({ showOptions }) =>
            showOptions ? '"\u2228";' : '"\u2227";'};
    }
`;

const FormSelect = ({
    name,
    choices = [],
    defaultText = '',
    errors = [],
    narrow = false,
    onChange = null,
    validationStatus = null,
    value = '',
    ...extraProps
}) => {
    const [selectValue, setSelectValue] = useState(value);
    const [selectText, setSelectText] = useState(defaultText);
    const [showOptions, setShowOptions] = useState(false);
    const selectOnClick = useCallback(() => {
        setShowOptions(!showOptions);
    }, [showOptions]);
    const optionOnClick = (value, text) => {
        setSelectValue(value);
        setSelectText(text);
        if (onChange) {
            onChange(value, text);
        }
        setShowOptions(false);
    };
    return (
        <StyledCustomSelect showOptions={showOptions}>
            <SelectedOption
                name={name}
                narrow={narrow}
                value={selectValue}
                validationStatus={validationStatus}
                errors={errors}
                onClick={selectOnClick}
                showOptions={showOptions}
                {...extraProps}
            >
                <P collapse>{selectText}</P>
            </SelectedOption>
            {showOptions && (
                <Options>
                    {choices.map(([choiceValue, text]) => (
                        <Option
                            key={choiceValue}
                            narrow={narrow}
                            onClick={() => optionOnClick(choiceValue, text)}
                            value={choiceValue}
                        >
                            {text}
                        </Option>
                    ))}
                </Options>
            )}
        </StyledCustomSelect>
    );
};

FormSelect.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    choices: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
    defaultText: PropTypes.string,
    validationStatus: PropTypes.string,
    errors: PropTypes.arrayOf(PropTypes.string),
};

export default FormSelect;
