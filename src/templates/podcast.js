import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import ArticleSchema from '~components/dev-hub/article-schema';
import AudioPlayer from '~components/dev-hub/podcast-player/audio-player';
import Layout from '~components/dev-hub/layout';
import PodcastJumbotron from '~components/dev-hub/podcast-jumbotron';
import SEO from '~components/dev-hub/SEO';
import ShareFooter from '~components/dev-hub/article-share-footer';
import BlogShareLinks, {
    BlogShareLink,
} from '../components/dev-hub/blog-share-links';
import { P } from '~components/dev-hub/text';
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
];

const TOOLTIP_TEXT = 'Podcast link copied to clipboard!';

const Container = styled('div')`
    margin: 0 auto;

    @media ${screenSize.largeAndUp} {
        display: flex;
        justify-content: center;
        margin-top: ${size.xxlarge};
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

const StyledParagraph = styled(P)`
    line-height: ${lineHeight.default};
`;

const StyledPlayer = styled(AudioPlayer)`
    margin-bottom: ${size.mediumLarge};

    @media ${screenSize.largeAndUp} {
        margin-bottom: ${size.large};
    }
`;

const StyledBlogShareLinks = styled(BlogShareLinks)`
    align-items: center;
    flex-direction: column;
    > :not(:first-child) {
        margin-top: ${size.medium};
    }
    @media ${screenSize.upToLarge} {
        display: inline-flex;
        flex-direction: row;
        > :not(:first-child) {
            margin-left: ${size.mediumLarge};
            margin-top: 0;
        }
    }
`;

const StyledFooter = styled(ShareFooter)`
    /* Target the copy link, although it is below some divs */
    ${BlogShareLink}:first-of-type {
        margin-left: 0;
    }
`;

const Podcast = ({
    pageContext: {
        data: {
            description,
            publishDate,
            thumbnailUrl: image,
            title,
            url: podcastUrl,
        },
        slug,
    },
}) => {
    const { siteUrl } = useSiteMetadata();
    const pageUrl = addTrailingSlashIfMissing(`${siteUrl}${slug}`);
    const formattedPublishDate = toDateString(publishDate, dateFormatOptions);

    const podcastBreadcrumb = useMemo(
        () => [
            ...PODCAST_BREADCRUMB,
            {
                label: 'Podcast',
                target: slug,
            },
        ],
        [slug]
    );

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
            />
            <ArticleSchema
                articleUrl={pageUrl}
                title={title}
                description={description}
                publishedDate={formattedPublishDate}
                imageUrl={image}
            />
            <PodcastJumbotron
                breadcrumb={podcastBreadcrumb}
                image={image}
                publishDate={formattedPublishDate}
                title={title}
            />
            <Container>
                <Icons>
                    <StyledBlogShareLinks
                        position="right"
                        title={title}
                        tooltipText={TOOLTIP_TEXT}
                        url={pageUrl}
                    />
                </Icons>
                <Content>
                    <StyledPlayer podcast={podcastUrl} />
                    <StyledParagraph>{description}</StyledParagraph>
                    <StyledFooter
                        title={title}
                        tooltipText={TOOLTIP_TEXT}
                        url={pageUrl}
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
        slug: PropTypes.string,
    }),
};

export default Podcast;
