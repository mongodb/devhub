import React from 'react';
import { shallow } from 'enzyme';

import mockData from './data/VideoJumbotron.test.json';
import VideoJumbotron from '~components/dev-hub/video-jumbotron';

it('renders correctly', () => {
    const tree = shallow(<VideoJumbotron {...mockData} />);
    expect(tree).toMatchSnapshot();
});
