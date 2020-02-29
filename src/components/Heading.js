import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import PropTypes from 'prop-types';
import ComponentFactory from './ComponentFactory';
import { H1, ArticleH2, ArticleH3, ArticleH4, ArticleH5 } from './dev-hub/text';
import Link from './dev-hub/link';

const PermaLink = styled(Link)`
    float: left;
    font-weight: normal;
    margin-left: -20px;
    padding-right: 5px;
    text-decoration: none;
    visibility: hidden;
`;

const showLinkOnHover = css`
    &:hover {
        ${PermaLink} {
            visibility: visible;
        }
    }
`;

const HeadingMap = {
    1: H1,
    2: ArticleH2,
    3: ArticleH3,
    4: ArticleH4,
    5: ArticleH5,
};

const Heading = ({ sectionDepth, nodeData, ...rest }) => {
    const id = nodeData.id || '';
    const HeadingTag =
        sectionDepth >= 1 && sectionDepth <= 5
            ? HeadingMap[sectionDepth]
            : HeadingMap[5];
    return (
        <HeadingTag id={id} css={showLinkOnHover}>
            <PermaLink href={`#${id}`} title="Permalink to this headline">
                #
            </PermaLink>
            {nodeData.children.map((element, index) => {
                return (
                    <ComponentFactory
                        {...rest}
                        nodeData={element}
                        key={index}
                    />
                );
            })}
        </HeadingTag>
    );
};

Heading.propTypes = {
    sectionDepth: PropTypes.number.isRequired,
    nodeData: PropTypes.shape({
        children: PropTypes.arrayOf(
            PropTypes.shape({
                value: PropTypes.string,
            })
        ).isRequired,
    }).isRequired,
};

export default Heading;
