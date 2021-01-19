import React from 'react';
import styled from '@emotion/styled';
import GreenBulletedList from '../educators/green-bulleted-list';
//TODO: Replace image with Visual Design asset once available
import HeroBannerImage from '~images/1x/Academia.svg';
import Card from '~components/dev-hub/card';
import { H5, P } from '~components/dev-hub/text';
import { size } from '~components/dev-hub/theme';

const IMAGE_HEIGHT = '98px';
const IMAGE_WIDTH = '130px';

const BenefitCardLayout = styled('div')`
    column-gap: 20px;
    display: grid;
    grid-template-columns: ${IMAGE_WIDTH} auto;
    grid-template-rows: ${IMAGE_HEIGHT} auto;
    flex: 1;
    height: 100%;
`;

const StyledCard = styled(Card)`
    flex: 1;
    max-width: none;
`;

const BenefitCardsLayout = styled('div')`
    display: flex;
    padding: ${size.xlarge} 0;
    margin: 0 auto;
    max-width: 1200px;
    justify-content: space-between;
`;

const GradientText = styled(P)`
    background: ${({ theme }) => theme.gradientMap.greenTealOffset};
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    &:after {
        /* 2192 is "RIGHTWARDS ARROW" */
        content: ' \u2192';
    }
`;

const CardRightSideContent = styled('div')`
    grid-row: span 2;
`;

const BenefitTypeCard = ({ bullets, image, href, to, isStudents = true }) => {
    const forAudienceText = isStudents ? 'For Students' : 'For Educators';
    const ctaText = isStudents
        ? 'Get Student Benefits'
        : 'Start teaching MongoDB';
    return (
        <StyledCard href={href} to={to} collapseImage>
            <BenefitCardLayout>
                <img
                    height={IMAGE_HEIGHT}
                    width={IMAGE_WIDTH}
                    alt=""
                    src={image}
                />
                <CardRightSideContent>
                    <H5>{forAudienceText}</H5>
                    <GreenBulletedList children={bullets} />
                    <GradientText bold>{ctaText}</GradientText>
                </CardRightSideContent>
            </BenefitCardLayout>
        </StyledCard>
    );
};

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
