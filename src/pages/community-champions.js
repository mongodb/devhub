import React from 'react';
import styled from '@emotion/styled';
import dlv from 'dlv';
import { useStaticQuery, graphql } from 'gatsby';
import AuthorImage from '~components/dev-hub/author-image';
import Button from '~components/dev-hub/button';
import GreenBulletedList from '~components/dev-hub/green-bulleted-list';
import HeroBanner from '~components/dev-hub/hero-banner';
import Layout from '~components/dev-hub/layout';
import Link from '~components/dev-hub/link';
import MediaBlock from '~components/dev-hub/media-block';
import {
    H1,
    H2,
    H3,
    H4,
    H5,
    H6,
    P,
    P2,
    P3,
    P4,
} from '~components/dev-hub/text';
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
import BuildingBlocksImage from '~images/community-champions/3d-building-blocks.svg';
import PeopleInCircleImage from '~images/community-champions/people-in-circle.svg';
import EventAdmissionTicketImage from '~images/community-champions/event-admission-ticket.svg';
import UpwardsArrowImage from '~images/community-champions/upwards-arrow.svg';
import BrowserWindowWithStarImage from '~images/community-champions/browser-window-with-star.svg';
import MicrophoneImage from '~images/community-champions/microphone.svg';
import ChatBubblesImage from '~images/community-champions/chat-bubbles.svg';
import GroupImage from '~images/community-champions/group.svg';
import RocketShipImage from '~images/community-champions/rocket-ship.svg';
import StackSquaresImage from '~images/community-champions/stack-squares.svg';
import PaperAndPencilImage from '~images/community-champions/paper-and-pencil.svg';
import PinLocationIcon from '~images/community-champions/pin-location.svg';
import ChampionPlaceholderImage from '~images/community-champions/champion-placeholder.svg';
import useMedia from '~hooks/use-media';

const APPLY_BUTTON_BOTTOM_MARGIN = '14px';
const APPLY_BUTTON_MOBILE_BOTTOM_MARGIN = '12px';
const WHAT_IT_MEANS_TO_BE_A_CHAMPION_ROW_GAP = '96px';
const WHAT_IT_MEANS_TO_BE_A_CHAMPION_MOBILE_ROW_GAP = '40px';
const WHAT_IT_MEANS_TO_BE_A_CHAMPION_TEXT_HORIZONTAL_MARGIN = '20%';
const LEAD_BY_EXAMPLE_CONTAINER_PADDING = '48px';
const LEAD_BY_EXAMPLE_ICON_WIDTH = '44px';
const LEAD_BY_EXAMPLE_ICON_MOBILE_WIDTH = '38px';
const LEAD_BY_EXAMPLE_GRID_COLUMN_GAP = '48px';
const LEAD_BY_EXAMPLE_TITLE_BOTTOM_MARGIN = '40px';
const BENEFITS_AND_REWARDS_IMAGE_CONTAINER_HEIGHT = '170px';
const HOW_TO_QUALIFY_CONTAINER_BOTTOM_MARGIN = '56px';
const HOW_TO_QUALIFY_CONTRIBUTE_SECTION_WIDTH = '54%';
const HOW_TO_QUALIFY_CARD_CONTAINER_PADDING = '48px';
const HOW_TO_QUALIFY_CARD_TITLE_BOTTOM_MARGIN = '4px';
const LINE_BOTTOM_MARGIN = '56px';
const OTHER_DETAILS_AND_REQUIREMENTS_IMAGE_SIZE = '30%';
const OTHER_DETAILS_AND_REQUIREMENTS_IMAGE_WIDTH = '70%';
const OTHER_DETAILS_AND_REQUIREMENTS_DESCRIPTION_MAX_WIDTH = '690px';
const OTHER_DETAILS_AND_REQUIREMENTS_LIST_MAX_WIDTH = '480px';
const CHAMPION_ITEM_CONTAINER_WIDTH = '200px';
const CHAMPION_ITEM_CONTAINER_MOBILE_WIDTH = '170px';
const CHAMPION_PROFILE_PICTURE_SIZE = 112;
const CHAMPION_PROFILE_PICTURE_GRADIENT_OFFSET = 8;

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
    margin-bottom: ${size.xlarge};
    text-align: center;
    @media ${screenSize.upToLarge} {
        margin-bottom: ${size.mediumLarge};
    }
