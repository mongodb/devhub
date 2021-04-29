import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import Layout from '~components/dev-hub/layout';
import PodcastJumbotron from '~components/dev-hub/podcast-jumbotron';
import ShareFooter from '~components/dev-hub/article-share-footer';
import ShareMenu from '~components/dev-hub/share-menu';

import { addTrailingSlashIfMissing } from '~utils/add-trailing-slash-if-missing';
import { toDateString } from '~utils/format-dates';
import { useSiteMetadata } from '~hooks/use-site-metadata';

import { screenSize, size } from '~components/dev-hub/theme';
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
    }
`;

const Icons = styled('div')`
    margin: ${size.tiny} ${size.default};
    span {
        padding: 0 ${size.tiny};
    }

    @media ${screenSize.largeAndUp} {
        display: flex;
        flex-direction: column;
        span:not(:first-of-type) {
            margin-top: ${size.small};
        }
    }
    @media ${screenSize.upToLarge} {
        margin: 0 ${size.small};
        span:not(:first-of-type) {
            margin-left: ${size.small};
        }
    }
`;

const Content = styled('article')`
    max-width: ${size.maxContentWidth};
    padding-left: ${size.small};
    padding-right: ${size.small};
    width: 100%;

    @media ${screenSize.upToLarge} {
        margin: 0 auto;
    }
`;

const Podcast = ({
    pageContext: {
        data: { publishDate, title, thumbnailUrl: imageUrl },
    },
    path: slug,
}) => {
    const formattedPublishedDate = toDateString(publishDate, dateFormatOptions);
    const { siteUrl } = useSiteMetadata();
    const podcastUrl = addTrailingSlashIfMissing(`${siteUrl}${slug}`);

    return (
        <Layout includeCanonical={false}>
            <PodcastJumbotron
                title={title}
                image={imageUrl}
                publishDate={formattedPublishedDate}
                breadcrumb={PODCAST_BREADCRUMB}
            />
            <Container>
                <Icons>
                    <ShareMenu
                        title={title}
                        url={podcastUrl}
                        height={size.default}
                        width={size.default}
                    />
                </Icons>
                <Content>
                    <div>TODO: Player</div>
                    <div>TODO: Some Text</div>
                    <ShareFooter
                        tooltipText={TOOLTIP_TEXT}
                        title={title}
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
            publishDate: PropTypes.string,
            title: PropTypes.string,
            thumbnailUrl: PropTypes.string,
        }),
    }),
    path: PropTypes.string,
};

export default Podcast;
