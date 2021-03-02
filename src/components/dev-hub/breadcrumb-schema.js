import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useSiteMetadata } from '../../hooks/use-site-metadata';

const getBreadcrumbList = (breadcrumb, siteUrl) => {
    return breadcrumb.map(({ label, target, to }, index) => {
        const path = target || to;

        return {
            "@type": 'ListItem',
            position: index + 1,
            name: label,
            item: path === '/' ? siteUrl : siteUrl + path + '/',
        };
    });
};

const BreadcrumbSchema = ({
    breadcrumb,
}) => {
    const { siteUrl } = useSiteMetadata();
    return (
        <Helmet>
            {Array.isArray(breadcrumb) && <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "BreadcrumbList",
                    itemListElement: getBreadcrumbList(breadcrumb, siteUrl)
                })}
            </script>
            }
        </Helmet>
    );
};

BreadcrumbSchema.propTypes = {
    breadcrumb: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.shape({
                label: PropTypes.string,
                target: PropTypes.string
            }),
            PropTypes.shape({
                label: PropTypes.string,
                to: PropTypes.string
            })])
    ).isRequired
};

export default BreadcrumbSchema;