`;

const Description = styled(P)`
    color: ${({ theme }) => theme.colorMap.greyLightTwo};
`;

const GreyP2 = styled(P2)`
    color: ${({ theme }) => theme.colorMap.greyLightTwo};
`;

const WhatItMeansToBeAChampionContainer = styled('div')`
    margin-top: ${size.xlarge};
    @media ${screenSize.upToLarge} {
        margin-top: ${size.large};
    }
`;

const WhatItMeansToBeAChampionGrid = styled('div')`
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
}) => (
    <WhatItMeansToBeAChampionTextSection reverse={reverse}>
        <WhatItMeansToBeAChampionRowTitle>
            {title}
        </WhatItMeansToBeAChampionRowTitle>
        <Description collapse>{description}</Description>
    </WhatItMeansToBeAChampionTextSection>
);

const LeadByExampleContainer = styled('div')`
    background-color: ${({ theme }) => theme.colorMap.greyDarkThree};
    border-radius: ${size.xsmall};
    margin: ${WHAT_IT_MEANS_TO_BE_A_CHAMPION_ROW_GAP} 0 ${size.xlarge} 0;
    padding: ${LEAD_BY_EXAMPLE_CONTAINER_PADDING};
    @media ${screenSize.upToLarge} {
        margin: ${size.large} 0;
        padding: ${size.mediumLarge};
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

const LeadByExampleSectionTitle = styled(H6)`
    margin-bottom: ${size.xsmall};
`;

const LeadByExampleItem = ({ icon, title, description }) => (
    <LeadByExampleItemContainer>
        {icon}
        <div>
            <LeadByExampleSectionTitle>{title}</LeadByExampleSectionTitle>
            {description}
        </div>
    </LeadByExampleItemContainer>
);

const CodeOfConductLink = styled(Link)`
    color: ${({ theme }) => theme.colorMap.lightGreen};
    text-decoration: none;
    &:visited {
        color: ${({ theme }) => theme.colorMap.lightGreen};
    }
    &:hover {
        color: ${({ theme }) => theme.colorMap.darkGreen};
    }
`;

const LeadByExampleGrid = styled('div')`
    display: grid;
    grid-row-gap: ${size.mediumLarge};
    @media ${screenSize.largeAndUp} {
        grid-column-gap: ${LEAD_BY_EXAMPLE_GRID_COLUMN_GAP};
        grid-template-columns: repeat(3, 1fr);
    }
`;

const LeadByExampleTitle = styled(H4)`
    margin-bottom: ${LEAD_BY_EXAMPLE_TITLE_BOTTOM_MARGIN};
    @media ${screenSize.upToLarge} {
        margin-bottom: ${size.mediumLarge};
    }
`;

const BenefitsAndRewardsGrid = styled('div')`
    display: grid;
    grid-row-gap: ${size.large};
    @media ${screenSize.mediumAndUp} {
        grid-column-gap: ${size.mediumLarge};
        grid-template-columns: repeat(2, 1fr);
    }
    @media ${screenSize.largeAndUp} {
        grid-template-columns: repeat(4, 1fr);
    }
`;

const BenefitsAndRewardsItemContainer = styled('div')`
    display: flex;
    flex-direction: column;
`;

const BenefitsAndRewardsSectionTitle = styled(H5)`
    margin-bottom: ${size.default};
    margin-top: ${size.mediumLarge};
    text-align: center;
    @media ${screenSize.upToLarge} {
        margin-bottom: ${size.xsmall};
    }
`;

const BenefitsAndRewardsImageContainer = styled('div')`
    display: flex;
    height: ${BENEFITS_AND_REWARDS_IMAGE_CONTAINER_HEIGHT};
    justify-content: center;
    max-width: 100%;
`;

const BenefitsAndRewardsContainer = styled('div')`
    background-color: ${({ theme }) => theme.colorMap.devBlack};
    margin: 0 -${size.xxlarge};
    padding: ${size.xlarge} ${size.xxlarge};
    @media ${screenSize.upToLarge} {
        margin: 0 -${size.default};
        padding: ${size.large} ${size.default};
    }
