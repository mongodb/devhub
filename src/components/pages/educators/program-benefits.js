import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { screenSize } from '../../dev-hub/theme';
import { H3, H5 } from '../../dev-hub/text';
import HeroBannerImage from '../../../images/1x/Academia.svg';
import GreenBulletedList from './green-bulleted-list';

const MAX_FEATURED_BENEFIT_WIDTH = '300px';
const SECTION_HORIZONTAL_PADDING = '120px';
const SECTION_VERTICAL_PADDING = '60px';

const FeaturedBenefitMaxWidthContainer = styled('div')`
    max-width: ${MAX_FEATURED_BENEFIT_WIDTH};
`;

const centerContentOnMobile = css`
    @media ${screenSize.upToLarge} {
        justify-content: center;
        text-align: center;
    }
`;

const reducePaddingOnMobile = css`
    @media ${screenSize.upToLarge} {
        padding: 16px 20px;
    }
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

const FeaturedBenefit = ({ bullets, image, title }) => (
    <FeaturedBenefitMaxWidthContainer>
        <img alt="" src={image} />
        <H5>{title}</H5>
        <GreenBulletedList>{bullets}</GreenBulletedList>
    </FeaturedBenefitMaxWidthContainer>
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

export default ProgramBenefits;
