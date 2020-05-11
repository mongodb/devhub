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

const sortCardsByDate = contentList =>
    contentList.sort((a, b) => {
        if (new Date(a.publishDate) > new Date(b.publishDate)) return -1;
        if (new Date(a.publishDate) < new Date(b.publishDate)) return 1;
        return 0;
    });

const showArticles = article => (
    <ArticleCard
        to={article['slug']}
        key={article['_id']}
        image={withPrefix(article['atf-image'])}
        tags={getTagLinksFromMeta(article)}
        title={getNestedText(article['title'])}
        description={getNestedText(article['meta-description'])}
    />
);

const showVideos = video => (
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
);

const showPodcasts = podcast => (
    <ArticleCard
        key={podcast.title}
        image={getThumbnailUrl(podcast)}
        title={podcast.title}
        description={podcast.description}
    />
);

const showAllContent = item => {
    if (item.mediaType)
        if (item.mediaType === 'youtube' || item.mediaType === 'twitch')
            return showVideos(item);
        else if (item.mediaType === 'podcast') return showPodcasts(item);

    return showArticles(item);
};

export default React.memo(({ videos, articles, podcasts, limit = 9 }) => {
    videos = videos || [];
    articles = articles || [];
    podcasts = podcasts || [];

    const fullContentList = sortCardsByDate(videos.concat(articles, podcasts));
    const [visibleCards, setVisibleCards] = useState(limit);

    const hasMore = fullContentList.length > visibleCards;

    return (
        <>
            <CardContainer>
                {fullContentList.length > 0 &&
                    fullContentList
                        .slice(0, visibleCards)
                        .map(item => showAllContent(item))}
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
