import React from 'react';
import styled from '@emotion/styled';
import GreenBulletedList from '../educators/green-bulleted-list';
//TODO: Replace image with Visual Design asset once available
import HeroBannerImage from '~images/1x/Academia.svg';
import { H5 } from '~components/dev-hub/text';

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
    margin: 0 20px;
    max-width: 1200px;
    justify-content: center;
`;

const BenefitTypeCard = ({ bullets, image, isStudents = true }) => (
    <BenefitCardLayout>
        <img width="110px" height="92px" alt="" src={image} />
        <div>
            <H5>For {isStudents ? 'Students' : 'Educators'}</H5>
            <GreenBulletedList children={bullets} />
        </div>
    </BenefitCardLayout>
);

const StudentsEducatorsDetails = () => (
    <BenefitCardsLayout>
        <BenefitTypeCard
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
            bullets={[
                'Access MongoDB course material & content support',
                'On-demand access to MongoDB University, cohort tracking and usage analytics',
                'Access our MongoDB for Academia community to collaborate, share tips and get inspired',
            ]}
        />
    </BenefitCardsLayout>
);

export default StudentsEducatorsDetails;
