import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Code from '@leafygreen-ui/code';
import { colorMap, lineHeight, size } from './theme';
import CopyButton from './copy-button';

const LEAFY_CODEBLOCK_PADDING = 12;
const LEAFY_LINENUMBER_PADDING = 42;

const StyledCode = styled(Code)`
    border-radius: ${size.small} 0 0 ${size.small};
    line-height: ${lineHeight.xsmall};
    padding-top: 32px;
    padding-right: 64px;
    ${({ numdigits }) =>
        `padding-left: calc(${LEAFY_LINENUMBER_PADDING}px + ${numdigits *
            size.stripUnit(size.xsmall)}px)`};
    /* Line Numbers */
    > div {
        padding-top: 32px;
        color: ${colorMap.greyLightTwo};
        background-color: ${colorMap.greyDarkTwo};
        border: none;
        border-image: linear-gradient(
                0deg,
                ${colorMap.sherbet} 0%,
                ${colorMap.salmon} 49.99%,
                ${colorMap.magenta} 100%
            )
            1;
        border-right: 2px solid;
        left: 0;
        padding: ${LEAFY_CODEBLOCK_PADDING}px;
        padding-top: 32px;
        text-align: right;
    }
`;

const CodeContainer = styled('div')`
    display: inline-block;
    position: relative;
    > div:first-of-type {
        border: none;
        border-radius: 0 ${size.small} ${size.small} 0;
    }
`;

const CopyContainer = styled('div')`
    color: ${colorMap.greyLightTwo};
    background-color: ${colorMap.greyDarkThree};
    border-radius: 0 ${size.small} ${size.small} 0;
    position: absolute;
    left: calc(100% - 124px);
    top: 4px;
`;

const CodeBlock = ({ nodeData: { lang = null, value }, ...props }) => {
    // We wish to up padding based on the number of lines based on the size of the max number length
    const numLines = useMemo(() => value.split(/\r|\n/).length, [value]);
    const numDigits = useMemo(() => Math.floor(Math.log10(numLines) + 1), [
        numLines,
    ]);
    return (
        <CodeContainer>
            <StyledCode
                language={lang ? lang : 'auto'}
                numdigits={numDigits}
                showLineNumbers
                variant="dark"
                {...props}
            >
                {value}
            </StyledCode>
            <CopyContainer>
                <CopyButton single={false} copyContent={value} />
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
