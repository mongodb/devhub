import React from 'react';
import { shallow } from 'enzyme';

import mockData from './data/PodcastJumbotron.test.json';
import PodcastJumbotron from '~components/dev-hub/podcast-jumbotron';

it('renders correctly', () => {
    const tree = shallow(<PodcastJumbotron {...mockData} />);
    expect(tree).toMatchSnapshot();
});
