import React from 'react';
import { Helmet } from 'react-helmet';
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
import { useSiteMetadata } from '~hooks/use-site-metadata';

const ContentContainer = styled('div')`
    padding-left: ${size.xxlarge};
    padding-right: ${size.xxlarge};
    @media ${screenSize.upToLarge} {
        /* Show image as child under breadcrumbs instead */
        padding: ${size.medium};
        width: 100%;
    }
`;

const TopPaddedShareProjectCTA = styled(ShareProjectCTA)`
    padding-top: ${size.xlarge};
    padding-bottom: 88px;
`;

const Students = () => {
    const metadata = useSiteMetadata();
    return (
        <Layout>
            <Helmet>
                <title>Student Spotlights - {metadata.title}</title>
            </Helmet>
            <GalleryHeroBanner />
            <ContentContainer>
                <FeaturedProject />
                <AllProjects />
                <TopPaddedShareProjectCTA />
            </ContentContainer>
            <GithubStudentPack />
        </Layout>
    );
};

export default Students;