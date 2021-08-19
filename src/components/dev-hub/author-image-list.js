import React from 'react';
import styled from '@emotion/styled';
import { size } from './theme';
import ProfileImage from './profile-image';

const AUTHOR_IMAGE_HEIGHT = 24;

const AuthorImageContainer = styled('div')`
    display: flex;
`;

const StyledAuthorImage = styled(ProfileImage)`
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
        {students.map(({ image_url }) => (
            <StyledAuthorImage
                gradientOffset={4}
                hideOnMobile={false}
                height={size}
                width={size}
                image={image_url}
                key={image_url}
            />
        ))}
    </AuthorImageContainer>
);

export default AuthorImageList;
