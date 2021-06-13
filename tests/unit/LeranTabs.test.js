import React from 'react';
import { shallow } from 'enzyme';
import Tabs from '../../src/components/dev-hub/learn-tabs';
import { Tab } from '@leafygreen-ui/tabs';

describe('Learn Tabs Component', () => {
    const mockTabsList = ['TabOne', 'TabTwo', 'TabThree'];
    const mockActiveItem = jest.fn();
    const mockHandleClick = jest.fn();
    const props = {
        tabsList: mockTabsList,
        handleClick: mockHandleClick,
        activeItem: mockActiveItem,
    };
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Tabs {...props} />);
    });

    test('renders component', () => {
        expect(wrapper).not.toBe(null);
    });

    test('has child component styled tabs', () => {
        expect(wrapper.find('StyledTabs')).not.toBe(null);
    });

    test('styled tabs has selected tab of 0 th element ', () => {
        expect(wrapper.find('StyledTabs')).not.toBe(null);
    });

    test('number of Tabs equal the number of elements passed from the tab list', () => {
        expect(wrapper.find(Tab)).toHaveLength(3);
    });

    test('order of tabs match the tab list', () => {
        expect(wrapper.find(Tab).at(0).props().name).toEqual('TabOne');
        expect(wrapper.find(Tab).at(1).props().name).toEqual('TabTwo');
        expect(wrapper.find(Tab).at(2).props().name).toEqual('TabThree');
    });
});
