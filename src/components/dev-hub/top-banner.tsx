import React from 'react';
import dlv from 'dlv';
import { useStaticQuery, graphql } from 'gatsby';
import styled from '@emotion/styled';
import useMedia from '~hooks/use-media';
import Link from './link';
import { screenSize, size } from './theme';

const LiveImage = styled('img')`
    border-radius: 0;
    display: block;
    height: auto;
    margin-bottom: 0;
    max-width: 100%;
    @media ${screenSize.mediumAndUp} {
        min-height: ${size.large};
        object-fit: cover;
    }
`;

const topBannerData = graphql`
    query TopBannerData {
        strapiTopBanner {
            desktopBanner {
                alternativeText
                height
                width
                url
            }
            mobileBanner {
                alternativeText
                height
                width
                url
            }
            targetUrl
        }
    }
`;

const TopBanner = () => {
    const data = useStaticQuery(topBannerData);
    const topBannerNode = dlv(data, 'strapiTopBanner', null);
    const isMobile = useMedia(screenSize.upToMedium, null);
    if (
        !topBannerNode ||
        !topBannerNode.desktopBanner ||
        !topBannerNode.mobileBanner
    )
        return null;
    const src = isMobile
        ? topBannerNode.mobileBanner
        : topBannerNode.desktopBanner;
    return (
        <Link href={data.strapiTopBanner.target} target="_blank">
            <LiveImage
                alt={src.alternativeText}
                src={src.url}
                height={src.height}
                width={src.width}
            />
        </Link>
    );
};

export default TopBanner;
