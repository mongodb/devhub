import React from 'react';
import styled from '@emotion/styled';
import HeroBanner from './hero-banner';
import ImageGallery from './image-gallery';
import Link from './link';
import ShareMenu from './share-menu';
import { H2 } from './text';
import { screenSize, size } from './theme';

const STUDENT_SPOTLIGHT_BREADCRUMBS = [
    { label: 'Home', target: '/' },
    { label: 'MongoDB for Academia', target: '/academia/' },
    { label: 'Student Spotlights', target: '/academia/students' },
];

const IncreasedMarginH2 = styled(H2)`
    margin-bottom: ${size.medium};
    @media ${screenSize.upToMedium} {
        margin-bottom: ${size.xsmall};
    }
`;

const TopRow = styled('div')`
    align-items: baseline;
    display: flex;
    justify-content: space-between;
    @media ${screenSize.upToMedium} {
        flex-direction: column;
        margin-bottom: ${size.medium};
    }
`;

const ProjectTitleArea = ({ description, images, title, url }) => {
    const BlogTitle = IncreasedMarginH2.withComponent('h1');

    return (
        <HeroBanner
            showImageOnMobile={false}
            breadcrumb={STUDENT_SPOTLIGHT_BREADCRUMBS}
            fullWidth
        >
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
