import React from 'react';
import styled from '@emotion/styled';
import Layout from '~components/dev-hub/layout.js';
import HeroBanner from '~components/dev-hub/hero-banner';
import { P, H2 } from '~components/dev-hub/text';
import Button from '~components/dev-hub/button';
import { screenSize, size } from '~components/dev-hub/theme';
import BannerImage from '~images/community-champions/champions-badge.svg';
import BannerImageWithSpace from '~images/community-champions/champions-badge-w-space.svg';
import useMedia from '~hooks/use-media';

const APPLY_BUTTON_BOTTOM_MARGIN = '14px';
const APPLY_BUTTON_MOBILE_BOTTOM_MARGIN = '12px';

const Title = styled(H2)`
    @media ${screenSize.upToLarge} {
        padding-top: ${size.xsmall};
    }
`;

const Subtitle = styled(P)`
    color: ${({ theme }) => theme.colorMap.greyLightTwo};
    margin-top: ${size.mediumLarge};
    @media ${screenSize.upToLarge} {
        margin-top: ${size.default};
    }
`;

const ApplyButton = styled(Button)`
    margin-top: ${size.large};
    margin-bottom: ${APPLY_BUTTON_BOTTOM_MARGIN};
    @media ${screenSize.upToLarge} {
        margin-top: ${size.default};
        margin-bottom: ${APPLY_BUTTON_MOBILE_BOTTOM_MARGIN};
    }
`;

const StyledHeroBanner = styled(HeroBanner)`
    > div {
        /* Overriding background-size here because the initial value was 'contain' which makes the banner image too big */
        background-size: auto;
    }
`;

const communityChampionBreadcrumbs = [
    { label: 'Home', target: '/' },
    {
        label: 'MongoDB Community Champions',
        target: '/community-champions',
    },
];

const CommunityChampions = () => {
    const useBannerImageWithSpace = useMedia(screenSize.upToSmall);
    return (
        <Layout>
            <StyledHeroBanner
                breadcrumb={communityChampionBreadcrumbs}
                /* On phones, we will use the banner image with space on the sides so it doesn't appear too big */
                background={
                    useBannerImageWithSpace ? BannerImageWithSpace : BannerImage
                }
                backgroundPosition="85% center"
                imageWidthOnMobile="auto"
                maintainSquareAspectRatio={false}
            >
                <Title>MongoDB Community Champions</Title>
                <Subtitle>
                    Champions are a group of passionate, dedicated advocates of
                    the MongoDB community. They keep the community informed and
                    excited about our latest developments and newest offerings.
                    They are the trusted bridge between MongoDB and our
                    community.
                    <br />
                    <br />
                    Selected from the community by their peers and by our
                    community team, these individuals represent the organizers,
                    contributors, and creators that are the backbone of our
                    community.
                </Subtitle>
                <ApplyButton primary>Apply to Become a Champion</ApplyButton>
            </StyledHeroBanner>
        </Layout>
    );
};

export default CommunityChampions;