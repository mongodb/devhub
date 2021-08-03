import React from 'react';
import styled from '@emotion/styled';
import Breadcrumb from '~components/dev-hub/breadcrumb';
import Layout from '~components/dev-hub/layout';
import {
    fontSize,
    lineHeight,
    screenSize,
    size,
} from '~components/dev-hub/theme';
import { H1, H6, P, P2 } from '~components/dev-hub/text';
import ProfileImage from '~components/dev-hub/profile-image';
import ChampionPlaceholderImage from '~images/community-champions/champion-placeholder.svg';
import QuotationMarksIcon from '~images/community-champions/quotation-marks.svg';
import LocationPinIcon from '~images/community-champions/location-pin-white.svg';
import BriefcaseIcon from '~images/community-champions/briefcase.svg';
import SpeechBubbleIcon from '~images/community-champions/speech-bubble.svg';
import useMedia from '~hooks/use-media';

const BREADCRUMB_BOTTOM_MARGIN = '40px';
const GRID_COLUMN_GAP = '104px';
const CHAMPION_IMAGE_WIDTH = '356px';
const QUOTATION_MARKS_ICON_HEIGHT = '38px';
const IMAGE_CONTAINER_BOTTOM_MARGIN = '40px';
const INFO_GRID_BOTTOM_MARGIN = '48px';
const INFO_GRID_ROW_GAP = '4px';
const TEXT_COLUMN_WIDTH = '248px';
const ICON_MOBILE_WIDTH = '12px';
const NAME_FONT_SIZE = '28px';
const NAME_LINE_HEIGHT = '38px';
const BIO_MOBILE_BOTTOM_MARGIN = '40px';
const PROFILE_PICTURE_GRADIENT_OFFSET = 8;
const PROFILE_PICTURE_SIZE = 348;
const PROFILE_PICTURE_MOBILE_SIZE = 156;

const CHAMPION_PROFILE_BREADCRUMBS_PREFIX = [
    { label: 'Home', target: '/' },
    {
        label: 'MongoDB Community Champions',
        target: '/community-champions',
    },
];

const ContentContainer = styled('div')`
    padding: ${size.default} ${size.xxlarge} ${size.xlarge};
    @media ${screenSize.upToSmallDesktop} {
        padding: ${size.mediumLarge} ${size.default} ${size.xlarge};
    }
`;

const ChampionImage = styled(ProfileImage)`
    div {
        ${props =>
            props.default
                ? ''
                : `background-color: ${props.theme.colorMap.devWhite};`}
        background-size: cover;
    }
`;

const GridContainer = styled('div')`
    column-gap: ${GRID_COLUMN_GAP};
    display: grid;
    grid-template-areas:
        'image text'
        'quote text';
    grid-template-columns: ${CHAMPION_IMAGE_WIDTH} auto;
    grid-template-rows: auto auto;
    @media ${screenSize.upToSmallDesktop} {
        grid-template-areas:
            'image'
            'text'
            'quote';
        grid-template-columns: auto;
        grid-template-rows: auto;
    }
`;

const StyledBreadcrumb = styled(Breadcrumb)`
    line-height: 1;
    margin-bottom: ${BREADCRUMB_BOTTOM_MARGIN};
    > a {
        font-size: ${fontSize.xsmall};
    }
    @media ${screenSize.upToSmallDesktop} {
        margin-bottom: ${size.large};
    }
`;

const Quote = styled(P)`
    background: ${({ theme }) => theme.gradientMap.magentaSalmonSherbet};
    background-clip: text;
    font-family: 'Fira Mono';
    font-size: 20px;
    font-weight: 500;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    @media ${screenSize.upToSmallDesktop} {
        font-size: ${fontSize.small};
        line-height: ${lineHeight.small};
    }
`;

const QuoteContainer = styled('div')`
    align-items: center;
    display: flex;
    flex-direction: column;
    grid-area: quote;
    padding: 0 ${size.xsmall};
    text-align: center;
`;

const QuoteIconContainer = styled('div')`
    height: ${QUOTATION_MARKS_ICON_HEIGHT};
    margin-bottom: ${size.mediumLarge};
`;

const QuoteIcon = styled('img')`
    max-height: 100%;
`;

const QuoteSection = ({ quote }) => (
    <QuoteContainer>
        <QuoteIconContainer>
            <QuoteIcon src={QuotationMarksIcon} alt="Opening quotation marks" />
        </QuoteIconContainer>
        <Quote collapse>{quote}</Quote>
    </QuoteContainer>
);

const TextContainer = styled('div')`
    grid-area: text;
`;

const ImageContainer = styled('div')`
    display: flex;
    grid-area: image;
    justify-content: center;
    margin-bottom: ${IMAGE_CONTAINER_BOTTOM_MARGIN};
    @media ${screenSize.upToSmallDesktop} {
        margin-bottom: ${size.default};
    }
`;

