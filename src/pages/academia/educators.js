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
import { H2, H3, H4, H5, P } from '../../components/dev-hub/text';
import styled from '@emotion/styled';
import Button from '../../components/dev-hub/button';
import HeroBanner from '../../components/dev-hub/hero-banner';
import AcademiaSignUpForm from '../../components/dev-hub/academia-sign-up-form';
import Card from '../../components/dev-hub/card';
import HeroBannerImage from '../../images/1x/Academia.svg';
import MediaBlock from '../../components/dev-hub/media-block';
import Modal from '../../components/dev-hub/modal';

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
    flex-direction: column;
    align-items: center;
    padding: 60px 120px;
    @media ${screenSize.upToLarge} {
        padding: 16px 32px;
        justify-content: center;
        text-align: center;
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
    @media ${screenSize.upToLarge} {
        padding: 16px 32px;
        justify-content: center;
    }
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

const OrderedList = styled('ol')`
    list-style: none;
    margin-bottom: 0;
    margin-top: 0;
    padding-left: 0;
    position: relative;

    counter-reset: my-awesome-counter;

    li {
        counter-increment: my-awesome-counter;
        margin: 12px 0 12px 40px;
        position: relative;
    }

    li::before {
        content: counter(my-awesome-counter);
        color: white;
        font-size: 12px;
        position: absolute;
        --size: 24px;
        left: calc(-1 * var(--size) - 10px);
        line-height: var(--size);
        width: var(--size);
        height: var(--size);
        top: 0;
        background: ${({ theme }) => theme.gradientMap.magentaSalmonSherbet};
        border-radius: 50%;
        text-align: center;
    }
`;

const Image = styled('img')`
    width: 258px;
`;

const SubSection = styled('div')`
    max-width: 300px;
`;

const SubSections = styled('div')`
    display: flex;
    justify-content: space-around;
    margin-top: 89px;
    width: 100%;
    @media ${screenSize.upToLarge} {
        justify-content: unset;
        flex-direction: column;
    }
`;

const SignUpModal = () => (
    <Modal
        triggerComponent={
            <StyledButton primary hasArrow={false}>
                Join MongoDB for Academia
            </StyledButton>
        }
        dialogContainerStyle={{ maxWidth: '600px' }}
    >
        <H5>Join MongoDB for Academia</H5>
        <BodyText>
            If you’re interested in receiving MongoDB course materials or if you
            like us to review your current content, please let us know by
            submitting the form and we’ll get back to you within five business
            days.
        </BodyText>
        <StyledAcademiaSignUpForm />
    </Modal>
);

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
                    <SignUpModal />
                </Header>
            </StyledHeroBanner>

            <BodyContent>
                <H3>Teach MongoDB with confidence</H3>
                <SubSections>
                    <SubSection>
                        <Image alt="" src={HeroBannerImage} />
                        <H5>
                            Curriculum Content Sourced from MongoDB Education
                            Experts
                        </H5>
                        <StyledBullet>
                            <li>
                                <BulletText>
                                    Access to MongoDB software and curriculum
                                    content sourced from MongoDB education
                                    experts
                                </BulletText>
                            </li>
                            <li>
                                <BulletText>
                                    Consult with us for help planning your
                                    curriculum
                                </BulletText>
                            </li>
                        </StyledBullet>
                    </SubSection>
                    <SubSection>
                        <Image alt="" src={HeroBannerImage} />
                        <H5>Exclusive MongoDB University On-Demand Access</H5>
                        <StyledBullet>
                            <li>
                                <BulletText>
                                    Get on-demand access to MongoDB University,
                                    for you and your students
                                </BulletText>
                            </li>
                            <li>
                                <BulletText>
                                    Student cohort tracking and usage analytics
                                    with MongoDB University
                                </BulletText>
                            </li>
                        </StyledBullet>
                    </SubSection>
                    <SubSection>
                        <Image alt="" src={HeroBannerImage} />
                        <H5>Connect with Educators Around the World</H5>
                        <StyledBullet>
                            <li>
                                <BulletText>
                                    Access to our MongoDB for Academia community
                                </BulletText>
                            </li>
                            <li>
                                <BulletText>
                                    Collaborate, share tips and get inspired
                                    with other MongoDB for Academia educators
                                </BulletText>
                            </li>
                        </StyledBullet>
                    </SubSection>
                </SubSections>
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
                    <OrderedList>
                        <li>Fill out a form with teaching details</li>
                        <li>Our team will verify your details</li>
                        <li>You'll get an email within 5 business days</li>
                        <li>Bring your students on board</li>
                    </OrderedList>
                    <SignUpModal />
                </MediaBlock>
            </EligibilitySection>
        </Layout>
    );
};
