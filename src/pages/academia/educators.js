import React from 'react';
import Layout from '../../components/dev-hub/layout';
import { Helmet } from 'react-helmet';
import { useSiteMetadata } from '../../hooks/use-site-metadata';
import { screenSize, size, lineHeight } from '../../components/dev-hub/theme';
import { H2, H3, H4, H5, P } from '../../components/dev-hub/text';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import Button from '../../components/dev-hub/button';
import HeroBanner from '../../components/dev-hub/hero-banner';
import AcademiaSignUpForm from '../../components/dev-hub/academia-sign-up-form';
import Card from '../../components/dev-hub/card';
import HeroBannerImage from '../../images/1x/Academia.svg';
import MediaBlock from '../../components/dev-hub/media-block';
import Modal from '../../components/dev-hub/modal';

const ACADEMIA_BREADCRUMBS = [
    { label: 'Home', target: '/' },
    { label: 'MongoDB for Academia', target: '/academia' },
];
const CUSTOM_BULLET_SIZE = '24px';
const ELIGIBILITY_IMAGE_MAX_WIDTH = '400px';
const MAX_FEATURED_BENEFIT_WIDTH = '300px';
const MAX_SIGN_UP_WIDTH = '600px';
const SECTION_HORIZONTAL_PADDING = '120px';
const SECTION_VERTICAL_PADDING = '60px';

const centerContentOnMobile = css`
    @media ${screenSize.upToLarge} {
        justify-content: center;
        text-align: center;
    }
`;

// Custom counter so we can apply custom styles after disabling list-style
const customOrderedListCounter = css`
    counter-reset: ordered-list-counter;

    li {
        counter-increment: ordered-list-counter;
        :before {
            content: counter(ordered-list-counter);
        }
    }
`;

const gradientBullet = theme => css`
    background: ${theme.gradientMap.magentaSalmonSherbet};
    border-radius: 50%;
    color: white;
    font-size: 12px;
    height: ${CUSTOM_BULLET_SIZE};
    left: calc(-1 * ${CUSTOM_BULLET_SIZE} - 16px);
    line-height: ${CUSTOM_BULLET_SIZE};
    position: absolute;
    text-align: center;
    /* line-height is 32px. (32px - 24px) / 2 gives a 4px veritcal offset to center */
    top: 4px;
    width: ${CUSTOM_BULLET_SIZE};
`;
const reducePaddingOnMobile = css`
    @media ${screenSize.upToLarge} {
        padding: 16px 20px;
    }
`;

/* TODO: Update text styles to give this line height to all P on desktop */
const defaultLineHeight = css`
    line-height: ${lineHeight.default};
`;

const BenefitsLayout = styled('div')`
    display: flex;
    justify-content: space-around;
    margin-top: 89px;
    width: 100%;
    @media ${screenSize.upToLarge} {
        align-items: center;
        justify-content: unset;
        flex-direction: column;
    }
`;

const BodyContent = styled('div')`
    align-items: center;
    display: flex;
    flex-direction: column;
    padding: ${SECTION_VERTICAL_PADDING} ${SECTION_HORIZONTAL_PADDING};
    ${centerContentOnMobile};
    ${reducePaddingOnMobile};
`;

const ButtonWithAdditionalTopMargin = styled(Button)`
    margin-top: ${size.large};
`;

const CustomGradientOrderedList = styled('ol')`
    list-style: none;
    margin-bottom: 0;
    margin-top: 0;
    padding-left: 0;
    position: relative;
    ${customOrderedListCounter};

    li {
        margin: ${CUSTOM_BULLET_SIZE} 0 ${CUSTOM_BULLET_SIZE} 36px;
        position: relative;
        :before {
            ${({ theme }) => gradientBullet(theme)};
        }
    }
`;

const EligibilitySection = styled('div')`
    background-color: ${({ theme }) => theme.colorMap.devBlack};
    padding: ${SECTION_VERTICAL_PADDING} ${SECTION_HORIZONTAL_PADDING};
    ${centerContentOnMobile};
    ${reducePaddingOnMobile};
`;

const FeaturedBenefitMaxWidthContainer = styled('div')`
    max-width: ${MAX_FEATURED_BENEFIT_WIDTH};
`;

const GreenBullet = styled('ul')`
    color: ${({ theme }) => theme.colorMap.darkGreen};
    list-style-type: circle;
`;

const Header = styled('header')`
    padding-top: ${size.large};
    @media ${screenSize.upToLarge} {
        margin-bottom: ${size.large};
    }
`;