`;

const BulletText = styled(P2)`
    color: ${({ theme }) => theme.colorMap.devWhite};
    margin-bottom: 0;
`;

const GreenBulletedListWithNoMargin = styled(GreenBulletedList)`
    margin: 0;
    li {
        margin-bottom: ${size.xsmall};
    }
`;

const BenefitsAndRewardsItem = ({ icon, title, bullets }) => (
    <BenefitsAndRewardsItemContainer>
        <BenefitsAndRewardsImageContainer>
            {icon}
        </BenefitsAndRewardsImageContainer>
        <BenefitsAndRewardsSectionTitle>{title}</BenefitsAndRewardsSectionTitle>
        <GreenBulletedListWithNoMargin
            bulletTextComponent={BulletText}
            children={bullets}
        />
    </BenefitsAndRewardsItemContainer>
);

const HowToQualifyContainer = styled('div')`
    margin: ${size.xlarge} 0 ${HOW_TO_QUALIFY_CONTAINER_BOTTOM_MARGIN} 0;
    @media ${screenSize.upToLarge} {
        margin: ${size.large} 0;
    }
`;

const HowToQualifyContributeTitle = styled(H3)`
    @media ${screenSize.upToMedium} {
        margin-bottom: ${size.xsmall};
    }
`;

const HowToQualifyContributeSection = styled('div')`
    margin-bottom: ${size.large};
    width: ${HOW_TO_QUALIFY_CONTRIBUTE_SECTION_WIDTH};
    @media ${screenSize.upToMedium} {
        margin-bottom: ${size.mediumLarge};
        width: 100%;
    }
`;

const HowToQualifyGrid = styled('div')`
    display: grid;
    gap: ${size.mediumLarge};
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    @media ${screenSize.upToLarge} {
        gap: ${size.default};
        grid-template-columns: repeat(2, minmax(0, 1fr));
        grid-template-rows: repeat(3, 1fr);
    }
`;

const HowToQualifyCardContainer = styled('div')`
    background-color: ${({ theme }) => theme.colorMap.greyDarkThree};
    border-radius: ${size.xsmall};
    padding: ${HOW_TO_QUALIFY_CARD_CONTAINER_PADDING};
    @media ${screenSize.upToLarge} {
        padding: ${size.mediumLarge};
    }
`;

const HowToQualifyCardTitle = styled(H5)`
    margin: ${size.xsmall} 0;
    word-wrap: break-word;
    @media ${screenSize.upToLarge} {
        margin: ${size.default} 0 ${HOW_TO_QUALIFY_CARD_TITLE_BOTTOM_MARGIN} 0;
    }
`;

const HowToQualifyIconContainer = styled('div')`
    display: flex;
    height: ${size.xlarge};
    @media ${screenSize.upToLarge} {
        height: ${size.large};
    }
`;

const HowToQualifyIcon = styled('img')`
    align-self: center;
    max-height: 100%;
`;

const HowToQualifyCardDescription = styled(Description)`
    line-height: ${lineHeight.default};
    @media ${screenSize.upToMedium} {
        font-size: ${fontSize.tiny};
        line-height: ${lineHeight.tiny};
    }
`;

const HowToQualifyCard = ({ icon, title, description }) => (
    <HowToQualifyCardContainer>
        <HowToQualifyIconContainer>{icon}</HowToQualifyIconContainer>
        <HowToQualifyCardTitle>{title}</HowToQualifyCardTitle>
        <HowToQualifyCardDescription collapse>
            {description}
        </HowToQualifyCardDescription>
    </HowToQualifyCardContainer>
);

const Line = styled('hr')`
    border-color: ${({ theme }) => theme.colorMap.greyDarkOne};
    margin-bottom: ${LINE_BOTTOM_MARGIN};
    @media ${screenSize.upToMedium} {
        margin-bottom: ${size.large};
    }
