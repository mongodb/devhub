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
import { H1, P } from '~components/dev-hub/text';
import ProfileImage from '~components/dev-hub/profile-image';
import SEO from '~components/dev-hub/SEO';
import BioHeader from '~components/pages/community-champions/profile/bio-header';
import CertificationsAndAwards from '~components/pages/community-champions/profile/certifications-and-awards';
import LinksSection from '~components/pages/community-champions/profile/links-section';
import ChampionPlaceholderImage from '~images/community-champions/champion-placeholder.svg';
import QuotationMarksIcon from '~images/community-champions/quotation-marks.svg';
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
        ${({ image, theme }) =>
            image ? `background-color: ${theme.colorMap.devWhite};` : ''}
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
    word-break: break-word;
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
        BlogsAndPublications,
        Socials,
        Certifications,
        awards,
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
                            <LinksSection
                                blogsAndPublications={BlogsAndPublications}
                                firstName={firstName}
                                socials={Socials}
                            />
                        )}
                        {(Certifications || awards.length > 0) && (
                            <CertificationsAndAwards
                                certifications={Certifications}
                                awards={awards}
                            />
                        )}
                    </TextContainer>
                </GridContainer>
            </ContentContainer>
        </Layout>
    );
};

export default CommunityChampionProfile;
