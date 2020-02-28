import React from 'react';
import { withPrefix } from 'gatsby';
import styled from '@emotion/styled';
import Link from './link';
import { P } from './text';
import {
    colorMap,
    layer,
    gradientMap,
    screenSize,
    fontSize,
    size,
} from './theme';
import { createShadowElement } from './utils';
import DEFAULT_AUTHOR_IMAGE from '../../images/2x/Default-Profile@2x.png';

const BYLINE_HEIGHT_OFFSET = 6;
const BYLINE_IMAGE_HEIGHT = 50;

const AuthorImage = styled('div')`
    @media ${screenSize.upToMedium} {
      display: none;
    }
    height: ${BYLINE_IMAGE_HEIGHT}px;
    margin-right: ${size.medium};
    position: relative;
    z-index: ${layer.front};
    > img {
        border-radius: 50%;
        height: ${BYLINE_IMAGE_HEIGHT}px;
    }
    &:before {
        ${createShadowElement(
            gradientMap.greenTealOffset,
            size.large,
            0,
            -BYLINE_HEIGHT_OFFSET
        )}
        height: ${BYLINE_IMAGE_HEIGHT + BYLINE_HEIGHT_OFFSET}px;
        width: ${BYLINE_IMAGE_HEIGHT + BYLINE_HEIGHT_OFFSET}px;
    }
`;

const AuthorLink = styled(Link)`
    font-size: ${fontSize.tiny};
    :visited {
        color: ${colorMap.greyLightThree};
    }
    @media ${screenSize.upToLarge} {
        font-size: ${fontSize.xsmall};
    }
`;

const AuthorText = styled(P)`
    @media ${screenSize.upToLarge} {
        font-size: ${fontSize.xsmall};
    }
`;

const ByLine = styled('div')`
    align-items: center;
    color: ${colorMap.greyLightThree};
    display: flex;
    font-size: ${fontSize.tiny};
    @media ${screenSize.upToLarge} {
        font-size: ${fontSize.xsmall};
    }
`;

const BylineBlock = ({
    authorName = '',
    authorImage = DEFAULT_AUTHOR_IMAGE,
}) => {
    const authorLink = `/author/${encodeURIComponent(
        authorName
            .toLowerCase()
            .split(' ')
            .join('-')
    )}`;
    return (
        <ByLine>
            <AuthorImage>
                <img src={withPrefix(authorImage)} alt={authorName} />
            </AuthorImage>
            <AuthorText collapse>
                By <AuthorLink to={authorLink}>{authorName}</AuthorLink>
            </AuthorText>
        </ByLine>
    );
};

export default BylineBlock;
