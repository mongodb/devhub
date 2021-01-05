import React from 'react';
import styled from '@emotion/styled';
import HoverCard from './hover-card';
import { H5, P3 } from './text';
import { size } from './theme';
import AuthorImage from './author-image';

const AUTHOR_IMAGE_HEIGHT = 24;

const AuthorImageContainer = styled('div')`
    display: flex;
    justify-content: center;
`;

const StyledAuthorImage = styled(AuthorImage)`
    margin-right: ${size.small};
    :not(:last-of-type) {
        margin-right: -${size.small};
    }
`;

const AuthorImages = ({ students }) => (
    <AuthorImageContainer>
        {students.map(({ name, image_url }) => (
            <StyledAuthorImage
                gradientOffset={4}
                hideOnMobile={false}
                height={AUTHOR_IMAGE_HEIGHT}
                width={AUTHOR_IMAGE_HEIGHT}
                image={image_url}
                key={name}
            />
        ))}
    </AuthorImageContainer>
);

const ProjectCard = ({ project, ...props }) => (
    <HoverCard to={project.slug} image={project.image_url} {...props}>
        <H5>{project.name}</H5>
        <P3>{project.description}</P3>
        <AuthorImages students={project.students} />
    </HoverCard>
);

export default ProjectCard;
