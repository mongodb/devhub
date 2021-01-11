import React from 'react';
import styled from '@emotion/styled';
import MediaBlock from '../../dev-hub/media-block';
import { H2, P } from '../../dev-hub/text';
import { screenSize, size } from '../../dev-hub/theme';
import Button from '../../dev-hub/button';
import GradientUnderline from '../../dev-hub/gradient-underline';
import { useTheme } from 'emotion-theming';
import FeatureSection from './feature-section';
import ProjectCardGrid from './project-card-grid';

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

const AcademiaFeature = () => {
    const theme = useTheme();
    return (
        <FeatureSection altBackground>
            <MediaBlock
                mediaWidth="550px"
                mediaComponent={<ProjectCardGrid />}
                reverse
            >
                <SectionContent>
                    <H2>
                        <GradientUnderline
                            gradient={theme.gradientMap.magentaSalmonSherbet}
                        >
                            MongoDB for Academia
                        </GradientUnderline>
                    </H2>
                    <DescriptiveText>
                        MongoDB for Academia gives educators hands-on learning
                        experiences to inspire, teach and learn with MongoDB.
                    </DescriptiveText>
                    <div>
                        <Button to="/academia/educators/" secondary>
                            Learn more
                        </Button>
                    </div>
                </SectionContent>
            </MediaBlock>
        </FeatureSection>
    );
};

export default AcademiaFeature;
