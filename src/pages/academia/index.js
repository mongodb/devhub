import React from 'react';
import Layout from '~components/dev-hub/layout';
import PageHelmet from '~components/dev-hub/page-helmet';
import {
    ProjectGrid,
    TopBanner,
    StudentsEducatorsDetails,
} from '~components/pages/academia';
import { useSiteMetadata } from '~hooks/use-site-metadata';
import { removePathPrefixFromUrl } from '~utils/remove-path-prefix-from-url';

const AcademiaLandingPage = ({ location }) => {
    const { siteUrl } = useSiteMetadata();
    const absoluteUrl = removePathPrefixFromUrl(`${siteUrl}${location.pathname}`);
    return (
        <Layout includeCanonical={false}>
            <PageHelmet
                title="MongoDB for Academia"
                canonicalUrl={absoluteUrl}
                ogUrl={absoluteUrl}
                metaDescription="MongoDB for Academia is your home for resources, tools, and community support while you learn or teach MongoDB!"
            />
            <TopBanner />
            <StudentsEducatorsDetails />
            <ProjectGrid />
        </Layout>
    );
};
export default AcademiaLandingPage;
