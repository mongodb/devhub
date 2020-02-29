import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import ComponentFactory from './ComponentFactory';
import { colorMap, size } from './dev-hub/theme';

const UnorderedList = styled('ul')`
    list-style: none;
    margin-bottom: ${size.articleContent};
    margin-top: -${size.xsmall};
    padding-left: ${size.medium};
    li:before {
        content: '○';
        color: ${colorMap.darkGreen};
        margin-right: ${size.medium};
        font-size: 8px;
        position: relative;
        top: -3px;
    }
`;

const List = props => {
    const { nodeData } = props;
    const ListTag = nodeData.ordered ? 'ol' : UnorderedList;
    return (
        <ListTag>
            {nodeData.children.map((listChild, index) => (
                <ComponentFactory {...props} nodeData={listChild} key={index} />
            ))}
        </ListTag>
    );
};

List.propTypes = {
    nodeData: PropTypes.shape({
        children: PropTypes.array.isRequired,
        ordered: PropTypes.bool,
    }).isRequired,
};

export default List;
