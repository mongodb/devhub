import React, { useCallback, useContext, useEffect, useState } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Tabs as LeafyTabs, Tab } from '@leafygreen-ui/tabs';
import Button from './button';

const TabButtonStyle = () => css`
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

const StyledTabButton = styled(Button)`
    ${TabButtonStyle}
`;

const TabsStyle = () => css`
    @media (min-width: 1048px) {
        button:first-child {
            margin-right: 73%;
        }
    }
    button[aria-selected='true'] {
        color: ${({ theme }) => theme.colorMap.darkGreen};
        :after {
            background-color: ${({ theme }) => theme.colorMap.darkGreen};
        }
    }
`;

const StyledTabs = styled(LeafyTabs)`
    ${TabsStyle}
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
        <>
            <StyledTabs
                as={TabButton}
                darkMode
                data-test="tabs"
                selected={activeTabIndex}
                setSelected={onClick}
            >
                {tabsList.map((tab, index) => {
                    const tabId = tab;
                    return (
                        <Tab
                            data-tabid={tabId}
                            role="tab"
                            key={index}
                            name={tabId}
                        />
                    );
                })}
            </StyledTabs>
        </>
    );
};

export default Tabs;
