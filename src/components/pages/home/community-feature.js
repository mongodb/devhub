import React from 'react';
import styled from '@emotion/styled';
import Card from '../../dev-hub/card';
import MediaBlock from '../../dev-hub/media-block';
import { H2, P } from '../../dev-hub/text';
import { screenSize, size } from '../../dev-hub/theme';
import Button from '../../dev-hub/button';
import buildImage from '../../../images/2x/Build@2x.png';
import GradientUnderline from '../../dev-hub/gradient-underline';
import { useTheme } from 'emotion-theming';
import FeatureSection from './feature-section';
import ProjectSignUpForm from '../../dev-hub/project-sign-up-form';

const MEDIA_WIDTH = '550';

const DescriptiveText = styled(P)`
    color: ${({ theme }) => theme.colorMap.greyLightTwo};
    margin-bottom: ${size.medium};
`;

const SectionContent = styled('div')`
    padding: 0 ${size.default};
    @media ${screenSize.largeAndUp} {
        margin-top: 15%;
        padding: 8%;
    }
`;

const CommunityFeature = () => {
    const theme = useTheme();
    return (
        <FeatureSection>
            <MediaBlock
                mediaComponent={
                    <Card image={buildImage} maxWidth={MEDIA_WIDTH}></Card>
                }
            >
                <SectionContent>
                    <H2>
                        <GradientUnderline
                            gradient={theme.gradientMap.magentaSalmonSherbet}
                        >
                            Show Your Stuff
                        </GradientUnderline>
                    </H2>
                    <DescriptiveText>
                        Building something on MongoDB? Share your stories,
                        demos, and wisdom with those still learning.
                    </DescriptiveText>
                    <ProjectSignUpForm
                        triggerComponent={<Button secondary>Share</Button>}
                    />
                </SectionContent>
            </MediaBlock>
        </FeatureSection>
    );
};

export default CommunityFeature;
