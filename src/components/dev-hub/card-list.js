import React, { useState } from 'react';
import styled from '@emotion/styled';
import Card from './card';
import Button from './button';
import { screenSize, size } from './theme';
import { withPrefix } from 'gatsby';
import { getNestedText } from '../../utils/get-nested-text';
import { getTagLinksFromMeta } from '../../utils/get-tag-links-from-meta';
import getTwitchThumbnail from '../../utils/get-twitch-thumbnail';
import VideoModal from './video-modal';

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

const VideoCard = styled(Card)`
    flex: 1 1 360px;
    cursor: pointer;
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

// TODO: Update this component to take one array of items and map to cards based
// on the item type
export default React.memo(({ videos, articles, podcasts, limit = 9 }) => {
    videos = videos || [];
    articles = articles || [];
    podcasts = podcasts || [];
    const [visibleCards, setVisibleCards] = useState(limit);

    //TODO: modify once the tab component is ready to use single array of items
    const hasMore = videos.length
        ? videos.length > visibleCards
        : articles.length > visibleCards;

    return (
        <>
            <CardContainer>
                {articles.length > 0 &&
                    articles
                        .slice(0, visibleCards)
                        .map(article => (
                            <ArticleCard
                                to={article['slug']}
                                key={article['_id']}
                                image={withPrefix(article['atf-image'])}
                                tags={getTagLinksFromMeta(article)}
                                title={getNestedText(article['title'])}
                                description={getNestedText(
                                    article['meta-description']
                                )}
                            />
                        ))}

                {videos.length > 0 &&
                    videos
                        .slice(0, visibleCards)
                        .map(video => (
                            <VideoModal
                                key={video.videoId}
                                id={video.videoId}
                                name={video.mediaType}
                                trigger={
                                    <VideoCard
                                        key={video.title}
                                        image={getThumbnailUrl(video)}
                                        title={video.title}
                                        description={video.description}
                                    />
                                }
                                thumbnail={getThumbnailUrl(video)}
                            />
                        ))}

                {podcasts.length > 0 &&
                    podcasts
                        .slice(0, visibleCards)
                        .map(podcast => (
                            <ArticleCard
                                key={podcast.title}
                                image={getThumbnailUrl(podcast)}
                                title={podcast.title}
                                description={podcast.description}
                            />
                        ))}
            </CardContainer>

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
