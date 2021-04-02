import React from 'react';
import { shallow } from 'enzyme';
import Literal from '../../src/components/Literal';
import { darkTheme } from '../../src/components/dev-hub/theme';

// data for this component
import mockData from './data/Literal.test.json';

it('renders correctly', () => {
    const tree = shallow(<Literal nodeData={mockData} />);
    expect(tree).toMatchSnapshot();
});
