import React, { useCallback, useContext, useEffect, useState } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Tabs as LeafyTabs, Tab } from '@leafygreen-ui/tabs';
import ComponentFactory from '../ComponentFactory';
import Button from './button';
import { getNestedValue } from '../../utils/get-nested-value';
import { TabContext } from './tab-context';

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

const SLUG_TO_STRING = {
    shell: 'Mongo Shell',
    compass: 'Compass',
    python: 'Python',
    javasync: 'Java (Sync)',
    'java-sync': 'Java (Sync)',
    nodejs: 'Node.js',
    php: 'PHP',
    motor: 'Motor',
    'java-async': 'Java (Async)',
    c: 'C',
    cpp: 'C++11',
    csharp: 'C#',
    perl: 'Perl',
    ruby: 'Ruby',
    scala: 'Scala',
    go: 'Go',
    cloud: 'Cloud',
    local: 'Local',
    macos: 'macOS',
    linux: 'Linux',
    windows: 'Windows',
    debian: 'Debian',
    rhel: 'RHEL',
};

const hiddenTabStyling = css`
    & > div:first-child {
        display: none;
    }
`;

const StyledTabs = styled(LeafyTabs)`
    ${({ ishidden }) => ishidden && hiddenTabStyling};
    button[aria-selected='true'] {
        color: ${({ theme }) => theme.colorMap.darkGreen};
        :after {
            background-color: ${({ theme }) => theme.colorMap.darkGreen};
        }
    }
`;

const stringifyTab = tabName => SLUG_TO_STRING[tabName] || tabName;

const getTabId = node => getNestedValue(['options', 'tabid'], node);

// Name anonymous tabsets by alphabetizing their tabids and concatenating with a forward slash
const generateAnonymousTabsetName = tabIds => [...tabIds].sort().join('/');

const TabButton = ({ ...props }) => (
    <StyledTabButton renderAsButton {...props} />
);

const Tabs = ({ nodeData: { children, options = {} } }) => {
    console.log(children);
    const hidden = options.hidden;
    const { activeTabs, setActiveTab } = useContext(TabContext);
    const tabIds = children.map(child => getTabId(child));
    const tabsetName = options.tabset || generateAnonymousTabsetName(tabIds);
    const [activeTab, setActiveTabIndex] = useState(0);
    const previousTabsetChoice = activeTabs[tabsetName];
    const tabs = children;

    useEffect(() => {
        if (!previousTabsetChoice || !tabIds.includes(previousTabsetChoice)) {
            // Set first tab as active if no tab was previously selected
            setActiveTab({ tabset: tabsetName, value: getTabId(children[0]) });
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const index = tabIds.indexOf(activeTabs[tabsetName]);
        if (index !== -1) {
            setActiveTabIndex(index);
        }
    }, [activeTabs, tabIds, tabsetName]);

    const onClick = useCallback(
        index => {
            setActiveTab({
                tabset: tabsetName,
                value: getTabId(children[index]),
            });
        },
        [children, setActiveTab, tabsetName]
    );

    return (
        <>
            <StyledTabs
                as={TabButton}
                darkMode
                data-test="Tabs"
                ishidden={hidden}
                selected={activeTab}
                setSelected={onClick}
            >
                {tabs.map((tab, index) => {
                    const tabId = getNestedValue(['options', 'tabid'], tab);
                    const tabTitle =
                        getNestedValue(['argument', 0, 'value'], tab) ||
                        stringifyTab(tabId);

                    return (
                        <Tab
                            data-tabid={tabId}
                            role="tab"
                            key={index}
                            name={tabTitle}
                        >
                            <React.Fragment key={index}>
                                {tab.children.map((tabChild, tabChildIndex) => (
                                    <ComponentFactory
                                        nodeData={tabChild}
                                        key={tabChildIndex}
                                    />
                                ))}
                            </React.Fragment>
                        </Tab>
                    );
                })}
            </StyledTabs>
        </>
    );
};

export default Tabs;
