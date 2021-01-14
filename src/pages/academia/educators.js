import React from 'react';
import Layout from '../../components/dev-hub/layout';
import { Helmet } from 'react-helmet';
import { useSiteMetadata } from '../../hooks/use-site-metadata';
import {
    TopBanner,
    HowToJoin,
    ProgramBenefits,
} from '../../components/pages/educators';

export default () => {
    const metadata = useSiteMetadata();
    return (
        <Layout>
            <Helmet>
                <title>Academia for Educators - {metadata.title}</title>
            </Helmet>
            <TopBanner />
            <ProgramBenefits />
            <HowToJoin />
        </Layout>
    );
};
