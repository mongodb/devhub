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
import { H1, H4, H6, P, P2 } from '~components/dev-hub/text';
import ProfileImage from '~components/dev-hub/profile-image';
import Link from '~components/dev-hub/link';
import SEO from '~components/dev-hub/SEO';
import ChampionPlaceholderImage from '~images/community-champions/champion-placeholder.svg';
import QuotationMarksIcon from '~images/community-champions/quotation-marks.svg';
import LocationPinIcon from '~images/community-champions/location-pin-white.svg';
import BriefcaseIcon from '~images/community-champions/briefcase.svg';
import SpeechBubbleIcon from '~images/community-champions/speech-bubble.svg';
import LinkedinIcon from '~components/dev-hub/icons/linkedin';
import FacebookIcon from '~components/dev-hub/icons/facebook-icon';
import TwitterIcon from '~components/dev-hub/icons/twitter-icon';
import GithubIcon from '~components/dev-hub/icons/github';
import TwitchIcon from '~components/dev-hub/icons/twitch';
import YoutubeIcon from '~components/dev-hub/icons/youtube';
import useMedia from '~hooks/use-media';
import { useSiteMetadata } from '~hooks/use-site-metadata';

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
const LINK_CONTAINER_WIDTH = '256px';
const LINK_ROW_GAP = '4px';
const LINKS_GRID_COLUMN_GAP = '86px';
const LINKS_SECTION_MOBILE_BOTTOM_MARGIN = '48px';
const SOCIAL_LINKS_GRID_COLUMN_GAP = '48px';
const SOCIAL_LINK_MAX_WIDTH = '86px';

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
            props.image
                ? `background-color: ${props.theme.colorMap.devWhite};`
                : ''}
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
    @media ${screenSize.upToSmallDesktop} {
        grid-template-areas:
            'image'
            'text'
            'quote';
        grid-template-columns: auto;
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
    font-size: ${fontSize.medium};
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

const IconWithText = ({ alt, gridArea, src, text }) => (
    <IconWithTextContainer gridArea={gridArea}>
        <Icon src={src} alt={alt} />
        <P2 collapse>{text}</P2>
    </IconWithTextContainer>
);

const Occupation = ({ occupation }) => (
    <IconWithText
        gridArea="occupation"
        src={BriefcaseIcon}
        alt="Briefcase"
        text={occupation}
    />
);

const Location = ({ location }) => (
    <IconWithText
        gridArea="location"
        src={LocationPinIcon}
        alt="Location pin"
        text={location}
    />
);

const LanguagesTitle = styled(H6)`
    color: ${({ theme }) => theme.colorMap.greyLightTwo};
    font-size: ${fontSize.tiny};
    font-weight: 500;
    letter-spacing: 0.1em;
    line-height: ${lineHeight.tiny};
    text-transform: uppercase;
    @media ${screenSize.upToSmallDesktop} {
        display: none;
    }
`;

const LanguagesContainer = styled('div')`
    grid-area: languages;
`;

const Languages = ({ languages }) => (
    <LanguagesContainer>
        <LanguagesTitle collapse>Languages</LanguagesTitle>
        <IconWithText
            src={SpeechBubbleIcon}
            alt="Speech bubble"
            text={languages}
        />
    </LanguagesContainer>
);

const InfoSection = ({ location, occupation, languages }) => (
    <InfoGrid>
        <Occupation occupation={occupation} />
        <Location location={location} />
        <Languages languages={languages} />
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

const LinksTitle = styled(H6)`
    color: ${({ theme }) => theme.colorMap.greyLightThree};
    font-weight: bold;
    letter-spacing: 0.1em;
    margin-bottom: ${size.xsmall};
    text-transform: uppercase;
    @media ${screenSize.upToMedium} {
        font-size: ${fontSize.small};
        line-height: ${lineHeight.small};
    }
`;

const BlogsAndPublicationsLinksContainer = styled('div')`
    display: flex;
    flex-direction: column;
    row-gap: ${LINK_ROW_GAP};
    width: ${LINK_CONTAINER_WIDTH};
    @media ${screenSize.upToSmallDesktop} {
        width: 100%;
    }
`;

const BlogsAndPublicationsLink = styled(Link)`
    font-size: ${fontSize.small};
    line-height: ${lineHeight.small};
    max-width: 100%;
    width: max-content;
    @media ${screenSize.upToSmallDesktop} {
        width: 100%;
    }
`;

const BlogsAndPublications = ({ blogsAndPublications }) => (
    <div>
        <LinksTitle collapse>Blogs &amp; Publications</LinksTitle>
        <BlogsAndPublicationsLinksContainer>
            {blogsAndPublications.map(({ id, title, link }) => (
                <BlogsAndPublicationsLink key={id} href={link}>
                    {title}
                </BlogsAndPublicationsLink>
            ))}
        </BlogsAndPublicationsLinksContainer>
    </div>
);

const LinksGrid = styled('div')`
    column-gap: ${LINKS_GRID_COLUMN_GAP};
    display: grid;
    grid-template-columns: repeat(2, max-content);
    @media ${screenSize.upToSmallDesktop} {
        grid-template-columns: auto;
        row-gap: ${size.large};
    }
`;

const LinksSectionContainer = styled('div')`
    margin-bottom: ${size.xlarge};
    @media ${screenSize.upToSmallDesktop} {
        margin-bottom: ${LINKS_SECTION_MOBILE_BOTTOM_MARGIN};
    }
`;

const FollowTitle = styled(H4)`
    margin-bottom: ${size.mediumLarge};
    @media ${screenSize.upToSmallDesktop} {
        margin-bottom: ${size.default};
    }
    @media ${screenSize.upToMedium} {
        font-size: ${fontSize.medium};
        line-height: 30px;
    }
`;

const LinksSection = ({ blogsAndPublications, firstName, socials }) => (
    <LinksSectionContainer>
        <FollowTitle>Follow {firstName}</FollowTitle>
        <LinksGrid>
            <BlogsAndPublications blogsAndPublications={blogsAndPublications} />
            <Socials socials={socials} />
        </LinksGrid>
    </LinksSectionContainer>
);

const Socials = ({ socials }) => {
    const links = socials
        ? [
              {
                  type: 'LinkedIn',
                  url: socials.linkedinUrl,
                  Icon: LinkedinIcon,
              },
              {
                  type: 'GitHub',
                  url: socials.githubUrl,
                  Icon: GithubIcon,
              },
              {
                  type: 'Twitch',
                  url: socials.twitchUrl,
                  Icon: TwitchIcon,
              },
              {
                  type: 'YouTube',
                  url: socials.youtubeUrl,
                  Icon: YoutubeIcon,
              },
              {
                  type: 'Facebook',
                  url: socials.facebookUrl,
                  Icon: FacebookIcon,
              },
              {
                  type: 'Twitter',
                  url: socials.twitterUrl,
                  Icon: TwitterIcon,
              },
          ]
        : [];
    return (
        <div>
            <LinksTitle collapse>Social</LinksTitle>
            <SocialLinksContainer>
                {links.map(
                    ({ type, url, Icon }) =>
                        url && (
                            <SocialLink
                                key={type}
                                icon={
                                    <Icon
                                        height={size.default}
                                        width={size.default}
                                    />
                                }
                                type={type}
                                link={url}
                            />
                        )
                )}
            </SocialLinksContainer>
        </div>
    );
};

const SocialLinkItemContainer = styled(Link)`
    align-items: center;
    column-gap: ${size.xsmall};
    display: grid;
    grid-template-columns: ${size.default} auto;
    text-decoration: none;
    path {
        fill: ${({ theme }) => theme.colorMap.devWhite};
    }
    &:hover {
        path {
            fill: ${({ theme }) => theme.colorMap.darkGreen};
        }
    }
`;

const SocialLinksContainer = styled('div')`
    column-gap: ${SOCIAL_LINKS_GRID_COLUMN_GAP};
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: repeat(2, max-content);
    grid-template-rows: repeat(3, auto);
    row-gap: ${size.xsmall};
    @media ${screenSize.upToSmallDesktop} {
        column-gap: ${size.mediumLarge};
        grid-auto-flow: row;
        grid-template-columns: repeat(3, max-content);
        grid-template-rows: repeat(2, auto);
    }
    @media ${screenSize.upToSmall} {
        grid-template-columns: repeat(
            auto-fill,
            minmax(${SOCIAL_LINK_MAX_WIDTH}, 1fr)
        );
        grid-template-rows: none;
    }
`;

const SocialLinkText = styled(P2)`
    @media ${screenSize.upToMedium} {
        font-size: ${fontSize.small};
        line-height: ${lineHeight.small};
    }
`;

const SocialLink = ({ icon, link, type }) => (
    <SocialLinkItemContainer href={link}>
        {icon}
        <SocialLinkText collapse>{type}</SocialLinkText>
    </SocialLinkItemContainer>
);

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
        BlogsAndPublications,
        Socials,
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
    const metadata = useSiteMetadata();
    return (
        <Layout>
            <SEO title={`${fullName} - ${metadata.title}`} />
            <ContentContainer>
                <StyledBreadcrumb>
                    {championProfileBreadcrumbs}
                </StyledBreadcrumb>
                <GridContainer>
                    <ImageContainer>
                        <ChampionImage
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
                        />
                        <Bio>{bio}</Bio>
                        <LinksSection
                            firstName={firstName}
                            blogsAndPublications={BlogsAndPublications}
                            socials={Socials}
                        />
                    </TextContainer>
                </GridContainer>
            </ContentContainer>
        </Layout>
    );
};

export default CommunityChampionProfile;
