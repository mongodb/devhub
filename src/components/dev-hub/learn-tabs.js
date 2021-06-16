import React, { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Tabs as LeafyTabs, Tab } from '@leafygreen-ui/tabs';
import Button from './button';

const StyledTabButton = styled(Button)`
    border-radius: 0;
    :active,
    :hover,
    :focus {
        color: ${({ theme }) => theme.colorMap.darkGreen};
        :after {
            background-color: ${({ theme }) => theme.colorMap.darkGreen};
        }
    }
`;

const StyledTabs = styled(LeafyTabs)`
    margin: 0 32px;
    justify-items: flex-end;
    button {
        :first-of-type {
            margin-right: auto;
        }
    }

    button[aria-selected='true'] {
        color: ${({ theme }) => theme.colorMap.darkGreen};
        :after {
            background-color: ${({ theme }) => theme.colorMap.darkGreen};
        }
    }
`;

const TabButton = ({ ...props }) => (
    <StyledTabButton renderAsButton {...props} />
);

const Tabs = ({ tabsList, handleClick, activeItem }) => {
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const adjustTabIndex = activeTab => {
        const index = tabsList.indexOf(activeTab);
        if (index !== -1) {
            setActiveTabIndex(index);
        }
    };

    /*
    to set the value from tab context in nav bar
    */
    useEffect(() => {
        adjustTabIndex(activeItem);
    }, [activeItem]);

    /*
    to set the active item upon user click on any leafy tabs
    */
    const onClick = useCallback(
        index => {
            const tabValue = tabsList[index];
            adjustTabIndex(tabValue);
            handleClick(tabValue);
        },
        [tabsList]
    );

    return (
        <StyledTabs
            as={TabButton}
            darkMode
            data-test="tabs"
            selected={activeTabIndex}
            setSelected={onClick}
        >
            {tabsList.map(tab => {
                return <Tab data-tabid={tab} role="tab" key={tab} name={tab} />;
            })}
        </StyledTabs>
    );
};

export default Tabs;
