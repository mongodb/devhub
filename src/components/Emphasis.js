import React from 'react';
import { getNestedValue } from '../utils/get-nested-value';

const Emphasis = ({ nodeData }) => (
    <em>{getNestedValue(['children', 0, 'value'], nodeData)}</em>
);

export default Emphasis;
