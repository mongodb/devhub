import React from 'react';
import styled from '@emotion/styled';
import Button from './button';
import Card from './card';
import VideoModal from './video-modal';

const ThumbnailButton = styled(Button)`
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    position: absolute;
`;

const ThumbnailCard = styled(Card)`
    position: relative;
`;

const VideoCard = ({ cardImage, modalThumbnail, video, ...props }) => (
    <ThumbnailCard
        placeChildrenOnImage
        image={cardImage}
        title={video.title}
        {...props}
    >
        <VideoModal
            id={video.videoId}
            name={video.mediaType}
            trigger={<ThumbnailButton play />}
            thumbnail={modalThumbnail}
        />
    </ThumbnailCard>
);

export default VideoCard;
