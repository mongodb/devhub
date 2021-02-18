import React from 'react';
import styled from '@emotion/styled';
import HoverCard from './hover-card';
import { H5, P2 } from './text';
import AuthorImageList from './author-image-list';

const CenteredAuthorImageList = styled(AuthorImageList)`
    justify-content: center;
`;

const ProjectCard = ({ project, ...props }) => (
    <HoverCard to={project.slug} image={project.image_url} {...props}>
        <H5>{project.name}</H5>
        <P2>{project.description}</P2>
        <CenteredAuthorImageList students={project.students} />
    </HoverCard>
);

export default ProjectCard;