`;

const GreenBulletedListWithGreyText = styled(GreenBulletedList)`
    grid-area: bullets;
    margin: ${size.default} 0 0;
    max-width: ${OTHER_DETAILS_AND_REQUIREMENTS_LIST_MAX_WIDTH};
    li {
        margin-bottom: ${size.xsmall};
    }
`;

const OtherDetailsAndRequirementsContainer = styled('div')`
    display: grid;
    grid-template-areas:
        'image text'
        'image bullets';
    grid-template-columns: ${OTHER_DETAILS_AND_REQUIREMENTS_IMAGE_SIZE} auto;
    grid-template-rows: auto auto;
    margin-bottom: ${size.xlarge};
    @media ${screenSize.upToMedium} {
        grid-template-areas:
            'image text'
            'bullets bullets';
        margin-bottom: ${size.large};
    }
`;

const OtherDetailsAndRequirementsTitle = styled(H5)`
    @media ${screenSize.upToMedium} {
        margin-bottom: ${size.tiny};
    }
`;

const OtherDetailsAndRequirementsDescription = styled(Description)`
    max-width: ${OTHER_DETAILS_AND_REQUIREMENTS_DESCRIPTION_MAX_WIDTH};
`;

const OtherDetailsAndRequirementsImageContainer = styled('div')`
    align-items: start;
    display: flex;
    grid-area: image;
    justify-content: center;
`;

const OtherDetailsAndRequirementsImage = styled('img')`
    width: ${OTHER_DETAILS_AND_REQUIREMENTS_IMAGE_WIDTH};
`;

const OtherDetailsAndRequirementsBulletText = styled(Description)`
    margin-bottom: 0;
`;

const OtherDetailsAndRequirementsBullets = () => (
    <GreenBulletedListWithGreyText
        BulletText={OtherDetailsAndRequirementsBulletText}
        children={[
            'MongoDB Champions must (re)qualify every year, based on their contribution to the community',
            'Champions program cohorts are intentionally limited to small, functional groups',
            'Commitment of at least one full year',
        ]}
    />
);

const OtherDetailsAndRequirementsTextSection = styled('div')`
    grid-area: text;
`;

const OtherDetailsAndRequirements = () => (
    <OtherDetailsAndRequirementsContainer>
        <OtherDetailsAndRequirementsImageContainer>
            <OtherDetailsAndRequirementsImage
                src={PaperAndPencilImage}
                alt="Paper with a diagram drawn on it with a pencil next to it"
            />
        </OtherDetailsAndRequirementsImageContainer>
        <OtherDetailsAndRequirementsTextSection>
            <OtherDetailsAndRequirementsTitle>
                Other Details &amp; Requirements
            </OtherDetailsAndRequirementsTitle>
            <OtherDetailsAndRequirementsDescription collapse>
                We expect members to participate actively, collaborate closely,
                and work towards tangible outcomes together.
            </OtherDetailsAndRequirementsDescription>
        </OtherDetailsAndRequirementsTextSection>
        <OtherDetailsAndRequirementsBullets />
    </OtherDetailsAndRequirementsContainer>
);

const MeetTheChampionsContainer = styled('div')`
    background-color: ${({ theme }) => theme.colorMap.greyDarkThree};
    margin: ${size.xlarge} -${size.xxlarge};
    padding: ${size.xlarge} ${size.xxlarge};
    @media ${screenSize.upToLarge} {
        margin: ${size.large} -${size.default};
        padding: ${size.large} ${size.default};
    }
`;

const ChampionsContainer = styled('div')`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    row-gap: ${size.default};
    @media ${screenSize.upToLarge} {
        row-gap: ${size.xsmall};
    } ;
`;

const ChampionItemContainer = styled('div')`
    align-items: center;
    display: flex;
    flex-direction: column;
    padding: ${size.default};
    text-align: center;
    width: ${CHAMPION_ITEM_CONTAINER_WIDTH};
    @media ${screenSize.upToMedium} {
        padding: ${size.default} 0;
        width: ${CHAMPION_ITEM_CONTAINER_MOBILE_WIDTH};
    }
`;

const LocationContainer = styled('div')`
    display: flex;
    justify-content: center;
    margin-top: ${size.tiny};
`;

const PinLocationImage = styled('img')`
    margin-right: ${size.tiny};
