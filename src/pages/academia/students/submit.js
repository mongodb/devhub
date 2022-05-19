import React from 'react';
import Layout from '~components/dev-hub/layout';
import SEO from '~components/dev-hub/SEO';
import { Form, TopBanner } from '~components/pages/student-submit';
import { useSiteMetadata } from '~hooks/use-site-metadata';
import { removePathPrefixFromUrl } from '~utils/remove-path-prefix-from-url';

const Submit = ({ location }) => {
    const { siteUrl } = useSiteMetadata();
    const fullUrl = removePathPrefixFromUrl(`${siteUrl}${location.pathname}`);
    return (
        <Layout includeCanonical={false}>
            <SEO
                canonicalUrl={fullUrl}
                title="Project Submission"
                ogUrl={fullUrl}
                metaDescription="MongoDB Student Spotlight submission form"
            />
            <TopBanner />
            <Form />
        </Layout>
    );
};

export default Submit;
