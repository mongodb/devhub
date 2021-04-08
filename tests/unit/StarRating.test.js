import React from 'react';
import { shallow } from 'enzyme';

import StarRating from '~components/dev-hub/star-rating';

const props = {
    clickHandlers: [jest.fn(), jest.fn(), jest.fn(), jest.fn(), jest.fn()],
};

describe('StarRating', () => {
    let shallowWrapper;

    beforeAll(() => {
        shallowWrapper = shallow(<StarRating {...props} />);
    });

    it('renders correctly', () => {
        expect(shallowWrapper).toMatchSnapshot();
    });

    it('renders 5 starts', () => {
        expect(shallowWrapper.find('StyledButton')).toHaveLength(5);
    });

    it('calls all handlers', () => {
        const stars = shallowWrapper.find('StyledButton');
        stars.forEach((node, index) => {
            node.simulate('click');
            expect(props.clickHandlers[index]).toBeCalled();
        });
    });
});
