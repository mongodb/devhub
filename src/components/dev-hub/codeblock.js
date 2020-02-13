import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Code from '@leafygreen-ui/code';
import { colorMap, lineHeight, size } from './theme';

const LEAFY_CODEBLOCK_PADDING = 12;
const LEAFY_LINENUMBER_PADDING = 42;

const StyledCode = styled(Code)`
    border-radius: ${size.small};
    line-height: ${lineHeight.xsmall};
    ${({ numdigits }) =>
        `padding-left: calc(${LEAFY_LINENUMBER_PADDING}px + ${numdigits *
            size.stripUnit(size.xsmall)}px)`};
    /* Line Numbers */
    > div {
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
        border-radius: ${size.small} 0 0 ${size.small};
        border-right: 2px solid;
        left: 0;
        padding: ${LEAFY_CODEBLOCK_PADDING}px;
        text-align: right;
    }
`;

const CodeBlock = ({ nodeData: { lang = null, value }, ...props }) => {
    // We wish to up padding based on the number of lines based on the size of the max number length
    const numLines = useMemo(() => value.split(/\r|\n/).length, [value]);
    const numDigits = useMemo(() => Math.floor(Math.log10(numLines) + 1), [
        numLines,
    ]);
    return (
        <StyledCode
            language={lang ? lang : 'auto'}
            numdigits={numDigits}
            showLineNumbers
            variant="dark"
            {...props}
        >
            {value}
        </StyledCode>
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
