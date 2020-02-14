import React from 'react';
import styled from '@emotion/styled';
import ReactPlayer from 'react-player';
import Button from './button';

const StyledReactPlayer = styled(ReactPlayer)`
    > div {
        /* Redefines stacking context, allowing play button animation to stick on top */
        position: sticky;
    }
`;

const VideoEmbed = ({ nodeData: { value }, ...props }) => (
    <StyledReactPlayer
        config={{
            youtube: {
                playerVars: {
                    autohide: 1,
                    modestbranding: 1,
                    rel: 0,
                    autoplay: 1,
                },
            },
            // TODO: Add config for twitch
        }}
        controls
        light
        playIcon={<Button play />}
        playing
        url={value}
        {...props}
    />
);

export default VideoEmbed;
