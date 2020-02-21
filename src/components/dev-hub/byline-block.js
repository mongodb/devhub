import React from 'react';
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

const BylineBlock = ({ author, authorImage }) => {
    return (
        <ByLine>
            <AuthorImage>
                <img src={authorImage} alt={author} />
            </AuthorImage>
            <AuthorText collapse>
                By <AuthorLink to="#">{author}</AuthorLink>
            </AuthorText>
        </ByLine>
    );
};

export default BylineBlock;
