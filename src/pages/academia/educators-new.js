import React from 'react';
import Layout from '../../components/dev-hub/layout';
import { Helmet } from 'react-helmet';
import { useSiteMetadata } from '../../hooks/use-site-metadata';
import {
    fontSize,
    screenSize,
    size,
    lineHeight,
} from '../../components/dev-hub/theme';
import { H2, H3, H4, P } from '../../components/dev-hub/text';
import styled from '@emotion/styled';
import Button from '../../components/dev-hub/button';
import HeroBanner from '../../components/dev-hub/hero-banner';
import AcademiaSignUpForm from '../../components/dev-hub/academia-sign-up-form';
import Card from '../../components/dev-hub/card';
import HeroBannerImage from '../../images/1x/Academia.svg';
import MediaBlock from '../../components/dev-hub/media-block';

const StyledHeroBanner = styled(HeroBanner)`
    margin: 0 ${size.medium};
    @media ${screenSize.upToLarge} {
        margin: 0;
    }
`;

const Header = styled('header')`
    padding-top: ${size.large};
    @media ${screenSize.upToLarge} {
        margin-bottom: ${size.large};
    }
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
const EligibilitySection = styled('div')`
    background-color: ${({ theme }) => theme.colorMap.devBlack};
    padding: 60px 120px;
`;

const SignUp = styled('div')`
    margin-top: ${size.xlarge};
    margin-bottom: ${size.xxlarge};
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

const StyledBullet = styled('ul')`
    list-style-type: circle;
    color: ${({ theme }) => theme.colorMap.darkGreen};
`;

const BulletText = styled(P)`
    color: white;
    margin-bottom: 0;
`;

export default () => {
    const metadata = useSiteMetadata();
    const academiaBreadcrumbs = [
        { label: 'Home', target: '/' },
        { label: 'MongoDB for Academia', target: '/academia' },
    ];
    return (
        <Layout>
            <Helmet>
                <title>Academia for Educators - {metadata.title}</title>
            </Helmet>
            <StyledHeroBanner
                breadcrumb={academiaBreadcrumbs}
                background={HeroBannerImage}
            >
                <Header>
                    <H2>MongoDB Academia for Educators</H2>

                    <StyledP>
                        MongoDB for Academia is for educators who want to
                        prepare students for careers that require in-demand
                        database skills that power modern applications.
                    </StyledP>

                    <StyledButton onClick={() => {}} primary hasArrow={false}>
                        Join MongoDB for Academia
                    </StyledButton>
                </Header>
            </StyledHeroBanner>

            <BodyContent>
                <H3>Teach MongoDB with confidence</H3>
                {/* Images with bullets go here */}
            </BodyContent>

            <EligibilitySection>
                <MediaBlock
                    mediaComponent={
                        <Card image={HeroBannerImage} maxWidth="400px" />
                    }
                    mediaWidth="400px"
                    reverse
                >
                    <H4>How to join MongoDB for Academia</H4>
                    <P>You're eligible for this program if you teach:</P>
                    <StyledBullet>
                        <li>
                            <BulletText>
                                Higher Education, College and University
                                programs
                            </BulletText>
                        </li>
                        <li>
                            <BulletText>
                                Bootcamps and Online Courses
                            </BulletText>
                        </li>
                    </StyledBullet>
                </MediaBlock>
            </EligibilitySection>

            <BodyContent>
                <SignUp>
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
