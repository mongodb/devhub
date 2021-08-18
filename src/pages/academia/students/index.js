import React from 'react';
import styled from '@emotion/styled';
import Layout from '~components/dev-hub/layout';
import SEO from '~components/dev-hub/SEO';
import {
    GithubStudentPack,
    ShareProjectCTA,
} from '~components/dev-hub/student-spotlight';
import FeaturedProject from '~components/pages/students/featured-project';
import AllProjects from '~components/pages/students/all-projects';
import GalleryHeroBanner from '~components/pages/students/gallery-hero-banner';
import { screenSize, size } from '~components/dev-hub/theme';
import { useSiteMetadata } from '~hooks/use-site-metadata';
import { removePathPrefixFromUrl } from '~utils/remove-path-prefix-from-url';

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
    @media ${screenSize.upToLarge} {
        padding-bottom: ${size.large};
        padding-top: ${size.large};
    }
`;

const Students = ({ location }) => {
    const { siteUrl } = useSiteMetadata();
    const fullUrl = removePathPrefixFromUrl(`${siteUrl}${location.pathname}`);
    return (
        <Layout>
            <SEO
                title="Student Spotlights"
                ogUrl={fullUrl}
                metaDescription="MongoDB projects created by students, for students!"
            />
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
