import React, { memo } from 'react';
import PropTypes from 'prop-types';

import SEO from '~components/dev-hub/SEO';
import { useSiteMetadata } from '~hooks/use-site-metadata';

const STANDARD_DESCRIPTION =
    "Code, content, tutorials, programs and community to enable developers of all skill levels on the MongoDB Data Platform which includes Atlas, Realm, Compass, Data Lake and more. Whether you're coding in Java, JavaScript, C#, Python, Node, Go or looking for how this fits with IOT, AI, ML - join or follow us here.";

const PageHelmet = ({ canonicalUrl, metaDescription, metaTitle }) => {
    const { title: standardTitle, siteUrl } = useSiteMetadata();

    const description = metaDescription || STANDARD_DESCRIPTION;
    const image = `${siteUrl}/public/images/MongoDB_Leaf.svg`;
    const title = metaTitle || standardTitle;
    const url = canonicalUrl || siteUrl;

    console.log(standardTitle);

    return (
        <SEO
            articleTitle={title}
            canonicalUrl={url}
            image={image}
            metaDescription={description}
            ogDescription={description}
            ogTitle={title}
            ogUrl={url}
            type="website"
            twitter={{
                description,
                image,
                title,
            }}
        />
    );
};

PageHelmet.propTypes = {
    canonicalUrl: PropTypes.string,
    metaDescription: PropTypes.string,
    metaTitle: PropTypes.string,
};

export default memo(PageHelmet);
