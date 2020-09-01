import copy from 'copy-to-clipboard';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import CopyIcon from './icons/copy-icon';
import { fontSize, screenSize, size } from './theme';
import Button from './button';

export const COPY_BUTTON_WIDTH = 120;

const StyledCopyButton = styled(Button)`
    border: none;
    border-radius: ${size.small};
    background-color: transparent;
    color: ${({ theme }) => theme.colorMap.black};
    height: ${size.large};
    left: 0;
    padding: 0 ${size.default};
    position: absolute;
    top: 0;
    width: ${COPY_BUTTON_WIDTH}px;
    @media ${screenSize.upToMedium} {
        padding: 0 ${size.default};
    }
    /* Remove pseudoelements since no visible animation is occurring */
    &:active,
    &:hover,
    &:focus {
        &:before {
            content: none;
        }
        &:after {
            content: none;
        }
    }
`;

const CopyText = styled('div')`
    align-items: center;
    display: flex;
    font-family: 'Fira Mono', monospace;
    font-size: ${fontSize.micro};
    justify-content: center;
    @media ${screenSize.upToMedium} {
        font-family: 'Fira Mono', monospace;
        font-size: ${fontSize.micro};
    }
`;

const DefaultCopyString = () => (
    <CopyText>
        <CopyIcon />
        copy code
    </CopyText>
);

const CopyButton = ({
    copyContent,
    copyString = <DefaultCopyString />,
    feedbackString = <CopyText>copied!</CopyText>,
    feedbackTimeout = 2000,
}) => {
    const [feedbackMessage, setFeedbackMessage] = useState(copyString);
    const [timeoutId, setTimeoutId] = useState(null);

    useEffect(() => () => {
        if (timeoutId !== null) {
            clearTimeout(timeoutId);
            setTimeoutId(null);
        }
    });

    /**
     *  Builds a string of the text present in the dom nodes in some cases if
     *  a node has no children return an empty string otherwise navigate through
     *  the tree and find all the strings
     * @param {Array<String|HTMLElement>} copyContent
     * @returns {String}
     */
    const nodesToString = useMemo(() => {
        let string = '';
        for (let i = 0; i < copyContent.length; i++) {
            string += !!copyContent[i].props
                ? copyContent[i].props.children
                    ? nodesToString(copyContent[i].props.children)
                    : ''
                : copyContent[i];
        }
        return string;
    }, [copyContent]);

    const onClick = useCallback(() => {
        // Only run once in the case of multiple clicks
        const wasCopied = copy(nodesToString);
        if (!timeoutId) {
            if (!wasCopied) {
                setFeedbackMessage(<CopyText>Error</CopyText>);
            } else {
                setFeedbackMessage(<CopyText>{feedbackString}</CopyText>);
            }
            const newTimeoutId = setTimeout(() => {
                setFeedbackMessage(copyString);
                setTimeoutId(null);
            }, feedbackTimeout);
            setTimeoutId(newTimeoutId);
        }
    }, [copyString, feedbackString, feedbackTimeout, nodesToString, timeoutId]);

    return (
        <StyledCopyButton
            secondary
            hasArrow={false}
            type="button"
            onClick={onClick}
        >
            {feedbackMessage}
        </StyledCopyButton>
    );
};

CopyButton.propTypes = {
    copyContent: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
        .isRequired,
    copyString: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    feedbackString: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    feedbackTimeout: PropTypes.number,
};

export default CopyButton;
