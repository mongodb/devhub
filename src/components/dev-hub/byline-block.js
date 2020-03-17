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

const AuthorImages = ({ authors }) => (
    <div>
        {authors.map(({ name, image }) => (
            <StyledAuthorImage image={image} key={name} />
        ))}
    </div>
);

const AuthorNames = ({ authors }) => (
    <div>
        {authors.map(({ name }) => {
            const authorLink = `/author/${getTagPageUriComponent(name)}`;
            return (
                <AuthorText collapse key={name}>
                    By <AuthorLink to={authorLink}>{name}</AuthorLink>
                </AuthorText>
            );
        })}
    </div>
);

const BylineBlock = ({ authors }) => {
    if (!authors || !authors.length) return null;
    return (
        <ByLine>
            <AuthorImages authors={authors} />
            <AuthorNames authors={authors} />
        </ByLine>
    );
};

export default BylineBlock;
