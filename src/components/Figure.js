import React from 'react';
import styled from '@emotion/styled';
import CaptionLegend from './CaptionLegend';
import Image from './Image';
import { getImageAlignmentStyle } from '../utils/get-image-alignment-style';
import { getNestedValue } from '../utils/get-nested-value';
import { size } from './dev-hub/theme';

const Figure = styled('figure')`
    margin: 0 0 ${size.articleContent};
    width: ${({ figWidth }) => figWidth};
    ${({ alignStyle }) => alignStyle};
`;

export default ({ nodeData, ...rest }) => {
    const customAlign = getNestedValue(['options', 'align'], nodeData);
    const alignStyle = getImageAlignmentStyle(customAlign);
    const figWidth =
        getNestedValue(['options', 'figwidth'], nodeData) || 'auto';
    return (
        <Figure alignStyle={alignStyle} figWidth={figWidth}>
            <Image nodeData={nodeData} captioned={!!nodeData.children.length} />
            <CaptionLegend {...rest} nodeData={nodeData} />
        </Figure>
    );
};
