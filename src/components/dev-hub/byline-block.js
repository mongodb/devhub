import React from 'react';
import styled from '@emotion/styled';
import Link from './link';
import { P } from './text';
import { colorMap, fontSize, screenSize, size } from './theme';
import { getTagPageUriComponent } from '../../utils/get-tag-page-uri-component';
import AuthorImage from './author-image';

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

const StyledAuthorImage = styled(AuthorImage)`
    margin-right: ${size.small};
`;

const BylineBlock = ({ authorImage, authorName = '' }) => {
    const authorLink = `/author/${getTagPageUriComponent(authorName)}`;
    return (
        <ByLine>
            <StyledAuthorImage image={authorImage} />
            <AuthorText collapse>
                By <AuthorLink to={authorLink}>{authorName}</AuthorLink>
            </AuthorText>
        </ByLine>
    );
};

export default BylineBlock;
