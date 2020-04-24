import React from 'react';
import getTwitchThumbnail from '../../utils/get-twitch-thumbnail';
import Card from './card';
import styled from '@emotion/styled';
import { screenSize, size } from './theme';

const CardContainer = styled('div')`
    display: grid;
    grid-template-columns: repeat(auto-fill, 300px);
    grid-row-gap: ${size.small};
    justify-content: center;
    margin: 0 -${size.medium};

    @media ${screenSize.upToMedium} {
        display: block;
    }
`;

const getThumbnailURL = media => {
    if (
        media.media_type &&
        (media.media_type === 'youtube' || media.media_type === 'podcast')
    ) {
        return media.thumbnail_url;
    } else {
        //Twitch thumbnail url requires values for height and width
        return getTwitchThumbnail(media.thumbnail_url, 1000);
    }
};

const MediaItem = (media = []) => {
    const { title, description } = media;
    const thumbnail_url = getThumbnailURL(media);

    return (
        <CardContainer>
            <Card
                image={thumbnail_url}
                title={title}
                description={description}
            />
        </CardContainer>
    );
};

export default MediaItem;
