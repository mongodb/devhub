import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { P } from './text';
import { colorMap, size } from './theme';

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

const Option = styled('div')`
    background-color: ${colorMap.greyDarkTwo};
    color: ${colorMap.greyLightTwo};
    padding: ${size.small} ${size.medium};
    :hover {
        background-color: ${colorMap.greyDarkOne};
        color: ${colorMap.devWhite};
    }
`;

const StyledCustomSelect = styled('div')`
    background-color: ${colorMap.greyDarkTwo};
    color: ${colorMap.devWhite};
    cursor: pointer;
    ${({ showOptions }) => showOptions && activeSelectStyles};
`;

const SelectedOption = styled('div')`
    background-color: ${colorMap.greyDarkTwo};
    color: ${colorMap.devWhite};
    display: flex;
    justify-content: space-between;
    padding: ${size.medium};
    ::after {
        content: ${({ showOptions }) =>
            showOptions ? '"\u25b2";' : '"\u25bc";'};
    }
`;

const FormSelect = ({
    name,
    choices = [],
    defaultText = '',
    errors = [],
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
    const optionOnClick = (v, t) => {
        setSelectValue(v);
        setSelectText(t);
        if (onChange) {
            onChange(v, t);
        }
        setShowOptions(false);
    };
    return (
        <StyledCustomSelect showOptions={showOptions}>
            <SelectedOption
                name={name}
                value={selectValue}
                validationStatus={validationStatus}
                errors={errors}
                onClick={selectOnClick}
                showOptions={showOptions}
                {...extraProps}
            >
                <P collapse>{selectText}</P>
            </SelectedOption>
            {showOptions &&
                choices.map(([choiceValue, text]) => (
                    <Option
                        key={choiceValue}
                        value={choiceValue}
                        onClick={() => optionOnClick(choiceValue, text)}
                    >
                        {text}
                    </Option>
                ))}
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
