import React from 'react';
import styled from '@emotion/styled';
import Link from './link';
import { P } from './text';
import { fontSize, screenSize, size } from './theme';
import { getAuthorPrefix } from '../../utils/get-author-prefix';
import { getTagPageUriComponent } from '../../utils/get-tag-page-uri-component';
import ProfileImage from './profile-image';

const AuthorImageContainer = styled('div')`
    display: flex;
`;

const AuthorLink = styled(Link)`
    font-size: ${fontSize.tiny};
    :visited {
        color: ${({ theme }) => theme.colorMap.greyLightThree};
    }
    @media ${screenSize.upToLarge} {
        font-size: ${fontSize.xsmall};
    }
`;

const AuthorText = styled(P)`
    display: inline-block;
    @media ${screenSize.upToLarge} {
        font-size: ${fontSize.xsmall};
    }
`;

const ByLine = styled('div')`
    align-items: center;
    color: ${({ theme }) => theme.colorMap.greyLightThree};
    display: flex;
    font-size: ${fontSize.tiny};
    @media ${screenSize.upToLarge} {
        font-size: ${fontSize.xsmall};
    }
`;

const StyledAuthorImage = styled(ProfileImage)`
    margin-right: ${size.small};
    :not(:last-of-type) {
        margin-right: -${size.small};
    }
`;

const AuthorImages = ({ authors }) => (
    <AuthorImageContainer>
        {authors.map(({ name, image, isInternalReference = false }) => (
            <StyledAuthorImage
                image={image}
                key={name}
                isInternalReference={isInternalReference}
            />
        ))}
    </AuthorImageContainer>
);

const AuthorNames = ({ authors }) => (
    <div>
        {authors.map(({ name }, index) => {
            const authorLink = `/author/${getTagPageUriComponent(name)}`;
            const prefix = getAuthorPrefix(index, authors.length);
            return (
                <AuthorText collapse key={name}>
                    {prefix}
                    <AuthorLink to={authorLink}>{name}</AuthorLink>
                </AuthorText>
            );
        })}
    </div>
);

const BylineBlock = ({ authors }) => {
    if (!authors) return null;
    // TODO: Remove below once the authors type change is in the parser
    const authorsArray = Array.isArray(authors) ? authors : [authors];
    return (
        <ByLine>
            <AuthorImages authors={authorsArray} />
            <AuthorNames authors={authorsArray} />
        </ByLine>
    );
};

export default BylineBlock;
