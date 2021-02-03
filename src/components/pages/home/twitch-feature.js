import React from 'react';
import styled from '@emotion/styled';
import MediaBlock from '../../dev-hub/media-block';
import getTwitchThumbnail from '../../../utils/get-twitch-thumbnail';
import VideoModal from '../../dev-hub/video-modal';
import Card from '../../dev-hub/card';
import { H2, P } from '../../dev-hub/text';
import FeatureSection from './feature-section';
import { screenSize, size } from '../../dev-hub/theme';
import GradientUnderline from '../../dev-hub/gradient-underline';
import { useTheme } from 'emotion-theming';
import Button from '../../dev-hub/button';

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

const TwitchFeature = ({ twitchVideo }) => {
    const theme = useTheme();
    return (
        <FeatureSection altBackground data-test="twitch">
            <MediaBlock
                mediaWidth={MEDIA_WIDTH}
                mediaComponent={
                    <Card
                        image={getTwitchThumbnail(twitchVideo.thumbnailUrl)}
                        maxWidth={MEDIA_WIDTH}
                        title={twitchVideo.title}
                        videoModalThumbnail={getTwitchThumbnail(
                            twitchVideo.thumbnailUrl,
                            1200
                        )}
                        video={twitchVideo}
                    />
                }
            >
                <SectionContent>
                    <H2>
                        <GradientUnderline
                            gradient={theme.gradientMap.tealVioletPurple}
                        >
                            Live Coding on Our Twitch Channel
                        </GradientUnderline>
                    </H2>
                    <DescriptiveText>
                        Every Friday at noon EST come watch our developers make
                        the MongoDB platform come alive.
                    </DescriptiveText>
                    {twitchVideo && (
                        <VideoModal
                            id={twitchVideo.videoId}
                            name={twitchVideo.mediaType}
                            trigger={<Button secondary>Watch</Button>}
                            thumbnail={getTwitchThumbnail(
                                twitchVideo.thumbnailUrl,
                                1200
                            )}
                        />
                    )}
                </SectionContent>
            </MediaBlock>
        </FeatureSection>
    );
};

export default TwitchFeature;
