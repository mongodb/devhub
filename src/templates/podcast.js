import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import ArticleSchema from '~components/dev-hub/article-schema';
import AudioPlayer from '~components/dev-hub/podcast-player/audio-player';
import Layout from '~components/dev-hub/layout';
import PodcastJumbotron from '~components/dev-hub/podcast-jumbotron';
import SEO from '~components/dev-hub/SEO';
import ShareFooter from '~components/dev-hub/article-share-footer';
import ShareMenu from '~components/dev-hub/share-menu';

import { addTrailingSlashIfMissing } from '~utils/add-trailing-slash-if-missing';
import { useSiteMetadata } from '~hooks/use-site-metadata';

import { lineHeight, screenSize, size } from '~components/dev-hub/theme';
import { toDateString } from '~utils/format-dates';
import { dateFormatOptions } from '~src/constants';

const PODCAST_BREADCRUMB = [
    {
        label: 'Home',
        target: '/',
    },
    { label: 'Learn', target: '/learn' },
    {
        label: 'Podcasts',
        target: '/podcasts',
    },
];

const TOOLTIP_TEXT = 'Podcast link copied to clipboard!';

const Container = styled('div')`
    margin: 0 auto;

    @media ${screenSize.largeAndUp} {
        display: flex;
        justify-content: center;
        margin-top: 100px;
    }
`;

const Icons = styled('div')`
    margin: 0 ${size.small};

    span {
        &:not(:first-of-type) {
            margin-left: ${size.small};
        }
        padding: 0 ${size.tiny};
    }

    @media ${screenSize.largeAndUp} {
        display: flex;
        flex-direction: column;
        margin: 0 ${size.default};

        span:not(:first-of-type) {
            margin-top: ${size.small};
        }
    }
`;

const Content = styled('article')`
    margin: 0 auto;
    max-width: ${size.maxContentWidth};
    padding-left: ${size.small};
    padding-right: ${size.small};
    width: 100%;

    @media ${screenSize.largeAndUp} {
        margin: initial;
    }
`;

const StyledParagraph = styled('p')`
    line-height: ${lineHeight.default};
`;

const StyledPlayer = styled(AudioPlayer)`
    margin-bottom: ${size.mediumLarge};

    @media ${screenSize.largeAndUp} {
        margin-bottom: 40px;
    }
`;

const Podcast = ({
    pageContext: {
        data: {
            url: podcastUrl,
            description,
            publishDate,
            thumbnailUrl: image,
            title,
        },
    },
    path: slug,
}) => {
    const { siteUrl } = useSiteMetadata();
    const pageUrl = addTrailingSlashIfMissing(`${siteUrl}${slug}`);
    const formattedPublishDate = toDateString(publishDate, dateFormatOptions);

    return (
        <Layout includeCanonical={false}>
            <SEO
                articleTitle={title}
                canonicalUrl={pageUrl}
                image={image}
                metaDescription={description}
                ogDescription={description}
                ogTitle={title}
                ogUrl={pageUrl}
                twitter={{
                    description,
                    image,
                    title,
                }}
                type="music.song"
            />
            <ArticleSchema
                articleUrl={pageUrl}
                title={title}
                description={description}
                publishedDate={formattedPublishDate}
                imageUrl={image}
            />
            <PodcastJumbotron
                breadcrumb={PODCAST_BREADCRUMB}
                image={image}
                publishDate={formattedPublishDate}
                title={title}
            />
            <Container>
                <Icons>
                    <ShareMenu
                        height={size.default}
                        title={title}
                        url={pageUrl}
                        width={size.default}
                    />
                </Icons>
                <Content>
                    <StyledPlayer podcast={podcastUrl} />
                    <StyledParagraph>{description}</StyledParagraph>
                    <ShareFooter
                        title={title}
                        tooltipText={TOOLTIP_TEXT}
                        url={podcastUrl}
                    />
                </Content>
            </Container>
        </Layout>
    );
};

Podcast.propTypes = {
    pageContext: PropTypes.shape({
        data: PropTypes.shape({
            description: PropTypes.string,
            publishDate: PropTypes.string,
            thumbnailUrl: PropTypes.string,
            title: PropTypes.string,
            url: PropTypes.string,
        }),
    }),
    path: PropTypes.string,
};

export default Podcast;
