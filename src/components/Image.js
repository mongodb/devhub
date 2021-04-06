import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withPrefix } from 'gatsby';
import { css } from '@emotion/react';
import { getImageAlignmentStyle } from '../utils/get-image-alignment-style';
import { getNestedValue } from '../utils/get-nested-value';
import { size } from './dev-hub/theme';

const ArticleImageStyle = (captioned, customAlign, scale) => css`
    ${getImageAlignmentStyle(customAlign)}
    border-radius: ${size.small};
    margin-bottom: ${captioned ? size.small : size.articleContent};
    vertical-align: bottom; /* prevent the default image spacing below image */
    width: ${scale || null};
`;

export default class Image extends Component {
    constructor(props) {
        super(props);
        // Can't use this.isMounted: https://reactjs.org/blog/2015/12/16/ismounted-antipattern.html
        this._isMounted = false;
        this.state = {
            base64Uri: null,
        };
    }

    componentDidMount() {
        this._isMounted = true;

        // Get base64 image data
        if (process.env.PREVIEW_MODE === 'cli') {
            const { nodeData } = this.props;
            const checksum = getNestedValue(['options', 'checksum'], nodeData);

            // Get base64 data of image using checksum
            // eslint-disable-next-line import/no-unresolved
            import('previewSetup')
                .then(module => {
                    return module.getBase64Uri(checksum);
                })
                .then(base64Uri => {
                    // Only change the state if this is mounted. (Warning of memory leak otherwise)
                    if (this._isMounted) {
                        this.setState({ base64Uri });
                    }
                });
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    // Choose whether to use path to static asset file or base64 img data
    getImgData = (previewMode, imgSrc) => {
        // Use base64 data of image obtained from Stitch
        if (previewMode === 'cli') {
            const { base64Uri } = this.state;
            return base64Uri;
        }
        // Make sure file is a valid resource for vscode
        if (previewMode === 'vscode') {
            return `vscode-resource://${imgSrc}`;
        }
        return withPrefix(imgSrc);
    };

    render() {
        const { alt, className, captioned, nodeData = {}, src } = this.props;
        const imgSrc =
            src ||
            nodeData.url ||
            getNestedValue(['argument', 0, 'value'], nodeData);
        const altText =
            alt || getNestedValue(['options', 'alt'], nodeData) || imgSrc;
        const customAlign = getNestedValue(['options', 'align'], nodeData);
        const scale = getNestedValue(['options', 'scale'], nodeData);

        return (
            <img
                loading="lazy"
                src={this.getImgData(process.env.PREVIEW_MODE, imgSrc)}
                alt={altText}
                css={ArticleImageStyle(captioned, customAlign, scale)}
                onLoad={this.handleLoad}
                className={className}
            />
        );
    }
}

Image.propTypes = {
    className: PropTypes.string,
    handleImageLoaded: PropTypes.func,
    nodeData: PropTypes.shape({
        argument: PropTypes.arrayOf(
            PropTypes.shape({
                value: PropTypes.string.isRequired,
            })
        ),
        options: PropTypes.shape({
            align: PropTypes.string,
            alt: PropTypes.string,
            checksum: PropTypes.string,
            height: PropTypes.string,
            scale: PropTypes.string,
            width: PropTypes.string,
        }),
    }),
    src: PropTypes.string,
};

Image.defaultProps = {
    className: '',
    handleImageLoaded: () => {},
};
