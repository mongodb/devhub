import React from 'react';
import { shallow } from 'enzyme';
import Tabs from '../../src/components/dev-hub/tabs';

// data for this component
import mockData from './data/Tabs.test.json';

it('renders correctly', () => {
    const tree = shallow(<Tabs nodeData={mockData} />);
    expect(tree).toMatchSnapshot();
});
