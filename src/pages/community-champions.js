import React from 'react';
import Layout from '~components/dev-hub/layout.js';
import HeroBanner from '~components/dev-hub/hero-banner';
import { P, H2 } from '../components/dev-hub/text';
import styled from '@emotion/styled';
import Button from '~components/dev-hub/button';
import BannerImage from '../images/community-champions/community-champions-banner-icon.png';

const StyledP = styled(P)`
    color: ${({ theme }) => theme.colorMap.greyLightTwo};
`;

const StyledButton = styled(Button)`
    margin-top: 12px;
`;

const StyledHeroBanner = styled(HeroBanner)`
    > div {
        background-size: 348px;
    }
`;

const CommunityChampions = () => {
    const communityChampionBreadcrumbs = [
        { label: 'Home', target: '/' },
        { label: 'Community', target: '/community' },
        {
            label: 'MongoDB Community Champions',
            target: '/community-champions',
        },
    ];
    return (
        <Layout>
            <StyledHeroBanner
                breadcrumb={communityChampionBreadcrumbs}
                background={BannerImage}
                backgroundPosition="85% center"
                imageWidthOnMobile="248px"
                maintainSquareAspectRatio={false}
            >
                <H2>MongoDB Community Champions</H2>
                <StyledP>
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
                </StyledP>
                <StyledButton primary>Apply to Become a Champion</StyledButton>
            </StyledHeroBanner>
        </Layout>
    );
};

export default CommunityChampions;
