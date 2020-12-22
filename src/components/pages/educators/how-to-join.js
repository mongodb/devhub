import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import HeroBannerImage from '../../../images/1x/Academia.svg';
import { screenSize } from '../../dev-hub/theme';
import { H4, P } from '../../dev-hub/text';
import Card from '../../dev-hub/card';
import MediaBlock from '../../dev-hub/media-block';
import SignUpModal from './sign-up-modal';

const CUSTOM_BULLET_SIZE = '24px';
const ELIGIBILITY_IMAGE_MAX_WIDTH = '400px';
const SECTION_HORIZONTAL_PADDING = '120px';
const SECTION_VERTICAL_PADDING = '60px';

const centerContentOnMobile = css`
    @media ${screenSize.upToLarge} {
        justify-content: center;
        text-align: center;
    }
`;

// Custom counter so we can apply custom styles after disabling list-style
const customOrderedListCounter = css`
    counter-reset: ordered-list-counter;

    li {
        counter-increment: ordered-list-counter;
        :before {
            content: counter(ordered-list-counter);
        }
    }
`;

const gradientBullet = theme => css`
    background: ${theme.gradientMap.magentaSalmonSherbet};
    border-radius: 50%;
    color: white;
    font-size: 12px;
    height: ${CUSTOM_BULLET_SIZE};
    left: calc(-1 * ${CUSTOM_BULLET_SIZE} - 16px);
    line-height: ${CUSTOM_BULLET_SIZE};
    position: absolute;
    text-align: center;
    /* line-height is 32px. (32px - 24px) / 2 gives a 4px veritcal offset to center */
    top: 4px;
    width: ${CUSTOM_BULLET_SIZE};
`;
const reducePaddingOnMobile = css`
    @media ${screenSize.upToLarge} {
        padding: 16px 20px;
    }
`;

const CustomGradientOrderedList = styled('ol')`
    list-style: none;
    margin-bottom: 0;
    margin-top: 0;
    padding-left: 0;
    position: relative;
    ${customOrderedListCounter};

    li {
        margin: ${CUSTOM_BULLET_SIZE} 0 ${CUSTOM_BULLET_SIZE} 36px;
        position: relative;
        :before {
            ${({ theme }) => gradientBullet(theme)};
        }
    }
`;

const EligibilitySection = styled('div')`
    background-color: ${({ theme }) => theme.colorMap.devBlack};
    padding: ${SECTION_VERTICAL_PADDING} ${SECTION_HORIZONTAL_PADDING};
    ${centerContentOnMobile};
    ${reducePaddingOnMobile};
`;

const GreenBullet = styled('ul')`
    color: ${({ theme }) => theme.colorMap.darkGreen};
    list-style-type: circle;
`;

const WhiteBulletText = styled(P)`
    color: white;
    margin-bottom: 0;
`;

const GreenBulletedList = ({ children }) => (
    <GreenBullet>
        {children.map(content => (
            <li key={content}>
                <WhiteBulletText>{content}</WhiteBulletText>
            </li>
        ))}
    </GreenBullet>
);

const HowToJoin = () => (
    <EligibilitySection>
        <MediaBlock
            mediaComponent={
                <Card
                    image={HeroBannerImage}
                    maxWidth={ELIGIBILITY_IMAGE_MAX_WIDTH}
                />
            }
            mediaWidth={ELIGIBILITY_IMAGE_MAX_WIDTH}
            reverse
        >
            <H4>How to join MongoDB for Academia</H4>
            <P>You're eligible for this program if you teach:</P>
            <GreenBulletedList
                children={[
                    'Higher Education, College and University programs',
                    'Bootcamps and Online Courses',
                ]}
            ></GreenBulletedList>
            <CustomGradientOrderedList>
                <li>Fill out a form with teaching details</li>
                <li>Our team will verify your details</li>
                <li>You'll get an email within 5 business days</li>
                <li>Bring your students on board</li>
            </CustomGradientOrderedList>
            <SignUpModal />
        </MediaBlock>
    </EligibilitySection>
);

export default HowToJoin;
