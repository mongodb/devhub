import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { screenSize, size } from '../../dev-hub/theme';
import { H3, H5 } from '../../dev-hub/text';
import ThumbnailConnect from '~images/student-spotlight/thumbnail-connect.svg';
import ThumbnailCurriculum from '~images/student-spotlight/thumbnail-curriculum.svg';
import ThumbnailUniversity from '~images/student-spotlight/thumbnail-university.svg';
import GreenBulletedList from '~components/dev-hub/green-bulleted-list';

const MAX_FEATURED_BENEFIT_WIDTH = '300px';
const SECTION_HORIZONTAL_PADDING = '120px';
const SECTION_VERTICAL_PADDING = '60px';

const FeaturedBenefitMaxWidthContainer = styled('div')`
    max-width: ${MAX_FEATURED_BENEFIT_WIDTH};
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
        margin-top: ${size.large};
    }
`;

const BodyContent = styled('div')`
    align-items: center;
    display: flex;
    flex-direction: column;
    padding: ${SECTION_VERTICAL_PADDING} ${SECTION_HORIZONTAL_PADDING};
    ${reducePaddingOnMobile};
`;

const BenefitGraphic = styled('img')`
    display: block;
    max-width: 200px;
    margin: 0 auto ${size.medium};
`;

const FeaturedBenefit = ({ alt, bullets, image, title }) => (
    <FeaturedBenefitMaxWidthContainer>
        <BenefitGraphic alt={alt} src={image} />
        <H5>{title}</H5>
        <GreenBulletedList>{bullets}</GreenBulletedList>
    </FeaturedBenefitMaxWidthContainer>
);

const ProgramBenefits = () => (
    <BodyContent>
        <H3 collapse>Teach MongoDB with confidence</H3>
        <BenefitsLayout>
            <FeaturedBenefit
                alt="Person with speech bubble with a star in the bubble. Check marks to the left and right of person. Stars around the person."
                bullets={[
                    'Access to MongoDB curriculum content',
                    'Slide-based lecture materials explicitly designed for educator use',
                ]}
                image={ThumbnailCurriculum}
                title="Curriculum Content Sourced from MongoDB Education Experts"
            />
            <FeaturedBenefit
                alt="Leaf standing in middle. Two arrows in front and right of leaf. Two browser with play video icons to the left and behind leaf."
                bullets={[
                    'Get on-demand access to MongoDB University, for you and your students',
                ]}
                image={ThumbnailUniversity}
                title="Exclusive MongoDB University On-Demand Access"
            />
            <FeaturedBenefit
                alt="Three people. Middle person has large speech bubble connected to other two people. One additional small speech bubble for each other person"
                bullets={[
                    'Access to our MongoDB for Academia community',
                    'Participate in exclusive events for educators to network, collaborate and share best practices',
                ]}
                image={ThumbnailConnect}
                title="Connect with Educators Around the World"
            />
        </BenefitsLayout>
    </BodyContent>
);

export default ProgramBenefits;
