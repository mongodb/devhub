import React from 'react';
import Layout from '~components/dev-hub/layout';
import SEO from '~components/dev-hub/SEO';
import {
    ProjectGrid,
    TopBanner,
    StudentsEducatorsDetails,
} from '~components/pages/academia';
import { useSiteMetadata } from '~hooks/use-site-metadata';

const AcademiaLandingPage = ({ location }) => {
    const { siteUrl } = useSiteMetadata();
    const fullUrl = `${siteUrl}${location.pathname}`;
    return (
        <Layout>
            <SEO
                articleTitle="MongoDB for Academia"
                ogUrl={fullUrl}
                metaDescription="MongoDB for Academia is your home for resources, tools, and community support while you learn or teach MongoDB!"
            />
            <TopBanner />
            <StudentsEducatorsDetails />
            <ProjectGrid />
        </Layout>
    );
};
export default AcademiaLandingPage;
