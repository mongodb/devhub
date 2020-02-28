import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import ArrowheadIcon from './icons/arrowhead-icon';
import { P } from './text';
import { colorMap, gradientMap, layer, size } from './theme';

const BORDER_SIZE = 2;
const OPTIONS_POSITION_OFFSET = 58;
const OPTIONS_POSITION_OFFSET_NARROW = 48;

const activeSelectStyles = css`
    border: ${BORDER_SIZE}px solid;
    border-image: ${gradientMap.violentMagentaOrange} 1;
    outline: none;
`;

const Option = styled('li')`
    background-color: ${colorMap.greyDarkOne};
    color: ${colorMap.greyLightTwo};
    display: block;
    overflow: hidden;
    padding: ${({ narrow }) =>
        narrow ? `${size.small} ${size.medium}` : size.medium};
    text-overflow: ellipsis;
    white-space: nowrap;
    :focus,
    :hover {
        background-color: ${colorMap.greyDarkOne};
        color: ${colorMap.devWhite};
    }
`;

const Options = styled('ul')`
    border: ${BORDER_SIZE}px solid;
    border-image: ${gradientMap.violentMagentaOrange} 1;
    border-top: none;
    /* account for border above */
    left: -${BORDER_SIZE}px;
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
    border: ${BORDER_SIZE}px solid transparent;
    color: ${colorMap.devWhite};
    cursor: pointer;
    font-family: 'Fira Mono', monospace;
    position: relative;
    ${({ showOptions }) => showOptions && activeSelectStyles};
`;

const SelectedOption = styled('div')`
    align-items: center;
    background-color: ${colorMap.greyDarkTwo};
    color: ${colorMap.devWhite};
    display: flex;
    justify-content: space-between;
    padding: ${({ narrow }) =>
        narrow ? `${size.small} ${size.medium}` : size.medium};
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
    const selectOptions = typeof choices !== 'undefined' ? choices : children;
    /**
     * This useEffect should only be called once the component first renders with choices,
     * this should populate the select item with the default choice if there is one
     */
    useEffect(() => {
        if (selectOptions.length && value) {
            const choice = selectOptions.filter(choice => choice[0] === value);
            if (choice && choice.length) {
                setSelectValue(value);
                setSelectText(choice[0][1]);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectOptions]);
    const showOptionsOnEnter = useCallback(
        e => {
            const enterKey = 13;
            const escapeKey = 27;
            if (e.keyCode === enterKey) {
                selectOnClick();
            } else if (e.keyCode === escapeKey && showOptions) {
                // Hitting the escape key should only close the select
                selectOnClick();
            }
        },
        [selectOnClick, showOptions]
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

    const closeOptionsOnBlur = useCallback(
        e => {
            // Check the event to see if the next element would be a list element
            // otherwise, close the options
            const isTabbingThroughOptions =
                e.relatedTarget && e.relatedTarget.tagName === 'LI';
            if (!isTabbingThroughOptions) {
                setShowOptions(false);
            }
        },
        [setShowOptions]
    );
    return (
        <StyledCustomSelect
            aria-expanded={showOptions}
            onBlur={closeOptionsOnBlur}
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
                <ArrowheadIcon down={showOptions} />
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
