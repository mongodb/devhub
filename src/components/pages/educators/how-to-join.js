import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import EducatorsJoin from '~images/student-spotlight/educators-join.svg';
import useMedia from '~hooks/use-media';
import { screenSize, size } from '../../dev-hub/theme';
import { H4, P, P2 } from '../../dev-hub/text';
import MediaBlock from '../../dev-hub/media-block';
import SignUpModal from './sign-up-modal';
import GreenBulletedList from './green-bulleted-list';

const CUSTOM_BULLET_SIZE = '24px';
const SECTION_HORIZONTAL_PADDING = '120px';
const SECTION_VERTICAL_PADDING = '60px';

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
    top: 0;
    width: ${CUSTOM_BULLET_SIZE};
`;
const reducePaddingOnMobile = css`
    @media ${screenSize.upToLarge} {
        padding: ${size.large} ${size.medium} 48px;
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
    ${reducePaddingOnMobile};
`;

const HowToJoin = () => {
    const isMobile = useMedia(screenSize.upToLarge);
    const Requirements = () => (
        <>
            <H4>How to join MongoDB for Academia</H4>
            <P>You're eligible for this program if you teach:</P>
            <GreenBulletedList
                children={[
                    'Higher Education, College and University programs',
                    'Bootcamps and Online Courses',
                ]}
            />
        </>
    );
    return (
        <EligibilitySection>
            <MediaBlock
                mediaComponent={
                    <>
                        {isMobile && <Requirements />}
                        <img
                            src={EducatorsJoin}
                            alt="person with book and browser window looking over six other people"
                        />
                    </>
                }
                reverse
            >
                {!isMobile && <Requirements />}
                <CustomGradientOrderedList>
                    <li>
                        <P2 collapse>Fill out a form with teaching details</P2>
                    </li>
                    <li>
                        <P2 collapse>Our team will verify your details</P2>
                    </li>
                    <li>
                        <P2 collapse>
                            You'll get an email within 5 business days
                        </P2>
                    </li>
                    <li>
                        <P2 collapse>Bring your students on board</P2>
                    </li>
                </CustomGradientOrderedList>
                <SignUpModal />
            </MediaBlock>
        </EligibilitySection>
    );
};

export default HowToJoin;
