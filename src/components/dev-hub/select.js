import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import ArrowheadIcon from './icons/arrowhead-icon';
import { P } from './text';
import { fontSize, lineHeight, layer, size } from './theme';

const BORDER_SIZE = 2;
const OPTIONS_POSITION_OFFSET = 58;
const OPTIONS_POSITION_OFFSET_NARROW = 38;

const activeSelectStyles = theme => css`
    border: ${BORDER_SIZE}px solid;
    border-image: ${theme.gradientMap.violentMagentaOrange} 1;
    outline: none;
`;

const Option = styled('li')`
    background-color: ${({ theme }) => theme.colorMap.greyDarkOne};
    color: ${({ theme }) => theme.colorMap.greyLightTwo};
    display: block;
    font-size: ${fontSize.small};
    overflow: hidden;
    padding: ${`6px ${size.default}`};
    text-overflow: ellipsis;
    white-space: nowrap;
    :focus,
    :hover {
        background-color: ${({ theme }) => theme.colorMap.greyDarkOne};
        color: ${({ theme }) => theme.colorMap.devWhite};
    }
`;

const Options = styled('ul')`
    border: ${BORDER_SIZE}px solid;
    border-image: ${({ theme }) => theme.gradientMap.violentMagentaOrange} 1;
    border-width: 0 ${BORDER_SIZE}px ${BORDER_SIZE}px;
    /* account for border above */
    left: -${BORDER_SIZE}px;
    padding: 0;
    position: absolute;
    margin: 0;
    top: ${({ narrow }) =>
        narrow
            ? `${OPTIONS_POSITION_OFFSET_NARROW}px`
            : `${OPTIONS_POSITION_OFFSET}px`};
    width: calc(100% + ${2 * BORDER_SIZE}px);
    z-index: ${layer.middle};
`;

const StyledCustomSelect = styled('div')`
    background-color: ${({ theme }) => theme.colorMap.greyDarkTwo};
    /* Adding border without color to prevent jarring visual on expand */
    border: ${BORDER_SIZE}px solid transparent;
    color: ${({ theme }) => theme.colorMap.devWhite};
    cursor: ${({ enabled }) => (enabled ? 'pointer' : 'not-allowed')};
    font-family: 'Fira Mono', monospace;
    opacity: ${({ enabled }) => (enabled ? 1 : 0.3)};
    position: relative;
    ${({ showOptions, theme }) => showOptions && activeSelectStyles(theme)};
`;

const SelectedOption = styled('div')`
    align-items: center;
    background-color: ${({ theme }) => theme.colorMap.greyDarkTwo};
    color: ${({ theme }) => theme.colorMap.devWhite};
    display: flex;
    font-size: ${fontSize.small};
    line-height: ${lineHeight.small};
    justify-content: space-between;
    padding: ${({ narrow }) => (narrow ? `6px ${size.default}` : size.default)};
    position: relative;
`;
const FormSelect = ({
    children,
    name,
    choices = [],
    defaultText = '',
    enabled = true,
    errors = [],
    narrow = false,
    onChange = null,
    styleSelectedText = null,
    validationStatus = null,
    value = '',
    ...extraProps
}) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const [selectValue, setSelectValue] = useState(value);
    const [selectText, setSelectText] = useState(defaultText);
    const [showOptions, setShowOptions] = useState(false);
    const selectOnClick = useCallback(() => {
        if (enabled) setShowOptions(!showOptions);
    }, [enabled, showOptions]);
    const selectOptions = typeof choices !== 'undefined' ? choices : children;
    const updateSelectedText = useCallback(
        text => {
            const updatedText = styleSelectedText
                ? styleSelectedText(text)
                : text;
            setSelectText(updatedText);
        },
        [styleSelectedText]
    );
    // Styles for enabled were not properly being hydrated, so we assume false first and then re-render if true
    useEffect(() => {
        setIsEnabled(enabled);
    }, [enabled]);
    /**
     * This useEffect should only be called once the component first renders with choices,
     * this should populate the select item with the default choice if there is one
     */
    useEffect(() => {
        if (selectOptions.length && value) {
            const choice = selectOptions.filter(choice => choice[0] === value);
            if (choice && choice.length) {
                setSelectValue(value);
                updateSelectedText(choice[0][1]);
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
            updateSelectedText(text);
            if (onChange) {
                onChange(value, text);
            }
            setShowOptions(false);
        },
        [onChange, updateSelectedText]
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
            enabled={isEnabled}
            aria-label={name}
            onBlur={closeOptionsOnBlur}
            onClick={selectOnClick}
            onKeyDown={showOptionsOnEnter}
            role="listbox"
            showOptions={showOptions}
            tabIndex={isEnabled ? '0' : null}
        >
            <SelectedOption
                errors={errors}
                name={name}
                narrow={narrow}
                showOptions={showOptions}
                role="option"
                validationStatus={validationStatus}
                value={selectValue}
                {...extraProps}
            >
                <P collapse>{selectText}</P>
                <ArrowheadIcon down={!showOptions} />
            </SelectedOption>
            {showOptions && (
                <Options narrow={narrow}>
                    {selectOptions.map(([choiceValue, text]) => (
                        <Option
                            key={choiceValue}
                            narrow={narrow}
                            onClick={() => optionOnClick(choiceValue, text)}
                            onKeyDown={optionOnEnter(choiceValue, text)}
                            role="option"
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
