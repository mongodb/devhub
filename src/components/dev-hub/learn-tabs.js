import React, { useCallback, useContext, useEffect, useState } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Tabs as LeafyTabs, Tab } from '@leafygreen-ui/tabs';
import Button from './button';
import { TabContext } from './tab-context';
import { screenSize } from './theme';

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
    @media ${screenSize.xlargeAndUp} {
        button:first-child {
            margin-right: 74%;
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

// Name anonymous tabsets by alphabetizing their tabids and concatenating with a forward slash
const generateAnonymousTabsetName = tabIds => [...tabIds].sort().join('/');

const TabButton = ({ ...props }) => (
    <StyledTabButton renderAsButton {...props} />
);

const Tabs = ({ tabsList, handleClick, activeItem }) => {
    const { activeTabs, setActiveTab } = useContext(TabContext);
    const tabsetName = generateAnonymousTabsetName(tabsList);
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    /*
    to set the value from tab context in nav bar
    */
    useEffect(() => {
        setActiveTab({
            tabset: tabsetName,
            value: activeItem,
        });
    }, [activeItem]);

    /*
    to set the active tab index if
    1. setActiveTab triggered from context changes in the nav bar
    2. setActiveTab triggered from using call back on click
    */
    useEffect(() => {
        const index = tabsList.indexOf(activeTabs[tabsetName]);
        if (index !== -1) {
            setActiveTabIndex(index);
        }
    }, [activeTabs, tabsList]);

    /*
    to set the active item upon user click on any leafy tabs
    */
    const onClick = useCallback(
        index => {
            const tabValue = tabsList[index];
            setActiveTab({
                tabset: tabsetName,
                value: tabValue,
            });
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
