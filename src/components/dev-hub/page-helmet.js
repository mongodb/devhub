import React, { memo } from 'react';
import PropTypes from 'prop-types';

import SEO from '~components/dev-hub/SEO';
import { useSiteMetadata } from '~hooks/use-site-metadata';
import { addTrailingSlashIfMissing } from '~utils/add-trailing-slash-if-missing';

const STANDARD_DESCRIPTION =
    "Code, content, tutorials, programs and community to enable developers of all skill levels on the MongoDB Data Platform which includes Atlas, Realm, Compass, Data Lake and more. Whether you're coding in Java, JavaScript, C#, Python, Node, Go or looking for how this fits with IOT, AI, ML - join or follow us here.";

const PageHelmet = ({ description, image, pagePath, title, ...props }) => {
    const { title: standardTitle, siteUrl } = useSiteMetadata();

    const metaDescription = description || STANDARD_DESCRIPTION;
    const ogImage =
        image || `${siteUrl}/public/images/social_share_generic.png`;
    const metaTitle = title || standardTitle;
    const canonicalUrl = pagePath
        ? addTrailingSlashIfMissing(`${siteUrl}${pagePath}`)
        : siteUrl;

    return (
        <SEO
            articleTitle={metaTitle}
            canonicalUrl={canonicalUrl}
            image={ogImage}
            metaDescription={metaDescription}
            ogDescription={metaDescription}
            ogTitle={metaTitle}
            ogUrl={canonicalUrl}
            type="website"
            twitter={{
                description: metaDescription,
                image: ogImage,
                title: metaTitle,
            }}
            {...props}
        />
    );
};

PageHelmet.propTypes = {
    description: PropTypes.string,
    image: PropTypes.string,
    pagePath: PropTypes.string,
    title: PropTypes.string,
};

export default memo(PageHelmet);
