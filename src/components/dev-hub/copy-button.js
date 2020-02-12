import copy from 'copy-to-clipboard';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from '@emotion/styled';
import CopyIcon from './icons/copy-icon';
import { colorMap, screenSize, size } from './theme';
import Button from './button';

const StyledCopyButton = styled(Button)`
    border-radius: ${size.small};
    background-color: transparent;
    color: ${colorMap.black};
    padding: 0 ${size.default};
    width: 120px;
    height: ${size.large};
    &:active,
    &:hover,
    &:focus {
        &:before {
            background: none;
            content: none;
        }
    }
`;

const CopyText = styled('span')`
    font-family: 'Fira Mono', monospace;
    font-size: 10px;
    @media ${screenSize.upToMedium} {
        font-family: 'Fira Mono', monospace;
        font-size: 10px;
    }
`;

class CopyButton extends Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);

        this.state = {
            feedbackMessage: this.props.copyString,
        };
    }

    componentWillUnmount() {
        if (typeof this.timeoutId !== 'undefined') {
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
        }
    }

    /**
     *  Builds a string of the text present in the dom nodes in some cases if
     *  a node has no children return an empty string otherwise navigate through
     *  the tree and find all the strings
     * @param {Array<String|HTMLElement>} copyContent
     * @returns {String}
     */
    nodesToString(copyContent) {
        let string = '';
        for (let i = 0; i < copyContent.length; i++) {
            string += !!copyContent[i].props
                ? copyContent[i].props.children
                    ? this.nodesToString(copyContent[i].props.children)
                    : ''
                : copyContent[i];
        }
        return string;
    }

    onClick() {
        const { copyContent, copyString } = this.props;
        const wasCopied = this.copyTheThing(this.nodesToString(copyContent));
        let { feedbackString, feedbackTimeout } = this.props;
        if (!wasCopied) {
            feedbackString = <CopyText>Error</CopyText>;
            feedbackTimeout = 5000;
        }
        this.setState({
            feedbackMessage: feedbackString,
        });

        this.timeoutId = setTimeout(() => {
            this.setState({
                feedbackMessage: copyString,
            });
        }, feedbackTimeout);
    }
    copyTheThing(content = '') {
        return copy(content);
    }
    render() {
        return (
            <StyledCopyButton secondary type="button" onClick={this.onClick}>
                {this.state.feedbackMessage}
            </StyledCopyButton>
        );
    }
}

CopyButton.propTypes = {
    copyContent: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
        .isRequired,
    copyString: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    feedbackString: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    feedbackTimeout: PropTypes.number,
    single: PropTypes.bool,
};

CopyButton.defaultProps = {
    copyString: (
        <CopyText>
            <CopyIcon />
            copy code
        </CopyText>
    ),
    feedbackString: <CopyText>copied!</CopyText>,
    feedbackTimeout: 2000,
    single: false,
};

export default CopyButton;
