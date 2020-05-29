import React, { useRef } from 'react';
import Layout from '../../components/dev-hub/layout';
import { Helmet } from 'react-helmet';
import { useSiteMetadata } from '../../hooks/use-site-metadata';
import {
    colorMap,
    fontSize,
    screenSize,
    size,
    lineHeight,
} from '../../components/dev-hub/theme';
import { H3, ArticleH2, P } from '../../components/dev-hub/text';
import styled from '@emotion/styled';
import Button from '../../components/dev-hub/button';
import HeroBanner from '../../components/dev-hub/hero-banner';
import SectionHeader from '../../components/dev-hub/section-header';
import AcademiaSignUpForm from '../../components/dev-hub/academia-sign-up-form';
import HeroBannerImage from '../../images/1x/Academia_Hero.svg';
import TeachMongoDBImage from '../../images/1x/TeachMongoDB.svg';
import AcademiaLeafImage from '../../images/1x/Academia_Leaf.svg';
import useMedia from '../../hooks/use-media';

const StyledHeroBanner = styled(HeroBanner)`
    margin: 0 ${size.medium};
`;

const Header = styled('header')`
    padding-top: ${size.large};
    @media ${screenSize.upToLarge} {
        margin-bottom: ${size.large};
    }
`;

const Title = styled(ArticleH2)`
    font-size: ${fontSize.small};
    font-family: 'Fira Mono';
`;

const StyledButton = styled(Button)`
    margin-top: ${size.large};
`;

const BodyContent = styled('div')`
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    max-width: ${size.maxContentWidth};
    width: 100%;
    @media ${screenSize.upToMedium} {
        padding: 0 ${size.default};
    }
`;

const BodyText = styled(P)`
    font-family: akzidenz;
    font-size: ${fontSize.default};
    line-height: ${lineHeight.default};
`;

const OfferingsContent = styled('div')`
    margin-bottom: ${size.xlarge};
    margin-top: ${size.xlarge};
`;

const EligibilityContent = styled('div')`
    margin-top: ${size.xlarge};
`;

const EligibilitySection = styled('div')`
    background-color: ${colorMap.devBlack};
    padding-bottom: ${size.xlarge};
    padding-top: ${size.medium};
    max-width: ${size.maxWidth};
    margin: 0 ${size.medium};
    @media ${screenSize.upToMedium} {
        width: 100%;
        margin: 0;
    }
`;

const StyledSectionHeader = styled(SectionHeader)`
    margin-bottom: ${size.mediumLarge};
`;

const StyledLink = styled('a')`
    color: ${colorMap.darkGreen};
    text-decoration: none;
`;

const StyledBullet = styled('ul')`
    list-style-type: circle;
    color: ${colorMap.darkGreen};
`;

const StyledSpan = styled('span')`
    color: white;
`;

const SignUp = styled('div')`
    margin-top: ${size.xlarge};
`;

const StyledAcademiaSignUpForm = styled(AcademiaSignUpForm)`
    margin-top: ${size.large};
`;

const StyledP = styled(P)`
    font-family: akzidenz;
    font-size: ${fontSize.default};
    line-height: ${lineHeight.default};
    margin-top: ${size.articleContent};
`;

const StyledLeafImage = styled('img')`
    margin-top: 400px;
`;

export default () => {
    const metadata = useSiteMetadata();
    const academiaBreadcrumbs = [
        { label: 'Home', target: '/' },
        { label: 'MongoDB for Academia', target: '/academia' },
    ];

    const scrollToRef = ref =>
        window.scrollTo({ behavior: 'smooth', top: ref.current.offsetTop });
    const formRef = useRef();
    const isMobile = useMedia(screenSize.upToLarge);
    return (
        <Layout>
            <Helmet>
                <title>Academia - {metadata.title}</title>
            </Helmet>
            <StyledHeroBanner
                breadcrumb={academiaBreadcrumbs}
                background={HeroBannerImage}
            >
                <Header>
                    <Title>MongoDB for Academia</Title>

                    <H3>Teach modern databases with MongoDB</H3>

                    <StyledP>
                        Enrich your curriculum with MongoDB content and prepare
                        the developers of tomorrow to build modern applications.
                    </StyledP>

                    <StyledButton
                        onClick={() => scrollToRef(formRef)}
                        primary
                        hasArrow={false}
                    >
                        Join MongoDB for Academia
                    </StyledButton>
                </Header>
            </StyledHeroBanner>

            <BodyContent>
                <div>
                    <OfferingsContent>
                        <ArticleH2>Teach MongoDB with Confidence</ArticleH2>
                        <BodyText>
                            Gain access to MongoDB software and curriculum
                            content sourced from MongoDB education experts that
                            easily integrates in your classroom teaching. We can
                            also consult you with planning a curriculum.
                        </BodyText>
                    </OfferingsContent>

                    <OfferingsContent>
                        <ArticleH2>MongoDB University On-Demand</ArticleH2>
                        <BodyText>
                            You and your students will receive special on-demand
                            access to MongoDB University, with cohort tracking,
                            usage analytics in addition to great content that
                            you can incorporate into your curriculum.
                        </BodyText>
                    </OfferingsContent>

                    <OfferingsContent>
                        <ArticleH2>
                            Connect with Educators Around the World
                        </ArticleH2>
                        <BodyText>
                            Access our MongoDB for Academia community to
                            collaborate, share tips and get inspired.
                        </BodyText>
                    </OfferingsContent>
                </div>
                {!isMobile && (
                    <img src={TeachMongoDBImage} alt="" width="450px" />
                )}
            </BodyContent>

            <EligibilitySection>
                <BodyContent>
                    <div>
                        <EligibilityContent>
                            <StyledSectionHeader>
                                For Educators
                            </StyledSectionHeader>
                            <BodyText>
                                MongoDB for Academia is for educators who want
                                to prepare students for careers that require
                                in-demand database skills that power modern
                                applications.
                                <StyledP>
                                    You’re eligible for this program if you
                                    teach:
                                </StyledP>
                                <StyledBullet>
                                    <li>
                                        <StyledSpan>
                                            Higher Education, College and
                                            University programs
                                        </StyledSpan>
                                    </li>
                                    <li>
                                        <StyledSpan>
                                            Bootcamps and Online Courses
                                        </StyledSpan>
                                    </li>
                                </StyledBullet>
                            </BodyText>
                        </EligibilityContent>

                        <EligibilityContent>
                            <StyledSectionHeader>
                                For Students
                            </StyledSectionHeader>
                            <BodyText>
                                If you’re a student, you can apply for the{' '}
                                <StyledLink href="https://education.github.com/pack">
                                    GitHub Student Developer Pack
                                </StyledLink>{' '}
                                and get access to MongoDB Atlas, University
                                on-demand content and certifications.
                            </BodyText>
                        </EligibilityContent>
                    </div>

                    {!isMobile && (
                        <StyledLeafImage src={AcademiaLeafImage} alt="" />
                    )}
                </BodyContent>
            </EligibilitySection>

            <BodyContent>
                <SignUp ref={formRef}>
                    <BodyText>
                        If you’re interested in receiving MongoDB course
                        materials or if you like us to review your current
                        content, please let us know by submitting the form and
                        we’ll get back to you within five business days.
                    </BodyText>
                    <StyledAcademiaSignUpForm />
                </SignUp>
            </BodyContent>
        </Layout>
    );
};
