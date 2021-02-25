import React from 'react';
import { shallow } from 'enzyme';
import HoverCard from '../../src/components/dev-hub/hover-card';

const getHoverCard = to =>
    shallow(
        <HoverCard
            alt="Image with first cluster"
            image="/images/firstcluster.png"
            to={to}
        >
            <p>Here is some content</p>
        </HoverCard>
    );

it('hover cards without a link render correctly', () => {
    const tree = getHoverCard();
    expect(tree).toMatchSnapshot();
});

it('hover cards with a link render correctly', () => {
    const tree = getHoverCard('/');
    expect(tree).toMatchSnapshot();
});