const InfoGrid = styled('div')`
    column-gap: ${size.large};
    display: grid;
    grid-template-areas:
        'occupation languages'
        'location languages';
    grid-template-columns: auto auto;
    grid-template-rows: auto auto;
    margin-bottom: ${INFO_GRID_BOTTOM_MARGIN};
    row-gap: ${INFO_GRID_ROW_GAP};
    @media ${screenSize.upToSmallDesktop} {
        align-items: center;
        display: flex;
        flex-direction: column;
        margin-bottom: ${size.large};
    }
`;

const IconWithTextContainer = styled('div')`
    align-items: start;
    column-gap: ${size.xsmall};
    display: grid;
    ${({ gridArea }) => (gridArea ? `grid-area: ${gridArea}` : '')};
    grid-template-columns: ${size.default} ${TEXT_COLUMN_WIDTH};
    @media ${screenSize.upToSmallDesktop} {
        grid-template-columns: ${size.default} auto;
        text-align: center;
    }
    @media ${screenSize.upToMedium} {
        grid-template-columns: ${ICON_MOBILE_WIDTH} auto;
    }
`;

const Icon = styled('img')`
    padding-top: ${size.tiny};
    width: 100%;
`;

const IconWithText = ({ gridArea, icon, iconAltText, text }) => (
    <IconWithTextContainer gridArea={gridArea}>
        <Icon src={icon} alt={iconAltText} />
        <P2 collapse>{text}</P2>
    </IconWithTextContainer>
);

const Occupation = ({ occupation }) => (
    <IconWithText
        gridArea="occupation"
        icon={BriefcaseIcon}
        iconAltText="Briefcase"
        text={occupation}
    />
);

const Location = ({ location }) => (
    <IconWithText
        gridArea="location"
        icon={LocationPinIcon}
        iconAltText="Location pin"
        text={location}
    />
);

const LanguagesTitle = styled(H6)`
    color: ${({ theme }) => theme.colorMap.greyLightTwo};
    font-size: ${fontSize.tiny};
    line-height: ${lineHeight.tiny};
`;

const LanguagesContainer = styled('div')`
    grid-area: languages;
`;

const Languages = ({ languages, showTitle = true }) => (
    <LanguagesContainer>
        {showTitle && <LanguagesTitle collapse>LANGUAGES</LanguagesTitle>}
        <IconWithText
            icon={SpeechBubbleIcon}
            iconAltText="Speech bubble"
            text={languages}
        />
    </LanguagesContainer>
);

const InfoSection = ({
    location,
    occupation,
    languages,
    showLanguagesTitle = true,
}) => (
    <InfoGrid>
        <Occupation occupation={occupation} />
        <Location location={location} />
        <Languages languages={languages} showTitle={showLanguagesTitle} />
    </InfoGrid>
);

const Name = styled(H1)`
    margin-bottom: ${size.mediumLarge};
    @media ${screenSize.upToSmallDesktop} {
        font-size: ${NAME_FONT_SIZE};
        line-height: ${NAME_LINE_HEIGHT};
        margin-bottom: ${size.xsmall};
        text-align: center;
    }
`;

const Bio = styled(P)`
    margin-bottom: ${size.xlarge};
    @media ${screenSize.upToSmallDesktop} {
        margin-bottom: ${BIO_MOBILE_BOTTOM_MARGIN};
    }
`;

const CommunityChampionProfile = props => {
    const {
        pageContext: { champion, slug },
    } = props;
    const {
        firstName,
        middleName,
        lastName,
        quote,
        title,
        location,
        languagesSpoken,
        bio,
    } = champion;
    const fullName = [firstName, middleName, lastName].join(' ');
    const championProfileBreadcrumbs = CHAMPION_PROFILE_BREADCRUMBS_PREFIX.concat(
        [
            {
                label: `${fullName}`,
                target: slug,
            },
        ]
    );
    const imageUrl = champion.image ? champion.image.url : null;
    const useMobileLayout = useMedia(screenSize.upToSmallDesktop);
    return (
        <Layout>
            <ContentContainer>
                <StyledBreadcrumb>
                    {championProfileBreadcrumbs}
                </StyledBreadcrumb>
                <GridContainer>
                    <ImageContainer>
                        <ChampionImage
                            default={imageUrl == null}
                            defaultImage={ChampionPlaceholderImage}
                            gradientOffset={PROFILE_PICTURE_GRADIENT_OFFSET}
                            hideOnMobile={false}
                            image={imageUrl}
                            height={
                                useMobileLayout
                                    ? PROFILE_PICTURE_MOBILE_SIZE
                                    : PROFILE_PICTURE_SIZE
                            }
                            width={
                                useMobileLayout
                                    ? PROFILE_PICTURE_MOBILE_SIZE
                                    : PROFILE_PICTURE_SIZE
                            }
                        />
                    </ImageContainer>
                    <QuoteSection quote={quote} />
                    <TextContainer>
                        <Name>{fullName}</Name>
                        <InfoSection
                            occupation={title}
                            location={location}
                            languages={languagesSpoken}
                            showLanguagesTitle={!useMobileLayout}
                        />
                        <Bio>{bio}</Bio>
                    </TextContainer>
                </GridContainer>
            </ContentContainer>
        </Layout>
    );
};

export default CommunityChampionProfile;
