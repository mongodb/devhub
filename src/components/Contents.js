import React from 'react';
import PropTypes from 'prop-types';
import { getNestedValue } from '../utils/get-nested-value';
import { formatText } from '../utils/format-text';
import { findSectionHeadings } from '../utils/find-section-headings';
const CONTENT_LIST_ITEM_SHAPE = {
    children: PropTypes.arrayOf(PropTypes.object),
    id: PropTypes.string.isRequired,
    title: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const ContentsListItem = ({ id, listChildren, title }) => (
    <li>
        <a href={`#${id}`}>{formatText(title)}</a>
        {listChildren.length > 0 && <ContentsList listItems={listChildren} />}
    </li>
);

ContentsListItem.propTypes = {
    id: PropTypes.string.isRequired,
    listChildren: PropTypes.arrayOf(PropTypes.shape(CONTENT_LIST_ITEM_SHAPE))
        .isRequired,
    title: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const ContentsList = ({ className, listItems }) => {
    return (
        <ul className={className}>
            {listItems.map(({ children, id, title }, index) => (
                <ContentsListItem
                    key={index}
                    listChildren={children}
                    id={id}
                    title={title}
                />
            ))}
        </ul>
    );
};

ContentsList.propTypes = {
    className: PropTypes.string,
    listItems: PropTypes.arrayOf(PropTypes.shape(CONTENT_LIST_ITEM_SHAPE))
        .isRequired,
};

ContentsList.defaultProps = {
    className: '',
};

const Contents = ({ nodeData: { argument, options }, refDocMapping }) => {
    const maxDepth =
        typeof options.depth === 'undefined' ? Infinity : options.depth;

    const displayText = getNestedValue([0, 'value'], argument);
    const headingNodes = findSectionHeadings(
        getNestedValue(['ast', 'children'], refDocMapping),
        'type',
        'heading',
        maxDepth
    );
    return (
        <div
            className={[
                'contents',
                'topic',
                options.class,
                options.local ? 'local' : '',
            ].join(' ')}
            id="on-this-page"
        >
            <p className="topic-title first">{displayText}</p>
            <ContentsList className="simple" listItems={headingNodes} />
        </div>
    );
};

Contents.propTypes = {
    nodeData: PropTypes.shape({
        argument: PropTypes.arrayOf(PropTypes.object),
        options: PropTypes.shape({
            backlinks: PropTypes.oneOf(['none']),
            class: PropTypes.string,
            depth: PropTypes.number,
            local: PropTypes.bool,
        }),
    }).isRequired,
    refDocMapping: PropTypes.shape({
        ast: PropTypes.shape({
            children: PropTypes.arrayOf(PropTypes.object),
        }).isRequired,
    }).isRequired,
};

export default Contents;
