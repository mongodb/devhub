import React from 'react';
import styled from '@emotion/styled';
import Link from './link';
import { P } from './text';
import useMedia from '../../hooks/use-media';
import {
    colorMap,
    layer,
    gradientMap,
    screenSize,
    fontSize,
    size,
} from './theme';
import { createShadowElement } from './utils';

const AuthorImage = styled('div')`
    ${({ isMobile }) => isMobile && 'display: none;'}
    height: 50px;
    margin-right: ${size.medium};
    position: relative;
    z-index: ${layer.front};
    > img {
        border-radius: 50%;
        height: 50px;
    }
    &:before {
        ${createShadowElement(gradientMap.greenTealOffset, size.large, 0, -6)}
        height: 56px;
        width: 56px;
    }
`;

const AuthorLink = styled(Link)`
    :visited {
        color: ${colorMap.greyLightThree};
    }
    font-size: ${fontSize.tiny};
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
    color: ${colorMap.greyLightThree};
    display: flex;
    font-size: ${fontSize.tiny};
    @media ${screenSize.upToLarge} {
        font-size: ${fontSize.xsmall};
    }
`;

const BylineBlock = ({ author, authorImage }) => {
    const isMobile = useMedia(screenSize.upToLarge);
    return (
        <ByLine>
            <AuthorImage isMobile={isMobile}>
                <img src={authorImage} alt={author} />
            </AuthorImage>
            <AuthorText collapse>
                By <AuthorLink to="#">{author}</AuthorLink>
            </AuthorText>
        </ByLine>
    );
};

export default BylineBlock;
