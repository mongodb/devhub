import React from 'react';
import styled from '@emotion/styled';
import Layout from '~components/dev-hub/layout.js';
import HeroBanner from '~components/dev-hub/hero-banner';
import { H1, H2, H4, P } from '~components/dev-hub/text';
import Button from '~components/dev-hub/button';
import { screenSize, size } from '~components/dev-hub/theme';
import BannerImage from '~images/community-champions/community-champions-banner-icon.png';
import PartnerWithMongoDBImage from '~images/community-champions/partner-with-mongodb.svg';
import CollaborateWithCommunityImage from '~images/community-champions/collaborate-with-community.svg';
import BecomeSpeakerImage from '~images/community-champions/become-speaker.svg';

const APPLY_BUTTON_BOTTOM_MARGIN = '14px';
const APPLY_BUTTON_MOBILE_BOTTOM_MARGIN = '12px';
const WHAT_IT_MEANS_TO_BE_A_CHAMPION_ROW_GAP = '96px';
const WHAT_IT_MEANS_TO_BE_A_CHAMPION_MOBILE_ROW_GAP = '40px';
const WHAT_IT_MEANS_TO_BE_A_CHAMPION_HORIZONTAL_MARGIN = '126px';

const BannerSubtitle = styled(P)`
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

const ContentContainer = styled('div')`
    margin: 0px ${size.xxlarge};
    @media ${screenSize.upToLarge} {
        margin: 0px ${size.default};
    }
`;

const Title = styled(H1)`
    margin: ${size.xlarge} 0px;
    word-wrap: break-word;
    text-align: center;
    @media ${screenSize.upToLarge} {
        margin-top: ${size.large};
        margin-bottom: ${size.mediumLarge};
    }
`;

const Description = styled(P)`
    color: ${({ theme }) => theme.colorMap.greyLightTwo};
`;

const WhatItMeansToBeAChampionRowTitle = styled(H4)`
    margin-bottom: ${size.mediumLarge};
    @media ${screenSize.upToLarge} {
        margin-top: ${size.default};
        margin-bottom: ${size.xsmall};
    }
`;

const WhatItMeansToBeAChampionContainer = styled('div')`
    display: grid;
    row-gap: ${WHAT_IT_MEANS_TO_BE_A_CHAMPION_ROW_GAP};
    @media ${screenSize.upToLarge} {
        row-gap: ${WHAT_IT_MEANS_TO_BE_A_CHAMPION_MOBILE_ROW_GAP};
    }
`;

const WhatItMeansToBeAChampionTextSection = styled('div')`
    ${({ isRowReverse }) =>
        isRowReverse
            ? `margin-left: ${WHAT_IT_MEANS_TO_BE_A_CHAMPION_HORIZONTAL_MARGIN}`
            : `margin-right: ${WHAT_IT_MEANS_TO_BE_A_CHAMPION_HORIZONTAL_MARGIN}`};
    @media ${screenSize.upToLarge} {
        margin: 0px 0px;
    }
`;

const WhatItMeansToBeAChampionRowContainer = styled('div')`
    display: flex;
    flex-direction: ${({ isRowReverse }) =>
        isRowReverse ? 'row-reverse' : 'row'};
    align-items: center;
    @media ${screenSize.upToLarge} {
        flex-direction: column-reverse;
    }
`;

const WhatItMeansToBeAChampionRow = ({
    isRowReverse = false,
    title,
    description,
    image,
}) => {
    return (
        <WhatItMeansToBeAChampionRowContainer isRowReverse={isRowReverse}>
            <WhatItMeansToBeAChampionTextSection isRowReverse={isRowReverse}>
                <WhatItMeansToBeAChampionRowTitle>
                    {title}
                </WhatItMeansToBeAChampionRowTitle>
                <Description>{description}</Description>
            </WhatItMeansToBeAChampionTextSection>
            <img src={image} />
        </WhatItMeansToBeAChampionRowContainer>
    );
};

const communityChampionBreadcrumbs = [
    { label: 'Home', target: '/' },
    {
        label: 'MongoDB Community Champions',
        target: '/community-champions',
    },
];

const CommunityChampions = () => {
    return (
        <Layout>
            <StyledHeroBanner
                breadcrumb={communityChampionBreadcrumbs}
                background={BannerImage}
                backgroundPosition="85% center"
                imageWidthOnMobile="auto"
                maintainSquareAspectRatio={false}
            >
                <H2>MongoDB Community Champions</H2>
                <BannerSubtitle>
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
                </BannerSubtitle>
                <ApplyButton primary>Apply to Become a Champion</ApplyButton>
            </StyledHeroBanner>
            <ContentContainer>
                <div>
                    <Title>What it Means to be a Champion</Title>
                    <WhatItMeansToBeAChampionContainer>
                        <WhatItMeansToBeAChampionRow
                            title="Partner with MongoDB on Product Development Strategy"
                            description="Provide MongoDB with insights into the community’s wants, needs, complaints, and praises. Work closely with our leadership teams to ensure that the community is represented in our product development strategy."
                            image={PartnerWithMongoDBImage}
                        />
                        <WhatItMeansToBeAChampionRow
                            isRowReverse={true}
                            title="Collaborate with Our Community"
                            description="MongoDB Champions lead our community user groups, and create exciting new content about MongoDB technologies."
                            image={CollaborateWithCommunityImage}
                        />
                        <WhatItMeansToBeAChampionRow
                            title="Gain Exposure and Become a Featured Speaker at Events"
                            description="Speak at MongoDB.live and other industry events. Increase your visibility through MongoDB social media channels, podcasts, and DevHub. We celebrate our Champions’ work and achievements throughout our social channels, our forums, and our events, and provide them access to a private forum group."
                            image={BecomeSpeakerImage}
                        />
                    </WhatItMeansToBeAChampionContainer>
                </div>
            </ContentContainer>
        </Layout>
    );
};

export default CommunityChampions;
