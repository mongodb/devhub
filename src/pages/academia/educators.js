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

export default ({ path }) => {
    const { title } = useSiteMetadata();
    return (
        <Layout>
            <PageHelmet
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
