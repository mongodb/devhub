import React from 'react';
import { Helmet } from 'react-helmet';
import { useSiteMetadata } from '../../hooks/use-site-metadata';
import { getNestedText } from '../../utils/get-nested-text';

const isExternalUrl = /^http(s)?:\/\//;

const getImageSrc = (src, siteUrl) => {
    if (!src) {
        return null;
    }

    return isExternalUrl.test(src) ? src : siteUrl + src;
};

const SEO = ({
    articleTitle,
    canonicalUrl,
    image,
    metaDescription,
    ogDescription,
    ogTitle,
    ogUrl,
    type,
    twitterNode,
}) => {
    const twitter = twitterNode ? twitterNode.options : {};
    const twitterDescription = twitterNode
        ? getNestedText(twitterNode.children)
        : null;
    const { siteUrl } = useSiteMetadata();
    const ogImgSrc = image ? getImageSrc(image, siteUrl) : null;
    const twitterImgSrc = twitter.image
        ? getImageSrc(twitter.image, siteUrl)
        : null;
    const effectiveMetaDescription = metaDescription || ogDescription;
    const effectiveOgDescription = ogDescription || metaDescription;
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
            {type && <meta property="og:type" content={type} />}

            {/* og:image Tag */}
            {ogImgSrc && <meta property="og:image" content={ogImgSrc} />}

            {/* Title Tags */}
            {articleTitle && <title>{articleTitle}</title>}
            {ogTitle && <meta property="og:title" content={ogTitle} />}

            {/* Twitter Tags */}
            {twitter && <meta name="twitter:card" content="summary" />}
            {twitter.creator && (
                <meta name="twitter:creator" content={twitter.creator} />
            )}
            {twitterDescription && (
                <meta
                    property="twitter:description"
                    content={twitterDescription}
                />
            )}
            {twitterImgSrc && (
                <meta name="twitter:image" content={twitterImgSrc} />
            )}
            {twitter.site && (
                <meta name="twitter:site" content={twitter.site} />
            )}
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