const ReducedMarginBanner = styled(HeroBanner)`
    margin: 0 ${size.medium};
    @media ${screenSize.upToLarge} {
        margin: 0;
    }
`;

const StyledAcademiaSignUpForm = styled(AcademiaSignUpForm)`
    margin-top: ${size.large};
`;

const WhiteBulletText = styled(P)`
    color: white;
    margin-bottom: 0;
`;

const FeaturedBenefit = ({ bullets, image, title }) => (
    <FeaturedBenefitMaxWidthContainer>
        <img alt="" src={image} />
        <H5>{title}</H5>
        <GreenBulletedList>{bullets}</GreenBulletedList>
    </FeaturedBenefitMaxWidthContainer>
);

const GreenBulletedList = ({ children }) => (
    <GreenBullet>
        {children.map(content => (
            <li key={content}>
                <WhiteBulletText>{content}</WhiteBulletText>
            </li>
        ))}
    </GreenBullet>
);

const HowToJoin = () => (
    <EligibilitySection>
        <MediaBlock
            mediaComponent={
                <Card
                    image={HeroBannerImage}
                    maxWidth={ELIGIBILITY_IMAGE_MAX_WIDTH}
                />
            }
            mediaWidth={ELIGIBILITY_IMAGE_MAX_WIDTH}
            reverse
        >
            <H4>How to join MongoDB for Academia</H4>
            <P>You're eligible for this program if you teach:</P>
            <GreenBulletedList
                children={[
                    'Higher Education, College and University programs',
                    'Bootcamps and Online Courses',
                ]}
            ></GreenBulletedList>
            <CustomGradientOrderedList>
                <li>Fill out a form with teaching details</li>
                <li>Our team will verify your details</li>
                <li>You'll get an email within 5 business days</li>
                <li>Bring your students on board</li>
            </CustomGradientOrderedList>
            <SignUpModal />
        </MediaBlock>
    </EligibilitySection>
);

const ProgramBenefits = () => (
    <BodyContent>
        <H3>Teach MongoDB with confidence</H3>
        <BenefitsLayout>
            <FeaturedBenefit
                bullets={[
                    'Access to MongoDB software and curriculum content sourced from MongoDB education experts',
                    'Consult with us for help planning your curriculum',
                ]}
                image={HeroBannerImage}
                title="Curriculum Content Sourced from MongoDB Education Experts"
            />
            <FeaturedBenefit
                bullets={[
                    'Get on-demand access to MongoDB University, for you and your students',
                    'Student cohort tracking and usage analytics with MongoDB University',
                ]}
                image={HeroBannerImage}
                title="Exclusive MongoDB University On-Demand Access"
            />
            <FeaturedBenefit
                bullets={[
                    'Access to our MongoDB for Academia community',
                    'Collaborate, share tips and get inspired with other MongoDB for Academia educators',
                ]}
                image={HeroBannerImage}
                title="Connect with Educators Around the World"
            />
        </BenefitsLayout>
    </BodyContent>
);

const SignUpModal = () => (
    <Modal
        triggerComponent={
            <ButtonWithAdditionalTopMargin primary hasArrow={false}>
                Join MongoDB for Academia
            </ButtonWithAdditionalTopMargin>
        }
        dialogContainerStyle={{ maxWidth: MAX_SIGN_UP_WIDTH }}
    >
        <H5>Join MongoDB for Academia</H5>
        <P css={defaultLineHeight}>
            If you’re interested in receiving MongoDB course materials or if you
            like us to review your current content, please let us know by
            submitting the form and we’ll get back to you within five business
            days.
        </P>
        <StyledAcademiaSignUpForm />
    </Modal>
);

const TopBanner = () => (
    <ReducedMarginBanner
        breadcrumb={ACADEMIA_BREADCRUMBS}
        background={HeroBannerImage}
    >
        <Header>
            <H2>MongoDB Academia for Educators</H2>

            <P css={defaultLineHeight}>
                MongoDB for Academia is for educators who want to prepare
                students for careers that require in-demand database skills that
                power modern applications.
            </P>
            <SignUpModal />
        </Header>
    </ReducedMarginBanner>
);

export default () => {
    const metadata = useSiteMetadata();
    return (
        <Layout>
            <Helmet>
                <title>Academia for Educators - {metadata.title}</title>
            </Helmet>
            <TopBanner />
            <ProgramBenefits />
            <HowToJoin />
        </Layout>
    );
};
