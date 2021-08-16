import React from 'react';
import { Helmet } from 'react-helmet';
import { useSiteMetadata } from '../../hooks/use-site-metadata';
import { getImageSrc } from '../../utils/get-image-src';

const DEFAULT_OG_TYPE = 'article';
const DEFAULT_TWITTER_SITE = '@mongodb';

const SEO = ({
    title,
    canonicalUrl,
    image,
    metaDescription,
    ogDescription,
    ogTitle,
    ogUrl,
    twitter = {},
    type,
}) => {
    const { siteUrl } = useSiteMetadata();
    const ogImgSrc = image ? getImageSrc(image, siteUrl) : null;
    const effectiveMetaDescription = metaDescription || ogDescription;
    const effectiveOgDescription = ogDescription || metaDescription;
    const effectiveOgType = type || DEFAULT_OG_TYPE;
    const effectiveTwitterSite = twitter.site || DEFAULT_TWITTER_SITE;
    return (
        <Helmet>
            {/* meta description Tag */}
            {effectiveMetaDescription && (
                <meta name="description" content={effectiveMetaDescription} />
            )}
            {/* og:description Tag */}
            {effectiveOgDescription && (
                <meta
                    property="og:description"
                    content={effectiveOgDescription}
                />
            )}
            {/* Type Tag */}
            <meta property="og:type" content={effectiveOgType} />

            {/* og:image Tag */}
            {ogImgSrc && <meta property="og:image" content={ogImgSrc} />}

            {/* Title Tags */}
            {title && <title>{title}</title>}
            {ogTitle && <meta property="og:title" content={ogTitle} />}

            {/* Twitter Tags */}
            {twitter && <meta name="twitter:card" content="summary" />}
            {twitter.creator && (
                <meta name="twitter:creator" content={twitter.creator} />
            )}
            {twitter.description && (
                <meta
                    property="twitter:description"
                    content={twitter.description}
                />
            )}
            {twitter.image && (
                <meta name="twitter:image" content={twitter.image} />
            )}
            <meta name="twitter:site" content={effectiveTwitterSite} />
            {twitter.title && (
                <meta property="twitter:title" content={twitter.title} />
            )}

            {/* URL Tags */}
            {ogUrl && <meta property="og:url" content={ogUrl} />}
            {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
        </Helmet>
    );
};

export default SEO;
