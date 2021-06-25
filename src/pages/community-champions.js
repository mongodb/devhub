import React from 'react';
import styled from '@emotion/styled';
import Layout from '~components/dev-hub/layout.js';
import HeroBanner from '~components/dev-hub/hero-banner';
import { H1, H2, H4, P, P2 } from '~components/dev-hub/text';
import Button from '~components/dev-hub/button';
import {
    fontSize,
    lineHeight,
    screenSize,
    size,
} from '~components/dev-hub/theme';
import BannerImage from '~images/community-champions/champions-badge.svg';
import BannerImageWithSpace from '~images/community-champions/champions-badge-w-space.svg';
import PartnerWithMongoDBImage from '~images/community-champions/partner-with-mongodb.jpg';
import CollaborateWithCommunityImage from '~images/community-champions/collaborate-with-community.jpg';
import BecomeSpeakerImage from '~images/community-champions/become-speaker.jpg';
import UpholdCommunityCodeOfConductIcon from '~images/community-champions/uphold-community-code-of-conduct.svg';
import BeGuidingLightIcon from '~images/community-champions/be-guiding-light.svg';
import ProtectAndFosterCommunityCultureIcon from '~images/community-champions/protect-and-foster-community-culture.svg';
import useMedia from '~hooks/use-media';
import MediaBlock from '~components/dev-hub/media-block';

const APPLY_BUTTON_BOTTOM_MARGIN = '14px';
const APPLY_BUTTON_MOBILE_BOTTOM_MARGIN = '12px';
const WHAT_IT_MEANS_TO_BE_A_CHAMPION_ROW_GAP = '96px';
const WHAT_IT_MEANS_TO_BE_A_CHAMPION_MOBILE_ROW_GAP = '40px';
const WHAT_IT_MEANS_TO_BE_A_CHAMPION_TEXT_HORIZONTAL_MARGIN = '20%';
const LEAD_BY_EXAMPLE_CONTAINER_PADDING = '48px';
const LEAD_BY_EXAMPLE_ICON_WIDTH = '44px';
const LEAD_BY_EXAMPLE_ICON_MOBILE_WIDTH = '38px';
const LEAD_BY_EXAMPLE_GRID_ROW_GAP = '29px';
const LEAD_BY_EXAMPLE_GRID_COLUMN_GAP = '48px';
const LEAD_BY_EXAMPLE_TITLE_BOTTOM_MARGIN = '40px';
const LEAD_BY_EXAMPLE_TITLE_MOBILE_BOTTOM_MARGIN = '29px';

const BannerTitle = styled(H2)`
    @media ${screenSize.upToLarge} {
        padding-top: ${size.xsmall};
    }
`;

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
    margin: 0 ${size.xxlarge};
    @media ${screenSize.upToLarge} {
        margin: 0 ${size.default};
    }
`;

const Title = styled(H1)`
    margin: ${size.xlarge} 0;
    text-align: center;
    @media ${screenSize.upToLarge} {
        margin-top: ${size.large};
        margin-bottom: ${size.mediumLarge};
    }
`;

const Description = styled(P)`
    color: ${({ theme }) => theme.colorMap.greyLightTwo};
`;

const GreyP2 = styled(P2)`
    color: ${({ theme }) => theme.colorMap.greyLightTwo};
    margin-bottom: 0;
`;

const WhatItMeansToBeAChampionContainer = styled('div')`
    display: grid;
    row-gap: ${WHAT_IT_MEANS_TO_BE_A_CHAMPION_ROW_GAP};
    @media ${screenSize.upToLarge} {
        row-gap: ${WHAT_IT_MEANS_TO_BE_A_CHAMPION_MOBILE_ROW_GAP};
    }
`;

const WhatItMeansToBeAChampionTextSection = styled('div')`
    ${({ reverse }) =>
        reverse
            ? `margin-right: ${WHAT_IT_MEANS_TO_BE_A_CHAMPION_TEXT_HORIZONTAL_MARGIN}`
            : `margin-left: ${WHAT_IT_MEANS_TO_BE_A_CHAMPION_TEXT_HORIZONTAL_MARGIN}`};
    @media ${screenSize.upToLarge} {
        margin: ${size.default} 0 0 0;
    }
`;

const WhatItMeansToBeAChampionRowTitle = styled(H4)`
    margin-bottom: ${size.mediumLarge};
    @media ${screenSize.upToLarge} {
        margin-bottom: ${size.xsmall};
    }
`;

const ImageWithRoundedCorners = styled('img')`
    border-radius: ${size.xsmall};
`;

const StyledMediaBlock = styled(MediaBlock)`
    > div,
    > span {
        display: flex;
        align-items: center;
    }
`;

const WhatItMeansToBeAChampionText = ({
    reverse = false,
    title,
    description,
}) => {
    return (
        <WhatItMeansToBeAChampionTextSection reverse={reverse}>
            <WhatItMeansToBeAChampionRowTitle>
                {title}
            </WhatItMeansToBeAChampionRowTitle>
            <Description collapse>{description}</Description>
        </WhatItMeansToBeAChampionTextSection>
    );
};

const LeadByExampleContainer = styled('div')`
    background-color: ${({ theme }) => theme.colorMap.greyDarkThree};
    border-radius: ${size.xsmall};
    padding: ${LEAD_BY_EXAMPLE_CONTAINER_PADDING};
    margin: ${WHAT_IT_MEANS_TO_BE_A_CHAMPION_ROW_GAP} 0 ${size.xlarge} 0;
    @media ${screenSize.upToLarge} {
        padding: ${size.mediumLarge};
        margin: ${size.large} 0;
    }
