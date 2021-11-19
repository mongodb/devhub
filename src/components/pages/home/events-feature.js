import React from 'react';
import styled from '@emotion/styled';
import Card from '../../dev-hub/card';
import MediaBlock from '../../dev-hub/media-block';
import { H2, P } from '../../dev-hub/text';
import { screenSize, size } from '../../dev-hub/theme';
import Button from '../../dev-hub/button';
import meetupsImage from '../../../images/1x/Meetups.png';
import GradientUnderline from '../../dev-hub/gradient-underline';
import { useTheme } from '@emotion/react';
import FeatureSection from './feature-section';
import { EVENTS_WEBINARS_OVERVIEW } from '../../../constants';

const MEDIA_WIDTH = '550px';

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

const EventsFeature = () => {
    const theme = useTheme();
    return (
        <FeatureSection data-test="events">
            <MediaBlock
                mediaComponent={
                    <Card image={meetupsImage} maxWidth={MEDIA_WIDTH}></Card>
                }
                mediaWidth={MEDIA_WIDTH}
                reverse
            >
                <SectionContent>
                    <H2>
                        <GradientUnderline
                            gradient={theme.gradientMap.greenTeal}
                        >
                            Events
                        </GradientUnderline>
                    </H2>
                    <DescriptiveText>
                        Join us at our MongoDB .local and community events.
                    </DescriptiveText>
                    <DescriptiveText>
                        Come to learn, stay to connect.
                    </DescriptiveText>
                    <Button href={EVENTS_WEBINARS_OVERVIEW} secondary>
                        Join Us
                    </Button>
                </SectionContent>
            </MediaBlock>
        </FeatureSection>
    );
};

export default EventsFeature;
