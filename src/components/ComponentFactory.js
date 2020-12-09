import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ADMONITIONS } from '../constants';
import Admonition from './Admonition';
import BlockQuote from './dev-hub/blockquote';
import CardGroup from './CardGroup';
import CodeBlock from './dev-hub/codeblock';
import Chart from './dev-hub/chart';
import Cond from './Cond';
import Contents from './Contents';
import Container from './Container';
import CSSClass from './CSSClass';
import DefinitionList from './DefinitionList';
import DefinitionListItem from './DefinitionListItem';
import Deprecated from './Deprecated';
import Emphasis from './Emphasis';
import Extract from './Extract';
import Figure from './Figure';
import Footnote from './Footnote';
import FootnoteReference from './FootnoteReference';
import Heading from './Heading';
import HorizontalList from './HorizontalList';
import Image from './Image';
import Include from './Include';
import Line from './Line';
import LineBlock from './LineBlock';
import List from './List';
import ListItem from './ListItem';
import ListTable from './ListTable';
import Literal from './Literal';
import LiteralBlock from './LiteralBlock';
import LiteralInclude from './LiteralInclude';
import Meta from './Meta';
import MetaDescription from './meta-description';
import Paragraph from './Paragraph';
import Reference from './Reference';
import RefRole from './RefRole';
import Root from './Root';
import Section from './Section';
import Step from './Step';
import Steps from './Steps';
import Strong from './Strong';
import Subscript from './Subscript';
import Superscript from './Superscript';
import SubstitutionReference from './SubstitutionReference';
import Tabs from './dev-hub/tabs';
import Target from './Target';
import Text from './Text';
import TitleReference from './TitleReference';
import Topic from './Topic';
import Transition from './Transition';
import VersionAdded from './VersionAdded';
import VersionChanged from './VersionChanged';
import VideoEmbed from './dev-hub/video-embed';

import RoleAbbr from './Roles/Abbr';
import RoleClass from './Roles/Class';
import RoleFile from './Roles/File';
import RoleGUILabel from './Roles/GUILabel';

const IGNORED_NAMES = ['default-domain', 'toctree'];
const IGNORED_TYPES = ['comment', 'substitution_definition'];

export default class ComponentFactory extends Component {
    constructor() {
        super();
        this.roles = {
            abbr: RoleAbbr,
            class: RoleClass,
            file: RoleFile,
            guilabel: RoleGUILabel,
        };
        this.componentMap = {
            admonition: Admonition,
            blockquote: BlockQuote,
            'card-group': CardGroup,
            chart: Chart,
            charts: Chart,
            class: CSSClass,
            code: CodeBlock,
            cond: Cond,
            container: Container,
            contents: Contents,
            cssclass: CSSClass,
            definitionList: DefinitionList,
            definitionListItem: DefinitionListItem,
            deprecated: Deprecated,
            emphasis: Emphasis,
            extract: Extract,
            figure: Figure,
            footnote: Footnote,
            footnote_reference: FootnoteReference,
            heading: Heading,
            hlist: HorizontalList,
            image: Image,
            include: Include,
            line: Line,
            line_block: LineBlock,
            link: Reference,
            list: List,
            listItem: ListItem,
            'list-table': ListTable,
            literal: Literal,
            literal_block: LiteralBlock,
            literalinclude: LiteralInclude,
            meta: Meta,
            'meta-description': MetaDescription,
            only: Cond,
            paragraph: Paragraph,
            ref_role: RefRole,
            reference: Reference,
            root: Root,
            section: Section,
            step: Step,
            steps: Steps,
            strong: Strong,
            subscript: Subscript,
            substitution_reference: SubstitutionReference,
            superscript: Superscript,
            tabs: Tabs,
            target: Target,
            text: Text,
            title_reference: TitleReference,
            topic: Topic,
            transition: Transition,
            versionadded: VersionAdded,
            versionchanged: VersionChanged,
            youtube: VideoEmbed,
            twitch: VideoEmbed,
            // devhub main content
            introduction: Container,
            prerequisites: Container,
            content: Container,
            summary: Container,
        };
    }

    selectComponent() {
        const {
            nodeData: { children, name, type },
            ...rest
        } = this.props;

        // do nothing with these nodes for now (cc. Andrew)
        if (IGNORED_TYPES.includes(type) || IGNORED_NAMES.includes(name)) {
            return null;
        }

        if (type === 'problematic') {
            return <ComponentFactory nodeData={children[0]} {...rest} />;
        }

        const lookup = type === 'directive' ? name : type;
        let ComponentType = this.componentMap[lookup];
        // roles are each in separate file
        if (type === 'role') {
            // remove namespace
            const roleName = name.includes(':') ? name.split(':')[1] : name;
            ComponentType = this.roles[roleName];
        }
        // the different admonition types are all under the Admonition component
        // see 'this.admonitions' in 'guide.js' for the list
        if (!ComponentType && ADMONITIONS.includes(name)) {
            ComponentType = this.componentMap.admonition;
        }
        if (!ComponentType) {
            console.warn(`${name} (${type}) not yet implemented)`);
            return null;
        }

        return <ComponentType {...this.props} />;
    }

    render() {
        const { nodeData } = this.props;
        if (!nodeData) return null;
        return this.selectComponent();
    }
}

ComponentFactory.propTypes = {
    nodeData: PropTypes.shape({
        children: PropTypes.arrayOf(PropTypes.object),
        name: PropTypes.string,
        type: PropTypes.string.isRequired,
    }).isRequired,
};
