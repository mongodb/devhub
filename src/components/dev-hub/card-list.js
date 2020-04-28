import React, { useState } from 'react';
import styled from '@emotion/styled';
import Card from './card';
import Button from './button';
import { screenSize, size } from './theme';
import { withPrefix } from 'gatsby';
import { getNestedText } from '../../utils/get-nested-text';
import { getTagLinksFromMeta } from '../../utils/get-tag-links-from-meta';
import getTwitchThumbnail from '../../utils/get-twitch-thumbnail';
import { VideoCard, VideoModal } from './video-card';

const CardContainer = styled('div')`
    display: grid;
    grid-template-columns: repeat(auto-fill, 350px);
    grid-row-gap: ${size.small};
    justify-content: center;
    margin: 0 -${size.medium};

    @media ${screenSize.upToMedium} {
        display: block;
    }
`;
const ArticleCard = styled(Card)`
    flex: 1 1 360px;
`;

const HasMoreButtonContainer = styled('div')`
    margin-bottom: ${size.large};
    margin-top: ${size.large};
    text-align: center;
`;

const getThumbnailUrl = media => {
    return media.mediaType === 'twitch'
        ? getTwitchThumbnail(media.thumbnailUrl, 1000)
        : media.thumbnailUrl;
};

export default React.memo(({ videos = [], items = [], limit = 9 }) => {
    const [visibleCards, setVisibleCards] = useState(limit);
    const hasMore = videos.length
        ? videos.length > visibleCards
        : items.length > visibleCards;

    return (
        <>
            {items.length > 0 && (
                <CardContainer>
                    {items.slice(0, visibleCards).map(item => (
                        <ArticleCard
                            to={item['slug']}
                            key={item['_id']}
                            image={withPrefix(item['atf-image'])}
                            tags={getTagLinksFromMeta(item)}
                            title={getNestedText(item['title'])}
                            description={getNestedText(
                                item['meta-description']
                            )}
                        />
                    ))}
                </CardContainer>
            )}

            {videos.length > 0 && (
                <CardContainer>
                    {videos.slice(0, visibleCards).map(video => (
                        <VideoModal
                            key={video.videoId}
                            id={video.videoId}
                            name={video.mediaType}
                            trigger={
                                <VideoCard
                                    key={video['title']}
                                    image={getThumbnailUrl(video)}
                                    title={video['title']}
                                    description={video['description']}
                                />
                            }
                            thumbnail={getThumbnailUrl(video)}
                        />
                    ))}
                </CardContainer>
            )}

            {hasMore && (
                <HasMoreButtonContainer>
                    <Button
                        secondary
                        pagination
                        onClick={() => setVisibleCards(visibleCards + limit)}
                    >
                        Load more
                    </Button>
                </HasMoreButtonContainer>
            )}
        </>
    );
});
