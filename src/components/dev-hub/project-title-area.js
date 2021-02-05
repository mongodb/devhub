import React from 'react';
import styled from '@emotion/styled';
import ShareMenu from './share-menu';
import HeroBanner from './hero-banner';
import ImageGallery from './image-gallery';
import Link from './link';
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

const TopRow = styled('div')`
    align-items: baseline;
    display: flex;
    justify-content: space-between;
`;

const ProjectTitleArea = ({ description, images, title, url }) => {
    const BlogTitle = IncreasedMarginH2.withComponent('h1');

    return (
        <HeroBanner breadcrumb={STUDENT_SPOTLIGHT_BREADCRUMBS} fullWidth>
            <TopRow>
                <BlogTitle>{title}</BlogTitle>
                <ShareMenu
                    position="left"
                    title={title}
                    Trigger={<Link>Share</Link>}
                    url={url}
                />
            </TopRow>
            <ImageGallery description={description} images={images} />
        </HeroBanner>
    );
};

export default ProjectTitleArea;
