import React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import GreenBulletedList, {
    BulletText,
} from '../educators/green-bulleted-list';
import AcademiaEducators from '~images/student-spotlight/academia-educators.svg';
import AcademiaStudents from '~images/student-spotlight/academia-students.svg';
import Card from '~components/dev-hub/card';
import { H5, P2 } from '~components/dev-hub/text';
import { screenSize, size } from '~components/dev-hub/theme';

const MOBILE_IMG_MAX_SIZE = '50%';
const IMAGE_HEIGHT = '98px';
const IMAGE_WIDTH = '130px';

const absolutelyPlaceInSquare = css`
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
`;

const responsiveSquareContainer = css`
    margin: 0 auto;
    position: relative;
    :after {
        content: '';
        display: block;
        padding-bottom: 100%;
    }
`;

const ImageWrapper = styled('div')`
    @media ${screenSize.upToMedium} {
        max-height: ${MOBILE_IMG_MAX_SIZE};
        max-width: ${MOBILE_IMG_MAX_SIZE};
        ${responsiveSquareContainer}
    }
`;

const MaxWidthMobileImage = styled('img')`
    @media ${screenSize.upToMedium} {
        ${absolutelyPlaceInSquare}
    }
`;

const BenefitsLayout = styled('div', {
    shouldForwardProp: prop => prop !== 'maxWidth',
})`
    display: grid;
    grid-template-columns: repeat(2, 50%);
    margin: 0 auto;
    max-width: ${({ maxWidth }) => maxWidth};
    padding: ${size.xlarge} 0;
    @media ${screenSize.upToLarge} {
        display: block;
        padding: 0;
    }
`;

const SingleBenefitLayout = styled('div')`
    column-gap: ${size.medium};
    display: grid;
    grid-template-columns: ${IMAGE_WIDTH} auto;
    grid-template-rows: ${IMAGE_HEIGHT} auto;
    height: 100%;
    @media ${screenSize.upToMedium} {
        display: block;
    }
`;

const CardRightSideContent = styled('div')`
    grid-row: span 2;
`;

const NoMaxWidthCard = styled(Card)`
    /* TODO: Update Card component to take any max width setting then use as prop */
    max-width: none;
    ${BulletText} {
        color: ${({ theme }) => theme.colorMap.greyLightTwo};
        @media ${screenSize.upToLarge} {
            color: ${({ theme }) => theme.colorMap.devWhite};
        }
    }
    &:hover {
        ${BulletText} {
            color: ${({ theme }) => theme.colorMap.devWhite};
        }
    }
`;

const GradientText = styled(P2)`
    background: ${({ theme }) => theme.gradientMap.greenTealOffset};
    background-clip: text;
    font-family: 'Fira Mono';
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    &:after {
        /* 2192 is "RIGHTWARDS ARROW" */
        content: ' \u2192';
    }
`;

const BenefitTypeCard = ({
    alt,
    bullets,
    image,
    href,
    to,
    isStudents = true,
}) => {
    const forAudienceText = isStudents ? 'For Students' : 'For Educators';
    const ctaText = isStudents
        ? 'Get Student Benefits'
        : 'Start teaching MongoDB';
    return (
        <NoMaxWidthCard href={href} to={to} collapseImage>
            <SingleBenefitLayout>
                <ImageWrapper>
                    <MaxWidthMobileImage alt={alt} src={image} />
                </ImageWrapper>
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
    <BenefitsLayout maxWidth={maxWidth}>
        <BenefitTypeCard
            alt="Desk with book on top. Chair is behind the desk."
            href="https://www.mongodb.com/students"
            image={AcademiaStudents}
            bullets={[
                'Join our GitHub Student Developer Pack offer',
                'MongoDB Atlas: create a free Tier, or use $200 in Credits',
                'MongoDB University On-Demand and Free Certification',
            ]}
        />
        <BenefitTypeCard
            alt="Desk with two stacked drawers. Globe is on desk. Pen is on desk."
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
