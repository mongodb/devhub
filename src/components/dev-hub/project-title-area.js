import React from 'react';
import styled from '@emotion/styled';
import HeroBanner from './hero-banner';
import ImageGallery from './image-gallery';
import { H2 } from './text';
import { size } from './theme';

const STUDENT_SPOTLIGHT_BREADCRUMBS = [
    { label: 'Home', target: '/' },
    { label: 'MongoDB for Academia', target: '/academia/' },
    { label: 'Student Spotlights', target: '/academia/students' },
];

const IncreasedMarginH2 = styled(H2)`
    margin-bottom: ${size.medium};
`;

const ProjectTitleArea = ({ images, title }) => {
    const BlogTitle = IncreasedMarginH2.withComponent('h1');

    return (
        <HeroBanner breadcrumb={STUDENT_SPOTLIGHT_BREADCRUMBS} fullWidth>
            <BlogTitle>{title}</BlogTitle>
            <ImageGallery images={images} />
        </HeroBanner>
    );
};

export default ProjectTitleArea;
