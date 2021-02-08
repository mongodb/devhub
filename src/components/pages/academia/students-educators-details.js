import React from 'react';
import styled from '@emotion/styled';
import GreenBulletedList from '../educators/green-bulleted-list';
import AcademiaEducators from '~images/student-spotlight/academia-educators.svg';
import AcademiaStudents from '~images/student-spotlight/academia-students.svg';
import Card from '~components/dev-hub/card';
import { H5, P } from '~components/dev-hub/text';
import { size } from '~components/dev-hub/theme';

const IMAGE_HEIGHT = '98px';
const IMAGE_WIDTH = '130px';

const BenefitsLayout = styled('div')`
    display: grid;
    grid-template-columns: repeat(2, 50%);
    margin: 0 auto;
    max-width: ${({ maxwidth }) => maxwidth};
    padding: ${size.xlarge} 0;
`;

const SingleBenefitLayout = styled('div')`
    column-gap: ${size.medium};
    display: grid;
    grid-template-columns: ${IMAGE_WIDTH} auto;
    grid-template-rows: ${IMAGE_HEIGHT} auto;
    height: 100%;
`;

const CardRightSideContent = styled('div')`
    grid-row: span 2;
`;

const NoMaxWidthCard = styled(Card)`
    /* TODO: Update Card component to take any max width setting then use as prop */
    max-width: none;
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

const BenefitTypeCard = ({ bullets, image, href, to, isStudents = true }) => {
    const forAudienceText = isStudents ? 'For Students' : 'For Educators';
    const ctaText = isStudents
        ? 'Get Student Benefits'
        : 'Start teaching MongoDB';
    return (
        <NoMaxWidthCard href={href} to={to} collapseImage>
            <SingleBenefitLayout>
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
            </SingleBenefitLayout>
        </NoMaxWidthCard>
    );
};

const StudentsEducatorsDetails = ({ maxWidth = '1200px' }) => (
    <BenefitsLayout maxwidth={maxWidth}>
        <BenefitTypeCard
            href="https://www.mongodb.com/students"
            image={AcademiaStudents}
            bullets={[
                'Join our GitHub Student Developer Pack offer',
                'MongoDB Atlas: create a free Tier, or use $200 in Credits',
                'MongoDB University On-Demand and Free Certification',
            ]}
        />
        <BenefitTypeCard
            isStudents={false}
            image={AcademiaEducators}
            to="/academia/educators/"
            bullets={[
                'Access MongoDB course material & content support',
                'On-demand access to MongoDB University, cohort tracking and usage analytics',
                'Access our MongoDB for Academia community to collaborate, share tips and get inspired',
            ]}
        />
    </BenefitsLayout>
);

export default StudentsEducatorsDetails;
