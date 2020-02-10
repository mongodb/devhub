import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { Pre } from './text';
import { size, colorMap } from './theme';

const wrapSingle = css`
    overflow-x: scroll;
    white-space: pre;
    word-break: keep-all;
    word-wrap: normal;
`;

const CodeBlockContainer = styled('div')`
    display: flex;
    width: 100%;
`;

const CodeBlockContent = styled(Pre)`
    border: none;
    border-radius: ${({ singleLine }) =>
        singleLine ? `${size.small};` : `0 ${size.small} ${size.small} 0;`};
    flex: 1;
    width: calc(100% - ${size.default} - ${size.default});
`;

const CodeBlockLine = styled(Pre)`
    background-color: ${colorMap.greyDarkTwo};
    border: none;
    border-radius: ${size.small} 0 0 ${size.small};
    border-image: linear-gradient(
            270deg,
            ${colorMap.orange} 0%,
            ${colorMap.violet} 100%,
            ${colorMap.magenta} 49.99%
        )
        1;
    border-right: 1px solid;
`;

const CodeContainer = styled('div')`
    ${({ singleLine }) => singleLine && wrapSingle};
`;

const countLineBreaks = children => {
    let lineCount = 0;
    for (let i = 0; i < children.length; i++) {
        if (lineCount > 1) return lineCount;
        if (typeof children[i] === 'string') {
            const newLineMatch = children[i].match(/\r?\n|\r/g);
            if (newLineMatch && newLineMatch.length > 0) {
                lineCount += newLineMatch.length;
            }
        } else {
            lineCount += countLineBreaks(children[i]);
        }
    }
    return lineCount;
};

const isSingleLine = children => {
    return countLineBreaks(children) <= 1;
};

const CodeBlockLines = ({ content }) => {
    const numberOfLines = countLineBreaks(content);
    const lines = useMemo(() => {
        const result = [];
        for (let lineNumber = 1; lineNumber < numberOfLines + 1; lineNumber++) {
            result.push(
                <span key={lineNumber}>
                    {lineNumber !== 1 ? <br /> : null}
                    {lineNumber}
                </span>
            );
        }
        return result;
    }, [numberOfLines]);
    return <CodeBlockLine>{lines}</CodeBlockLine>;
};

const CodeBlock = ({ children }) => {
    const singleLine = isSingleLine(children);

    return (
        <CodeBlockContainer>
            {!singleLine && <CodeBlockLines content={children} />}
            <CodeBlockContent singleLine={singleLine}>
                <CodeContainer singleLine={singleLine}>
                    {children}
                </CodeContainer>
                {/* TODO add copy functionality */}
                {/* <div css={!singleLine && multiLineButton}>
                        <CopyButton single={singleLine} copyContent={children} />
                    </div> */}
            </CodeBlockContent>
        </CodeBlockContainer>
    );
};

CodeBlock.propTypes = {
    children: PropTypes.node.isRequired,
};

CodeBlockContainer.displayName = 'CodeBlock';

export default CodeBlock;
