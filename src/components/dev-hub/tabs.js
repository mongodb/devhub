import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ComponentFactory from '../ComponentFactory';
import { TabContext } from './tab-context';
import { getNestedValue } from '../../utils/get-nested-value';
import { Tabs as LeafyTabs, Tab } from '@leafygreen-ui/tabs';

export const SLUG_TO_STRING = {
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

const stringifyTab = tabName => {
    return SLUG_TO_STRING[tabName] || tabName;
};

const createFragment = (tab, index) => {
    return (
        <React.Fragment key={index}>
            {tab.children.map((tabChild, tabChildIndex) => (
                <ComponentFactory nodeData={tabChild} key={tabChildIndex} />
            ))}
        </React.Fragment>
    );
};

const Tabs = ({ nodeData }) => {
    const [activeTab, setActiveTab] = useState(0);

    const isHidden = nodeData.options && nodeData.options.hidden;
    const tabs = nodeData.children;

    return (
        <React.Fragment>
            {isHidden || (
                <LeafyTabs
                    selected={activeTab}
                    setSelected={setActiveTab}
                    darkMode
                >
                    {tabs.map((tab, index) => {
                        const tabId = getNestedValue(['options', 'tabid'], tab);
                        const tabTitle =
                            getNestedValue(['argument', 0, 'value'], tab) ||
                            stringifyTab(tabId);

                        // If there are no activeTabs, js would typically be disabled
                        const tabContent = createFragment(tab, index);

                        return (
                            <Tab
                                data-tabid={tabId}
                                role="tab"
                                key={index}
                                name={tabTitle}
                            >
                                {tabContent}
                            </Tab>
                        );
                    })}
                </LeafyTabs>
            )}
        </React.Fragment>
    );
};

export default Tabs;

Tabs.propTypes = {
    nodeData: PropTypes.shape({
        children: PropTypes.arrayOf(
            PropTypes.shape({
                argument: PropTypes.arrayOf(
                    PropTypes.shape({
                        value: PropTypes.string,
                    })
                ).isRequired,
                children: PropTypes.array,
                name: PropTypes.oneOf(['tab']),
                options: PropTypes.shape({
                    tabid: PropTypes.string.isRequired,
                }).isRequired,
            })
        ),
        options: PropTypes.shape({
            hidden: PropTypes.bool,
        }),
    }).isRequired,
};

Tabs.contextType = TabContext;
