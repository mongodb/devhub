import React from 'react';
import HeroBanner from './hero-banner';
import ImageGallery from './image-gallery';
import { H2 } from './text';

const ProjectTitleArea = ({ title }) => {
    const BlogTitle = H2.withComponent('h1');
    const academiaBreadcrumbs = [
        { label: 'Home', target: '/' },
        { label: 'MongoDB for Academia', target: '/academia/' },
        { label: 'Student Spotlights', target: '/academia/students' },
    ];
    return (
        <HeroBanner breadcrumb={academiaBreadcrumbs} fullWidth>
            <BlogTitle collapse>{title}</BlogTitle>
            <ImageGallery />
        </HeroBanner>
    );
};

export default ProjectTitleArea;
