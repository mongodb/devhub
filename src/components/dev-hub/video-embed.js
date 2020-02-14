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
        url={value}
        light
        playIcon={<Button play />}
        playing
        style={{ position: 'sticky' }}
        {...props}
    />
);

export default VideoEmbed;
