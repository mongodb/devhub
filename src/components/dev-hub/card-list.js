import React, { useCallback, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styled from '@emotion/styled';
import Card from './card';
import Paginate from './paginate';
import getTwitchThumbnail from '~utils/get-twitch-thumbnail';

const CARD_LIST_LIMIT = 12;

const ArticleCard = styled(Card)`
    flex: 1 1 360px;
`;

const VideoCard = styled(Card)`
    flex: 1 1 360px;
`;

const getThumbnailUrl = media => {
    return media.mediaType === 'twitch'
        ? getTwitchThumbnail(media.thumbnailUrl)
        : media.thumbnailUrl;
};

// publishDate is for videos. TODO is to have this follow articles
const sortCardsByDate = contentList =>
    contentList.sort(
        (a, b) =>
            new Date(b.updatedDate || b.publishedDate || b.publishDate) -
            new Date(a.updatedDate || a.publishedDate || a.publishDate)
    );

const renderArticle = article => (
    <ArticleCard
        to={article.slug}
        key={uuidv4()}
        image={article.image}
        tags={[...article.products, ...article.languages, ...article.tags]}
        title={article.title}
        badge="article"
        description={article.description}
    />
);

const renderVideo = video => (
    <VideoCard
        key={uuidv4()}
        image={getThumbnailUrl(video)}
        videoModalThumbnail={getThumbnailUrl(video)}
        title={video.title}
        badge={video.mediaType}
        description={video.description}
        to={video.slug}
    />
);

const renderPodcast = podcast => (
    <Card
        key={uuidv4()}
        image={getThumbnailUrl(podcast)}
        title={podcast.title}
        badge={podcast.mediaType}
        description={podcast.description}
        to={podcast.slug}
    />
);

const renderContentTypeCard = item => {
    if (item.mediaType) {
        switch (item.mediaType) {
            case 'youtube':
            case 'twitch':
                return renderVideo(item);
            case 'podcast':
                return renderPodcast(item);
            default:
                return renderArticle(item);
        }
    }
    // Some items don't have mediaType. In that case, they are articles
    return renderArticle(item);
};

export default React.memo(
    ({
        all,
        videos,
        articles,
        podcasts,
        shouldSort,
        limit = CARD_LIST_LIMIT,
    }) => {
        videos = videos || [];
        articles = articles || [];
        podcasts = podcasts || [];

        // If we provide "all", we don't need to sort. We can assume any sorting
        // has been done
        let fullContentList = [];
        if (shouldSort) {
            fullContentList = sortCardsByDate(
                videos.concat(articles, podcasts)
            );
        } else {
            if (all && all.length > 0) {
                fullContentList = all;
            } else if (articles.length > 0) {
                fullContentList = articles;
            } else if (videos.length > 0) {
                fullContentList = videos;
            } else if (podcasts.length > 0) {
                fullContentList = podcasts;
            }
        }

        return (
            <>
                <Paginate limit={limit} data-test="card-list">
                    {fullContentList.map(contentType =>
                        renderContentTypeCard(contentType)
                    )}
                </Paginate>
            </>
        );
    }
);
