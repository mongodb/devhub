import React from 'react';
import styled from '@emotion/styled';
import Layout from '~components/dev-hub/layout';
import {
    GithubStudentPack,
    ShareProjectCTA,
} from '~components/dev-hub/student-spotlight';
import FeaturedProject from '~components/pages/students/featured-project';
import AllProjects from '~components/pages/students/all-projects';
import GalleryHeroBanner from '~components/pages/students/gallery-hero-banner';
import { screenSize, size } from '~components/dev-hub/theme';

const ContentContainer = styled('div')`
    padding-left: ${size.xxlarge};
    padding-right: ${size.xxlarge};
    @media ${screenSize.upToLarge} {
        /* Show image as child under breadcrumbs instead */
        padding: ${size.medium};
        width: 100%;
    }
`;

const Students = () => (
    <Layout>
        <GalleryHeroBanner />
        <ContentContainer>
            <FeaturedProject />
            <AllProjects />
            <ShareProjectCTA />
            <GithubStudentPack />
        </ContentContainer>
    </Layout>
);

export default Students;
