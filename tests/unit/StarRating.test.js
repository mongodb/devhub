import React from 'react';
import { shallow } from 'enzyme';

import StarRating from '~components/dev-hub/star-rating';

const props = {
    clickHandlers: [jest.fn()],
};

describe('StarRating', () => {
    let shallowWrapper;

    beforeAll(() => {
        shallowWrapper = shallow(<StarRating {...props} />);
    });

    it('renders correctly', () => {
        expect(shallowWrapper).toMatchSnapshot();
    });
});
