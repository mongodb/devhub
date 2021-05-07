import React from 'react';
import Layout from '../../components/dev-hub/layout';
import { useSiteMetadata } from '../../hooks/use-site-metadata';
import {
    TopBanner,
    HowToJoin,
    ProgramBenefits,
} from '../../components/pages/educators';
import PageHelmet from '~components/dev-hub/page-helmet';

const PAGE_DESCRIPTION =
    'MongoDB for Academia is for educators who want to prepare students for careers that require in-demand database skills that power modern applications.';

export default () => {
    const { title, siteUrl } = useSiteMetadata();
    return (
        <Layout>
            <PageHelmet
                canonicalUrl={`${siteUrl}/academia/educators`}
                metaDescription={PAGE_DESCRIPTION}
                metaTitle={`Academia for Educators - ${title}`}
            />
            <TopBanner description={PAGE_DESCRIPTION} />
            <ProgramBenefits />
            <HowToJoin />
        </Layout>
    );
};
