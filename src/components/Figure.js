import React from 'react';
import styled from '@emotion/styled';
import CaptionLegend from './CaptionLegend';
import Image from './Image';
import { getNestedValue } from '../utils/get-nested-value';
import { size } from './dev-hub/theme';

const Figure = styled('figure')`
    margin: 0 0 ${size.articleContent};
`;
export default ({ nodeData, ...rest }) => (
    <Figure
        className="figure"
        style={{
            width: getNestedValue(['options', 'figwidth'], nodeData) || 'auto',
        }}
    >
        <Image nodeData={nodeData} />
        <CaptionLegend {...rest} nodeData={nodeData} />
    </Figure>
);
