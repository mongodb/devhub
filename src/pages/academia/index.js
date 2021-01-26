import React from 'react';
import Layout from '~components/dev-hub/layout';
import {
    ProjectGrid,
    TopBanner,
    StudentsEducatorsDetails,
} from '~components/pages/academia';
import { useSiteMetadata } from '~hooks/use-site-metadata';
import { Helmet } from 'react-helmet';

const AcademiaLandingPage = () => {
    const { title } = useSiteMetadata();
    return (
        <Layout>
            <Helmet>
                <title>MongoDB for Academia - {title}</title>
            </Helmet>
            <TopBanner />
            <StudentsEducatorsDetails />
            <ProjectGrid />
        </Layout>
    );
};
export default AcademiaLandingPage;
