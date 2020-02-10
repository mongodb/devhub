import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { P } from './text';
import { colorMap, layer, size } from './theme';

const OPTIONS_POSITION_OFFSET = 58;
const OPTIONS_POSITION_OFFSET_NARROW = 36;

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
    display: block;
    padding: ${({ narrow }) =>
        narrow ? `${size.small} ${size.medium}` : size.medium};
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
    top: ${({ narrow }) =>
        narrow
            ? `${OPTIONS_POSITION_OFFSET_NARROW}px`
            : `${OPTIONS_POSITION_OFFSET}px`};
    width: 100%;
    z-index: ${layer.middle};
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
        height: ${size.small};
        content: ${({ showOptions }) =>
            showOptions ? '"\u2193";' : '"\u2191";'};
        font-family: 'Fira Mono', monospace;
    }
    position: relative;
`;

const FormSelect = ({
    children,
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

    const showOptionsOnEnter = useCallback(
        e => {
            const enterKey = 13;
            if (e.keyCode === enterKey) {
                selectOnClick();
            }
        },
        [selectOnClick]
    );

    const optionOnClick = useCallback(
        (value, text) => {
            setSelectValue(value);
            setSelectText(text);
            if (onChange) {
                onChange(value, text);
            }
            setShowOptions(false);
        },
        [onChange]
    );

    const optionOnEnter = useCallback(
        (v, t) => e => {
            const enterKey = 13;
            if (e.keyCode === enterKey) {
                optionOnClick(v, t);
            }
        },
        [optionOnClick]
    );

    const selectOptions = choices.length ? choices : children;
    return (
        <StyledCustomSelect
            aria-expanded={showOptions}
            onClick={selectOnClick}
            onKeyDown={showOptionsOnEnter}
            role="listbox"
            showOptions={showOptions}
            tabIndex="0"
        >
            <SelectedOption
                errors={errors}
                name={name}
                narrow={narrow}
                showOptions={showOptions}
                validationStatus={validationStatus}
                value={selectValue}
                {...extraProps}
            >
                <P collapse>{selectText}</P>
            </SelectedOption>
            {showOptions && (
                <Options narrow={narrow}>
                    {selectOptions.map(([choiceValue, text]) => (
                        <Option
                            key={choiceValue}
                            narrow={narrow}
                            onClick={() => optionOnClick(choiceValue, text)}
                            onKeyDown={optionOnEnter(choiceValue, text)}
                            tabIndex="0"
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
