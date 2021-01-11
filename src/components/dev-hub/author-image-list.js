import React from 'react';
import styled from '@emotion/styled';
import { size } from './theme';
import AuthorImage from './author-image';

const AUTHOR_IMAGE_HEIGHT = 24;

const AuthorImageContainer = styled('div')`
    display: flex;
`;

const StyledAuthorImage = styled(AuthorImage)`
    margin-right: ${size.small};
    :not(:last-of-type) {
        margin-right: -${size.small};
    }
`;

const AuthorImageList = ({
    students,
    size = AUTHOR_IMAGE_HEIGHT,
    ...props
}) => (
    <AuthorImageContainer {...props}>
        {students.map(({ name, image_url }) => (
            <StyledAuthorImage
                gradientOffset={4}
                hideOnMobile={false}
                height={size}
                width={size}
                image={image_url}
                key={name}
            />
        ))}
    </AuthorImageContainer>
);

export default AuthorImageList;
