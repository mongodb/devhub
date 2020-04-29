import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Code from '@leafygreen-ui/code';
import { colorMap, lineHeight, size } from './theme';
import CopyButton, { COPY_BUTTON_WIDTH } from './copy-button';

const LEAFY_CODEBLOCK_PADDING = 12;
const LEAFY_LINENUMBER_PADDING = 42;

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
    background-color: ${colorMap.greyDarkThree};
    border-radius: 0 ${size.small} ${size.small} 0;
    color: ${colorMap.greyLightTwo};
    left: calc(100% - ${COPY_BUTTON_WIDTH}px - ${size.tiny});
    position: absolute;
    top: ${size.tiny};
`;

const StyledCode = styled(Code)`
    border: 1px solid ${colorMap.greyDarkThree};
    border-radius: ${size.small};
    line-height: ${lineHeight.xsmall};
    padding-right: ${size.xlarge};
    padding-top: ${size.large};
    ${({ numdigits }) =>
        `padding-left: calc(${LEAFY_LINENUMBER_PADDING}px + ${
            numdigits * size.stripUnit(size.xsmall)
        }px)`};
    /* Line Numbers */
    > div {
        background-color: ${colorMap.greyDarkTwo};
        border-image: linear-gradient(
                0deg,
                ${colorMap.sherbet} 0%,
                ${colorMap.salmon} 49.99%,
                ${colorMap.magenta} 100%
            )
            1;
        border-width: 0 2px 0 0;
        border-right-style: solid;
        color: ${colorMap.greyLightTwo};
        left: 0;
        padding: ${LEAFY_CODEBLOCK_PADDING}px;
        padding-top: ${size.large};
        text-align: right;
    }
`;

const CodeBlock = ({ nodeData: { lang = null, value } }) => {
    // We wish to up padding based on the number of lines based on the size of the max number length
    const numLines = useMemo(() => value.split(/\r|\n/).length, [value]);
    const numDigits = useMemo(() => Math.floor(Math.log10(numLines) + 1), [
        numLines,
    ]);
    // Leafy expects 'csp' as 'cs'
    const language = lang === 'csp' ? 'cs' : lang || 'auto';
    return (
        <CodeContainer>
            <StyledCode
                copyable={false}
                language={language}
                numdigits={numDigits}
                showLineNumbers
                variant="dark"
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