`;

const LocationText = styled(P4)`
    color: ${({ theme }) => theme.colorMap.greyLightTwo};
`;

const ChampionLocation = ({ location }) => (
    <LocationContainer>
        <PinLocationImage src={PinLocationIcon} />
        <LocationText collapse>{location}</LocationText>
    </LocationContainer>
);

const ChampionTitleText = styled(P3)`
    color: ${({ theme }) => theme.colorMap.greyLightTwo};
`;

const ChampionProfilePicture = styled(AuthorImage)`
    margin-bottom: ${size.default};
    div {
        background-size: cover;
    }
`;

const ChampionItem = ({ imageUrl, location, name, title }) => (
    <ChampionItemContainer>
        <ChampionProfilePicture
            defaultImage={ChampionPlaceholderImage}
            gradientOffset={CHAMPION_PROFILE_PICTURE_GRADIENT_OFFSET}
            hideOnMobile={false}
            image={imageUrl}
            key={name}
            height={CHAMPION_PROFILE_PICTURE_SIZE}
            width={CHAMPION_PROFILE_PICTURE_SIZE}
        />
        <H6 collapse>{name}</H6>
        <ChampionTitleText collapse>{title}</ChampionTitleText>
        <ChampionLocation location={location} />
    </ChampionItemContainer>
);

const communityChampions = graphql`
    query CommunityChampions {
        allStrapiCommunityChampions {
            nodes {
                id
                firstName
                middleName
                lastName
                location
                title
                image {
                    url
                }
            }
        }
    }
