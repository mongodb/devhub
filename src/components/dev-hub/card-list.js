import React, { useState } from 'react';
import styled from '@emotion/styled';
import Card from './card';
import Button from './button';
import { screenSize, size } from './theme';
import { withPrefix } from 'gatsby';
import { getNestedText } from '../../utils/get-nested-text';
import { getTagLinksFromMeta } from '../../utils/get-tag-links-from-meta';
import getTwitchThumbnail from '../../utils/get-twitch-thumbnail';

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
    contentList.sort(
        (a, b) =>
            new Date(b.publishDate || b.pubdate) -
            new Date(a.publishDate || a.pubdate)
    );

const renderArticle = article => (
    <ArticleCard
        to={article['slug']}
        key={article['_id']}
        image={withPrefix(article['atf-image'])}
        tags={getTagLinksFromMeta(article)}
        title={getNestedText(article['title'])}
        badge="article"
        description={getNestedText(article['meta-description'])}
    />
);

const renderVideo = video => (
    <VideoCard
        key={video.title}
        image={getThumbnailUrl(video)}
        videoModalThumbnail={getThumbnailUrl(video)}
        title={video.title}
        badge={video.mediaType}
        description={video.description}
        video={video}
    />
);

const renderPodcast = podcast => (
    <ArticleCard
        key={podcast.title}
        image={getThumbnailUrl(podcast)}
        title={podcast.title}
        badge={podcast.mediaType}
        description={podcast.description}
    />
);

const renderContentTypeCard = item => {
    if (item.mediaType)
        switch (item.mediaType) {
            case 'youtube':
            case 'twitch':
                return renderVideo(item);
            case 'podcast':
                return renderPodcast(item);
            default:
                return;
        }

    return renderArticle(item);
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
                {fullContentList
                    .slice(0, visibleCards)
                    .map(renderContentTypeCard)}
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
