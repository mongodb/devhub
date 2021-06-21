import React from 'react';
import styled from '@emotion/styled';
import HoverCard from './hover-card';
import { H5, P2 } from './text';
import { screenSize } from './theme';
import AuthorImageList from './author-image-list';

const HideOnMobile = styled('div')`
    @media ${screenSize.upToMedium} {
        display: none;
    }
`;

const CenteredAuthorImageList = styled(AuthorImageList)`
    justify-content: center;
`;

const ProjectCard = ({ project, ...props }) => (
    <HoverCard
        data-test="project-card"
        to={project.slug}
        image={project.image_url}
        {...props}
    >
        <H5>{project.name}</H5>
        <HideOnMobile>
            <P2>{project.description}</P2>
            <CenteredAuthorImageList students={project.students} />
        </HideOnMobile>
    </HoverCard>
);

export default ProjectCard;