`;

const ChampionList = () => {
    const data = useStaticQuery(communityChampions);
    const champions = dlv(
        data,
        ['allStrapiCommunityChampions', 'nodes'],
        []
    ).map(champion => {
        champion.fullName = [
            champion.firstName,
            champion.middleName,
            champion.lastName,
        ].join(' ');
        return champion;
    });
    return (
        <ChampionsContainer>
            {champions
                .sort((a, b) => a.fullName.localeCompare(b.fullName))
                .map(({ fullName, id, image, location, title }) => {
                    return (
                        <ChampionItem
                            imageUrl={image ? image.url : null}
                            key={id}
                            location={location}
                            name={fullName}
                            title={title}
                        />
                    );
                })}
        </ChampionsContainer>
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
                <WhatItMeansToBeAChampionContainer>
                    <Title>What it Means to be a Champion</Title>
                    <WhatItMeansToBeAChampionGrid>
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
                    </WhatItMeansToBeAChampionGrid>
                </WhatItMeansToBeAChampionContainer>
                <LeadByExampleContainer>
                    <LeadByExampleTitle>
                        Champions Lead by Example
                    </LeadByExampleTitle>
                    <LeadByExampleGrid>
                        <LeadByExampleItem
                            icon={
                                <img
                                    src={UpholdCommunityCodeOfConductIcon}
                                    alt="Shield with a heart in the middle"
                                />
                            }
                            title="Uphold the Community Code of Conduct"
                            description={
                                <GreyP2 collapse>
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
                            icon={
                                <img
                                    src={BeGuidingLightIcon}
                                    alt="Shooting star"
                                />
                            }
                            title="Be a Guiding Light"
                            description={
                                <GreyP2 collapse>
                                    Help new members become acclimated to the
                                    norms of the community by helping them learn
                                    how to ask questions, how to contribute, how
                                    to participate in community events, and how
                                    to upskill their knowledge.
                                </GreyP2>
                            }
                        />
                        <LeadByExampleItem
                            icon={
                                <img
                                    src={ProtectAndFosterCommunityCultureIcon}
                                    alt="Shield with a lightning bolt"
                                />
                            }
                            title="Protect and Foster Community Culture"
                            description={
                                <GreyP2 collapse>
                                    Champions protect the culture of the
                                    community and are the first to welcome new
                                    members.
                                </GreyP2>
                            }
                        />
                    </LeadByExampleGrid>
                </LeadByExampleContainer>
                <BenefitsAndRewardsContainer>
                    <Title>Benefits &amp; Rewards</Title>
                    <BenefitsAndRewardsGrid>
                        <BenefitsAndRewardsItem
                            icon={
                                <img
                                    src={BuildingBlocksImage}
                                    alt="3d isometric building blocks"
                                />
                            }
                            title="Product"
                            bullets={[
                                'Participation in product beta testing, as available',
                                'Product feedback sessions',
                                'Product Early Access pilot',
                                'Access to MongoDB product teams and executives',
                            ]}
                        />
                        <BenefitsAndRewardsItem
                            icon={
                                <img
                                    src={PeopleInCircleImage}
                                    alt="People in a circle"
                                />
                            }
                            title="Community"
                            bullets={[
                                'Access to private MongoDB Champion sub-forum on MongoDB Developer Forums',
                                'Branded badges and ranks on Developer forums and social media',
                                'Opportunities to mentor MongoDB newcomers',
                            ]}
                        />
                        <BenefitsAndRewardsItem
                            icon={
                                <img
                                    src={EventAdmissionTicketImage}
                                    alt="Event admission ticket"
                                />
                            }
                            title="Events &amp; Exposure"
                            bullets={[
                                'Full (free) access to MongoDB events',
                                'Expense reimbursement for travel and accommodation for events, VIP seats, and VIP events',
                                'Featured profile on MongoDB DevHub',
                                'SWAG',
                            ]}
                        />
                        <BenefitsAndRewardsItem
                            icon={
                                <img
                                    src={UpwardsArrowImage}
                                    alt="Arrow pointing upwards"
                                />
                            }
                            title="Growth"
                            bullets={[
                                'Speaker training',
                                'Social media training',
                                'Public speaking and blog writing coaching',
                                'Personal branding strategies',
                                'Free MongoDB certification and University On Demand',
                            ]}
                        />
                    </BenefitsAndRewardsGrid>
                </BenefitsAndRewardsContainer>
                <HowToQualifyContainer>
                    <Title>How to Qualify</Title>
                    <HowToQualifyContributeSection>
                        <HowToQualifyContributeTitle>
                            Contribute
                        </HowToQualifyContributeTitle>
                        <Description collapse>
                            Our goal is to recognize our most invested community
                            members for contributing in the ways that are the
                            most meaningful to them.
                        </Description>
                    </HowToQualifyContributeSection>
                    <HowToQualifyGrid>
                        <HowToQualifyCard
                            icon={
                                <HowToQualifyIcon
                                    src={BrowserWindowWithStarImage}
                                    alt="Browser window with a star"
                                />
                            }
                            title="Create"
                            description="Create content such as blog posts, podcasts, videos, and more"
                        />
                        <HowToQualifyCard
                            icon={
                                <HowToQualifyIcon
                                    src={MicrophoneImage}
                                    alt="Microphone"
                                />
                            }
                            title="Speak"
                            description="Speak at MongoDB or related events"
                        />
                        <HowToQualifyCard
                            icon={
                                <HowToQualifyIcon
                                    src={ChatBubblesImage}
                                    alt="Two chat message bubbles"
                                />
                            }
                            title="Participate"
                            description="Participate in the community forums"
                        />
                        <HowToQualifyCard
                            icon={
                                <HowToQualifyIcon
                                    src={GroupImage}
                                    alt="Group leader with followers behind them"
                                />
                            }
                            title="Lead"
                            description="Lead user groups"
                        />
                        <HowToQualifyCard
                            icon={
                                <HowToQualifyIcon
                                    src={RocketShipImage}
                                    alt="Rocket ship taking off"
                                />
                            }
                            title="Test"
                            description="Provide user feedback and participate in beta testing programs"
                        />
                        <HowToQualifyCard
                            icon={
                                <HowToQualifyIcon
                                    src={StackSquaresImage}
                                    alt="Stack squares"
                                />
                            }
                            title="And more!"
                        />
                    </HowToQualifyGrid>
                </HowToQualifyContainer>
                <Line />
                <OtherDetailsAndRequirements />
                <MeetTheChampionsContainer>
                    <Title>Meet the Champions</Title>
                    <ChampionList />
                </MeetTheChampionsContainer>
            </ContentContainer>
        </Layout>
    );
};

export default CommunityChampions;
