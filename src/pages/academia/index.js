import React from 'react';
import Layout from '../../components/dev-hub/layout';
import { TopBanner } from '../../components/pages/academia';
import { Helmet } from 'react-helmet';
import { useSiteMetadata } from '../../hooks/use-site-metadata';

const AcademiaLandingPage = () => {
    const { title } = useSiteMetadata();
    return (
        <Layout>
            <Helmet>
                <title>MongoDB for Academia - {title}</title>
            </Helmet>
            <TopBanner />
        </Layout>
    );
};
export default AcademiaLandingPage;
