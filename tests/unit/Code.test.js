import React from 'react';
import { mount } from 'enzyme';
import Code from '../../src/components/Code';

// data for this component
import mockData from './data/Code.test.json';

const mountCode = ({ data }) => {
    return mount(<Code nodeData={data} />);
};

it('renders correctly', () => {
    const tree = mountCode({ data: mockData });
    expect(tree).toMatchSnapshot();
});

it('renders with javascript disabled correctly', () => {
    const tree = mountCode({ data: mockData });
    expect(tree).toMatchSnapshot();
});
