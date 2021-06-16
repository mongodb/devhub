import React from 'react';
import { mount, shallow, act } from 'enzyme';
import Tabs from '../../src/components/dev-hub/learn-tabs';
import { Tab } from '@leafygreen-ui/tabs';
import { ThemeProvider } from '@emotion/react';
import { darkTheme } from '../../src/components/dev-hub/theme';

describe('Learn Tabs Component', () => {
    const mockTabsList = ['TabOne', 'TabTwo', 'TabThree'];
    const mockActiveItem = 'TabOne';
    const mockHandleClick = jest.fn();
    const props = {
        tabsList: mockTabsList,
        handleClick: mockHandleClick,
        activeItem: mockActiveItem,
    };
    let shallowWrapper;
    let wrapper;

    beforeAll(() => {
        shallowWrapper = shallow(<Tabs {...props} />);
        wrapper = mount(
            <ThemeProvider theme={darkTheme}>
                <Tabs {...props} />
            </ThemeProvider>
        );
    });

    test('renders correctly', () => {
        expect(shallowWrapper).toMatchSnapshot();
    });

    test('has child component styled tabs', () => {
        expect(wrapper.find('StyledTabs')).not.toBe(null);
    });

    test('styled tabs has selected tab of 0 th element ', () => {
        expect(wrapper.find('StyledTabs').props().selected).toEqual(0);
    });

    test('number of Tabs equal the number of elements passed from the tab list', () => {
        expect(wrapper.find(Tab)).toHaveLength(3);
    });

    test('order of tabs match the tab list', () => {
        expect(wrapper.find(Tab).at(0).props().name).toEqual('TabOne');
        expect(wrapper.find(Tab).at(1).props().name).toEqual('TabTwo');
        expect(wrapper.find(Tab).at(2).props().name).toEqual('TabThree');
    });

    test('triggers handleClick with accurate tab value', () => {
        const tabTwo = wrapper.find('button').at(1);
        tabTwo.simulate('click');
        expect(props.handleClick).toHaveBeenCalled();
        expect(props.handleClick).toHaveBeenCalledWith('TabTwo');
    });
});
