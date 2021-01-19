import React from 'react';
import styled from '@emotion/styled';
import GreenBulletedList from '../educators/green-bulleted-list';
//TODO: Replace image with Visual Design asset once available
import HeroBannerImage from '~images/1x/Academia.svg';
import Card from '~components/dev-hub/card';
import { H5, P } from '~components/dev-hub/text';

const BenefitCardLayout = styled('div')`
    display: flex;
    flex: 1;
    max-width: 588px;
    > img {
        margin-right: 20px;
    }
`;

const BenefitCardsLayout = styled('div')`
    display: flex;
    padding: 56px 0;
    margin: 0 auto;
    max-width: 1200px;
    justify-content: space-between;
`;

const CTAText = styled(P)`
    background: ${({ theme }) => theme.gradientMap.greenTealOffset};
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    &:after {
        /* 2192 is "RIGHTWARDS ARROW" */
        content: ' \u2192';
    }
`;

const BenefitTypeCard = ({ bullets, image, href, to, isStudents = true }) => (
    <Card maxWidth="50%" href={href} to={to} collapseImage>
        <BenefitCardLayout>
            <img width="110px" height="92px" alt="" src={image} />
            <div>
                <H5>For {isStudents ? 'Students' : 'Educators'}</H5>
                <GreenBulletedList children={bullets} />
                <CTAText bold>
                    {isStudents
                        ? 'Get Student Benefits'
                        : 'Start teaching MongoDB'}
                </CTAText>
            </div>
        </BenefitCardLayout>
    </Card>
);

const StudentsEducatorsDetails = () => (
    <BenefitCardsLayout>
        <BenefitTypeCard
            href="https://www.mongodb.com/students"
            image={HeroBannerImage}
            bullets={[
                'Join our GitHub Student Developer Pack offer',
                'MongoDB Atlas: create a free Tier, or use $200 in Credits',
                'MongoDB University On-Demand and Free Certification',
            ]}
        />
        <BenefitTypeCard
            isStudents={false}
            image={HeroBannerImage}
            to="/academia/educators/"
            bullets={[
                'Access MongoDB course material & content support',
                'On-demand access to MongoDB University, cohort tracking and usage analytics',
                'Access our MongoDB for Academia community to collaborate, share tips and get inspired',
            ]}
        />
    </BenefitCardsLayout>
);

export default StudentsEducatorsDetails;
