import React from 'react';
import ReactPlayer from 'react-player';

const VideoEmbed = ({ nodeData: { value }, ...props }) => (
    <ReactPlayer url={value} playing {...props} />
);

export default VideoEmbed;
