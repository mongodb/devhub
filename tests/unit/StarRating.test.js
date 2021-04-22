import React from 'react';
import { shallow } from 'enzyme';

import StarRating from '~components/dev-hub/star-rating';
import MockArticleRatingProvider from './mock/MockArticleRatingProvider';

const props = {
    clickHandlers: [jest.fn(), jest.fn(), jest.fn(), jest.fn(), jest.fn()],
};

describe('StarRating', () => {
    let shallowWrapper;

    beforeAll(() => {
        shallowWrapper = shallow(
            <MockArticleRatingProvider>
                <StarRating {...props} />
            </MockArticleRatingProvider>
        );
    });

    it('renders correctly', () => {
        expect(shallowWrapper).toMatchSnapshot();
    });

    it('calls all handlers', () => {
        const stars = shallowWrapper.find('StyledButton');
        stars.forEach((node, index) => {
            node.simulate('click');
            expect(props.clickHandlers[index]).toBeCalled();
        });
    });
});
