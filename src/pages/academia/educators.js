import React from 'react';
import Layout from '../../components/dev-hub/layout';
import { useSiteMetadata } from '../../hooks/use-site-metadata';
import { removePathPrefixFromUrl } from '~utils/remove-path-prefix-from-url';
import {
    TopBanner,
    HowToJoin,
    ProgramBenefits,
} from '../../components/pages/educators';
import PageHelmet from '~components/dev-hub/page-helmet';

const PAGE_DESCRIPTION =
    'MongoDB for Academia is for educators who want to prepare students for careers that require in-demand database skills that power modern applications.';

const EducatorsPage = ({ path, location }) => {
    const { siteUrl, title } = useSiteMetadata();
    const absoluteUrl = removePathPrefixFromUrl(`${siteUrl}${location.pathname}`);
    return (
        <Layout includeCanonical={false}>
            <PageHelmet
                canonicalUrl={absoluteUrl}
                pagePath={path}
                description={PAGE_DESCRIPTION}
                title={`Academia for Educators - ${title}`}
            />
            <TopBanner description={PAGE_DESCRIPTION} />
            <ProgramBenefits />
            <HowToJoin />
        </Layout>
    );
};

export default EducatorsPage;
