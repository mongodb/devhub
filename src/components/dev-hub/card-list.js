import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { useLocation } from '@reach/router';
import Audio from './audio';
import Card from './card';
import Button from './button';
import { screenSize, size } from './theme';
import { withPrefix } from 'gatsby';
import { removePathPrefixFromUrl } from '../../utils/remove-path-prefix-from-url';
import { buildQueryString, parseQueryString } from '../../utils/query-string';
import { getNestedText } from '../../utils/get-nested-text';
import { getTagLinksFromMeta } from '../../utils/get-tag-links-from-meta';
import getTwitchThumbnail from '../../utils/get-twitch-thumbnail';

const CARD_LIST_LIMIT = 12;

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
`;

const HasMoreButtonContainer = styled('div')`
    margin-bottom: ${size.large};
    margin-top: ${size.large};
    text-align: center;
`;

const getThumbnailUrl = media => {
    return media.mediaType === 'twitch'
        ? getTwitchThumbnail(media.thumbnailUrl)
        : media.thumbnailUrl;
};

/* Different content types currently have different APIs for accessing dates.
 * Articles support `pubdate` and `updated-date` while Podcasts and Videos have publishDate
 * a TODO is to reconsile these APIs
 */
const sortCardsByDate = contentList =>
    contentList.sort(
        (a, b) =>
            new Date(b['updated-date'] || b.publishDate || b.pubdate) -
            new Date(a['updated-date'] || a.publishDate || a.pubdate)
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
        key={video.mediaType + video.title}
        image={getThumbnailUrl(video)}
        videoModalThumbnail={getThumbnailUrl(video)}
        title={video.title}
        badge={video.mediaType}
        description={video.description}
        video={video}
    />
);

const renderPodcast = (podcast, openAudio) => (
    <Card
        key={podcast.mediaType + podcast.title}
        image={getThumbnailUrl(podcast)}
        title={podcast.title}
        badge={podcast.mediaType}
        description={podcast.description}
        onClick={() => openAudio(podcast)}
    />
);

const renderContentTypeCard = (item, openAudio) => {
    if (item.mediaType)
        switch (item.mediaType) {
            case 'youtube':
            case 'twitch':
                return renderVideo(item);
            case 'podcast':
                return renderPodcast(item, openAudio);
            default:
                return;
        }

    return renderArticle(item);
};

export default React.memo(
    ({ videos, articles, podcasts, limit = CARD_LIST_LIMIT }) => {
        const { pathname, search } = useLocation();
        const localPage = removePathPrefixFromUrl(pathname);
        // Build next link, preserving other links
        const nextPageLink = useMemo(() => {
            // Get page if exists from search
            const { page = 1, ...params } = parseQueryString(search);
            // Have to parseInt because string + number gives a string
            const pageNumber = parseInt(page) + 1;
            return (
                localPage + buildQueryString({ page: pageNumber, ...params })
            );
        }, [localPage, search]);

        useEffect(() => {
            const { page = 1 } = parseQueryString(search);
            setVisibleCards(page * limit);
        }, [limit, search]);
        // Prevent jump to top
        videos = videos || [];
        articles = articles || [];
        podcasts = podcasts || [];

        const fullContentList = sortCardsByDate(
            videos.concat(articles, podcasts)
        );
        const { page = 1 } = parseQueryString(search);
        const [visibleCards, setVisibleCards] = useState(page * limit);

        const hasMore = fullContentList.length > visibleCards;
        const [activePodcast, setActivePodcast] = useState(false);

        const openAudio = useCallback(podcast => {
            setActivePodcast(podcast);
        }, []);
        const closeAudio = useCallback(e => {
            e.stopPropagation();
            setActivePodcast(null);
        }, []);

        return (
            <>
                <CardContainer data-test="card-list">
                    {fullContentList
                        .slice(0, visibleCards)
                        .map(contentType =>
                            renderContentTypeCard(contentType, openAudio)
                        )}
                </CardContainer>

                {hasMore && (
                    <HasMoreButtonContainer>
                        <Button secondary pagination to={nextPageLink}>
                            Load more
                        </Button>
                    </HasMoreButtonContainer>
                )}
                {podcasts.length ? (
                    <Audio onClose={closeAudio} podcast={activePodcast} />
                ) : null}
            </>
        );
    }
);
