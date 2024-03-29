import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Code from '@leafygreen-ui/code';
import { determineCorrectLeafygreenLanguage } from '~utils/determine-correct-leafygreen-language';
import { lineHeight, size } from './theme';
import CopyButton, { COPY_BUTTON_WIDTH } from './copy-button';

const LEAFY_LINENUMBER_PADDING = size.stripUnit(size.mediumLarge);

const CodeContainer = styled('div')`
    display: inline-block;
    position: relative;
    margin-bottom: ${size.articleContent};
    width: 100%;
    /* The leafygreen Code component adds a wrapper div which can't be styled using emotion */
    > div:first-of-type {
        border: none;
        width: 100%;
    }
`;

const CopyContainer = styled('div')`
    background-color: ${({ theme }) => theme.colorMap.greyDarkThree};
    border-radius: 0 ${size.small} ${size.small} 0;
    color: ${({ theme }) => theme.colorMap.greyLightTwo};
    left: calc(100% - ${COPY_BUTTON_WIDTH}px - ${size.tiny});
    position: absolute;
    top: ${size.tiny};
    z-index: 1;
`;

const lineNumberWidth = numdigits =>
    LEAFY_LINENUMBER_PADDING + numdigits * size.stripUnit(size.xsmall);

const StyledCode = styled(Code)`
    border: 1px solid ${({ theme }) => theme.colorMap.greyDarkThree};
    border-radius: ${size.small};
    line-height: ${lineHeight.xsmall};
    padding-top: ${size.large};
    position: relative;
    z-index: 1;
    /* Line number text */
    td:first-of-type {
        color: ${({ theme }) => theme.colorMap.greyLightTwo};
        ${({ numdigits }) =>
            `width: ${
                lineNumberWidth(numdigits) + size.stripUnit(size.default)
            }px`}
    }
    table {
        table-layout: fixed;
        width: 100%;
    }
    /* Line number background */
    :before {
        background-color: ${({ theme }) => theme.colorMap.greyDarkTwo};
        border-image: linear-gradient(
                0deg,
                ${({ theme }) => theme.colorMap.sherbet} 0%,
                ${({ theme }) => theme.colorMap.salmon} 49.99%,
                ${({ theme }) => theme.colorMap.magenta} 100%
            )
            1;
        border-width: 0 2px 0 0;
        border-right-style: solid;
        bottom: 0;
        color: ${({ theme }) => theme.colorMap.greyLightTwo};
        content: '';
        left: 0;
        position: absolute;
        top: 0;
        ${({ numdigits }) => `width: ${lineNumberWidth(numdigits)}px`};
        z-index: -1;
    }
`;

const CodeBlock = ({
    nodeData: { emphasize_lines: emphasizeLines, lang = null, value },
}) => {
    // We wish to up padding based on the number of lines based on the size of the max number length
    const numLines = useMemo(() => value.split(/\r|\n/).length, [value]);
    const numDigits = useMemo(
        () => Math.floor(Math.log10(numLines) + 1),
        [numLines]
    );
    const language = determineCorrectLeafygreenLanguage(lang);
    return (
        <CodeContainer>
            <StyledCode
                copyable={false}
                darkMode={true}
                highlightLines={emphasizeLines}
                language={language}
                numdigits={numDigits}
                showLineNumbers
            >
                {value}
            </StyledCode>
            <CopyContainer>
                <CopyButton copyContent={value} />
            </CopyContainer>
        </CodeContainer>
    );
};

CodeBlock.propTypes = {
    nodeData: PropTypes.shape({
        lang: PropTypes.string,
        value: PropTypes.string.isRequired,
    }),
};

CodeBlock.displayName = 'CodeBlock';

export default CodeBlock;
