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
    contentList.sort((a, b) => {
        const date1 =
            b.isOriginallySnooty != true
                ? b.updatedDate || b.publishedDate || b.publishDate
                : b.publishedDate || b.publishDate || b.updatedDate;
        const date2 =
            a.isOriginallySnooty != true
                ? a.updatedDate || a.publishedDate || a.publishDate
                : a.publishedDate || a.publishDate || a.updatedDate;
        return new Date(date1) - new Date(date2);
    });

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
        tags={[...video.products, ...video.languages, ...video.tags]}
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
        tags={[...podcast.products, ...podcast.languages, ...podcast.tags]}
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

        let fullContentList =
            all && all.length > 0 ? all : videos.concat(articles, podcasts);
        if (shouldSort) {
            fullContentList = sortCardsByDate(fullContentList);
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
