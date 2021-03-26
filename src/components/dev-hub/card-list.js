import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { AudioContext } from './audio-context';
import Card from './card';
import { withPrefix } from 'gatsby';
import Paginate from './paginate';
import { getNestedText } from '~utils/get-nested-text';
import { getTagLinksFromMeta } from '~utils/get-tag-links-from-meta';
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

const renderPodcast = (podcast, setActiveAudioNode) => (
    <Card
        key={podcast.mediaType + podcast.title}
        image={getThumbnailUrl(podcast)}
        title={podcast.title}
        badge={podcast.mediaType}
        description={podcast.description}
        onClick={() => setActiveAudioNode(podcast)}
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
        videos = videos || [];
        articles = articles || [];
        podcasts = podcasts || [];

        const fullContentList = sortCardsByDate(
            videos.concat(articles, podcasts)
        );

        const { activeAudioNode, setActiveAudioNode } = useContext(
            AudioContext
        );
        console.log(activeAudioNode, setActiveAudioNode);
        return (
            <>
                <Paginate limit={limit} data-test="card-list">
                    {fullContentList.map(contentType =>
                        renderContentTypeCard(contentType, setActiveAudioNode)
                    )}
                </Paginate>
            </>
        );
    }
);
