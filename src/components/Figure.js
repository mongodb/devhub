import React from 'react';
import CaptionLegend from './CaptionLegend';
import Image from './Image';
import { getNestedValue } from '../utils/get-nested-value';

export default ({ nodeData, ...rest }) => (
    <div
        className="figure"
        style={{
            width: getNestedValue(['options', 'figwidth'], nodeData) || 'auto',
        }}
    >
        <Image nodeData={nodeData} />
        <CaptionLegend {...rest} nodeData={nodeData} />
    </div>
);
