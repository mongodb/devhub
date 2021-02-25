import React from 'react';
import Layout from '~components/dev-hub/layout';
import SEO from '~components/dev-hub/SEO';
import { Form, TopBanner } from '~components/pages/student-submit';
import { useSiteMetadata } from '~hooks/use-site-metadata';

const Submit = ({ location }) => {
    const { siteUrl } = useSiteMetadata();
    const fullUrl = `${siteUrl}${location.pathname}`;
    return (
        <Layout>
            <SEO
                articleTitle="Project Submission"
                ogUrl={fullUrl}
                metaDescription="MongoDB Student Spotlight submission form"
            />
            <TopBanner />
            <Form />
        </Layout>
    );
};

export default Submit;