`;

const LeadByExampleItemContainer = styled('div')`
    display: grid;
    grid-column-gap: ${size.mediumLarge};
    grid-template-columns: ${LEAD_BY_EXAMPLE_ICON_WIDTH} auto;
    @media ${screenSize.upToLarge} {
        grid-template-columns: ${LEAD_BY_EXAMPLE_ICON_MOBILE_WIDTH} auto;
    }
`;

const LeadByExampleSectionTitle = styled('div')`
    font-family: 'Fira Mono', monospace;
    font-weight: bold;
    margin-bottom: ${size.xsmall};
    font-size: ${fontSize.small};
    line-height: ${lineHeight.small};
    @media ${screenSize.upToLarge} {
        font-size: ${fontSize.tiny};
        line-height: ${lineHeight.tiny};
    }
`;

const LeadByExampleItem = ({ icon, title, description }) => {
    return (
        <LeadByExampleItemContainer>
            <img src={icon} />
            <div>
                <LeadByExampleSectionTitle>{title}</LeadByExampleSectionTitle>
                {description}
            </div>
        </LeadByExampleItemContainer>
    );
};

const CodeOfConductLink = styled(`a`)`
    color: ${({ theme }) => theme.colorMap.lightGreen};
    text-decoration: none;
`;

const LeadByExampleGrid = styled('div')`
    display: grid;
    grid-row-gap: ${LEAD_BY_EXAMPLE_GRID_ROW_GAP};
    @media ${screenSize.largeAndUp} {
        grid-template-columns: repeat(3, 1fr);
        grid-column-gap: ${LEAD_BY_EXAMPLE_GRID_COLUMN_GAP};
    }
`;

const LeadByExampleTitle = styled(H4)`
    margin-bottom: ${LEAD_BY_EXAMPLE_TITLE_BOTTOM_MARGIN};
    @media ${screenSize.upToLarge} {
        margin-bottom: ${LEAD_BY_EXAMPLE_TITLE_MOBILE_BOTTOM_MARGIN};
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
                <BannerTitle>MongoDB Community Champions</BannerTitle>
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
                        <StyledMediaBlock
                            reverse
                            mediaComponent={
                                <ImageWithRoundedCorners
                                    src={PartnerWithMongoDBImage}
                                    alt="MongoDB employees video conferencing with Community Champions and providing a product timeline update"
                                />
                            }
                        >
                            <WhatItMeansToBeAChampionText
                                reverse
                                title="Partner with MongoDB on Product Development Strategy"
                                description="Provide MongoDB with insights into the community’s wants, needs, complaints, and praises. Work closely with our leadership teams to ensure that the community is represented in our product development strategy."
                            />
                        </StyledMediaBlock>
                        <StyledMediaBlock
                            mediaComponent={
                                <ImageWithRoundedCorners
                                    src={CollaborateWithCommunityImage}
                                    alt="Group of community members sitting around a table and working on tablets at an event"
                                />
                            }
                        >
                            <WhatItMeansToBeAChampionText
                                title="Collaborate with Our Community"
                                description="MongoDB Champions lead our community user groups, and create exciting new content about MongoDB technologies."
                            />
                        </StyledMediaBlock>
                        <StyledMediaBlock
                            reverse
                            mediaComponent={
                                <ImageWithRoundedCorners
                                    src={BecomeSpeakerImage}
                                    alt="Community Champion giving a presentation in front of an audience at a MongoDB event"
                                />
                            }
                        >
                            <WhatItMeansToBeAChampionText
                                reverse
                                title="Gain Exposure and Become a Featured Speaker at Events"
                                description="Speak at MongoDB.live and other industry events. Increase your visibility through MongoDB social media channels, podcasts, and DevHub. We celebrate our Champions’ work and achievements throughout our social channels, our forums, and our events, and provide them access to a private forum group."
                            />
                        </StyledMediaBlock>
                    </WhatItMeansToBeAChampionContainer>
                </div>
                <LeadByExampleContainer>
                    <LeadByExampleTitle>
                        Champions Lead by Example
                    </LeadByExampleTitle>
                    <LeadByExampleGrid>
                        <LeadByExampleItem
                            icon={UpholdCommunityCodeOfConductIcon}
                            title="Uphold the Community Code of Conduct"
                            description={
                                <GreyP2>
                                    The MongoDB Champion is a pillar of the
                                    community, exemplifying the best behavior
                                    and upholding the community{' '}
                                    <CodeOfConductLink href="https://www.mongodb.com/community-code-of-conduct">
                                        Code of Conduct
                                    </CodeOfConductLink>
                                    .
                                </GreyP2>
                            }
                        />
                        <LeadByExampleItem
                            icon={BeGuidingLightIcon}
                            title="Be a Guiding Light"
                            description={
                                <GreyP2>
                                    Help new members become acclimated to the
                                    norms of the community by helping them learn
                                    how to ask questions, how to contribute, how
                                    to participate in community events, and how
                                    to upskill their knowledge.
                                </GreyP2>
                            }
                        />
                        <LeadByExampleItem
                            icon={ProtectAndFosterCommunityCultureIcon}
                            title="Protect and Foster Community Culture"
                            description={
                                <GreyP2>
                                    Champions protect the culture of the
                                    community and are the first to welcome new
                                    members.
                                </GreyP2>
                            }
                        />
                    </LeadByExampleGrid>
                </LeadByExampleContainer>
            </ContentContainer>
        </Layout>
    );
};

export default CommunityChampions;
