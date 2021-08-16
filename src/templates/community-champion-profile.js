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
import { H1, H4, P } from '~components/dev-hub/text';
import ProfileImage from '~components/dev-hub/profile-image';
import Link from '~components/dev-hub/link';
import SEO from '~components/dev-hub/SEO';
import BioHeader from '~components/pages/community-champions/profile/bio-header';
import LinksSection from '~components/pages/community-champions/profile/links-section';
import ChampionPlaceholderImage from '~images/community-champions/champion-placeholder.svg';
import QuotationMarksIcon from '~images/community-champions/quotation-marks.svg';
import DBAAssociateBadge from '~images/community-champions/dba-associate-badge.svg';
import DeveloperAssociateBadge from '~images/community-champions/developer-associate-badge.svg';
import useMedia from '~hooks/use-media';
import { useSiteMetadata } from '~hooks/use-site-metadata';
import { removePathPrefixFromUrl } from '~utils/remove-path-prefix-from-url';

const BREADCRUMB_BOTTOM_MARGIN = '40px';
const GRID_COLUMN_GAP = '104px';
const CHAMPION_IMAGE_WIDTH = '356px';
const QUOTATION_MARKS_ICON_HEIGHT = '38px';
const IMAGE_CONTAINER_BOTTOM_MARGIN = '40px';
const NAME_FONT_SIZE = '28px';
const NAME_LINE_HEIGHT = '38px';
const BIO_MOBILE_BOTTOM_MARGIN = '40px';
const PROFILE_PICTURE_GRADIENT_OFFSET = 8;
const PROFILE_PICTURE_SIZE = 348;
const PROFILE_PICTURE_MOBILE_SIZE = 156;
const CERTIFICATE_BADGE_WIDTH = '129';
const CERTIFICATE_BADGE_HEIGHT = '132';
const CERTIFICATE_CONTAINER_WIDTH = '162px';

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
    grid-template-rows: max-content auto;
    @media ${screenSize.upToSmallDesktop} {
        grid-template-areas:
            'image'
            'text'
            'quote';
        grid-template-columns: auto;
        grid-template-rows: repeat(3, auto);
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

const Title = styled(H4)`
    margin-bottom: ${size.mediumLarge};
    @media ${screenSize.upToSmallDesktop} {
        margin-bottom: ${size.default};
    }
    @media ${screenSize.upToMedium} {
        font-size: ${fontSize.medium};
        line-height: 30px;
    }
`;

const CertificationsContainer = styled('div')`
    column-gap: ${size.xsmall};
    display: grid;
    grid-template-columns: repeat(auto-fill, ${CERTIFICATE_CONTAINER_WIDTH});
    row-gap: ${size.tiny};
    @media ${screenSize.upToSmallDesktop} {
        column-gap: ${size.default};
        margin-bottom: ${size.xlarge};
    }
`;

const CertificationLink = styled(Link)`
    border-radius: ${size.xsmall};
    padding: ${size.default};
    &:hover,
    &:focus {
        background-color: ${({ theme }) => theme.colorMap.greyDarkThree};
        color: inherit;
        cursor: pointer;
    }
`;

const CertificationsSection = ({ certifications }) => {
    const badges = [
        {
            alt: 'DBA Associate badge',
            src: DBAAssociateBadge,
            url: certifications.dbaAssociateUrl,
        },
        {
            alt: 'Developer Associate badge',
            src: DeveloperAssociateBadge,
            url: certifications.developerAssociateUrl,
        },
    ];
    return (
        <div>
            <Title>MongoDB Certifications</Title>
            <CertificationsContainer>
                {badges.map(
                    ({ alt, src, url }) =>
                        url && (
                            <CertificationLink
                                key={alt}
                                href={url}
                                target="_blank"
                            >
                                <img
                                    alt={alt}
                                    src={src}
                                    width={CERTIFICATE_BADGE_WIDTH}
                                    height={CERTIFICATE_BADGE_HEIGHT}
                                />
                            </CertificationLink>
                        )
                )}
            </CertificationsContainer>
        </div>
    );
};

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
        Certifications,
    } = champion;
    const fullName = [firstName, middleName, lastName].join(' ');
    const championProfileBreadcrumbs =
        CHAMPION_PROFILE_BREADCRUMBS_PREFIX.concat([
            {
                label: `${fullName}`,
                target: slug,
            },
        ]);
    const imageUrl = champion.image ? champion.image.url : null;
    const useMobileLayout = useMedia(screenSize.upToSmallDesktop);
    const { siteUrl } = useSiteMetadata();
    const fullUrl = removePathPrefixFromUrl(`${siteUrl}${slug}`);
    const seoTitle = `${fullName} - MongoDB Community Champion`;
    return (
        <Layout>
            <SEO
                title={seoTitle}
                image={imageUrl}
                metaDescription={bio}
                ogDescription={bio}
                ogTitle={seoTitle}
                ogUrl={fullUrl}
                twitter={{
                    description: bio,
                    image: imageUrl,
                    title: seoTitle,
                    creator: '@mongodb',
                }}
            />
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
                    {quote && <QuoteSection quote={quote} />}
                    <TextContainer>
                        <Name>{fullName}</Name>
                        <BioHeader
                            occupation={title}
                            location={location}
                            languages={languagesSpoken}
                        />
                        <Bio>{bio}</Bio>
                        {(BlogsAndPublications || Socials) && (
                            <div>
                                <Title>Follow {firstName}</Title>
                                <LinksSection
                                    blogsAndPublications={BlogsAndPublications}
                                    socials={Socials}
                                />
                            </div>
                        )}
                        {Certifications && (
                            <CertificationsSection
                                certifications={Certifications}
                            />
                        )}
                    </TextContainer>
                </GridContainer>
            </ContentContainer>
        </Layout>
    );
};

export default CommunityChampionProfile;
