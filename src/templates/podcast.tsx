import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import ArticleSchema from '~components/dev-hub/article-schema';
import Layout from '~components/dev-hub/layout';
import PodcastJumbotron from '~components/dev-hub/podcast-jumbotron';
import SEO from '~components/dev-hub/SEO';
import styled from '@emotion/styled';
import { lineHeight, screenSize, size } from '~components/dev-hub/theme';
import { P } from '~components/dev-hub/text';
import AudioPlayer from '~components/dev-hub/podcast-player/audio-player';
import BlogShareLinks from '~components/dev-hub/blog-share-links';
import ShareFooter from '~components/dev-hub/article-share-footer';
import { useSiteMetadata } from '~hooks/use-site-metadata';
import { addTrailingSlashIfMissing } from '~utils/add-trailing-slash-if-missing';
import parse from 'html-react-parser';


const PODCAST_BREADCRUMB = [
    {
        label: 'Home',
        target: '/',
    },
    { 
        label: 'Learn', 
        target: '/learn' 
    },
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

const StyledParagraph = styled('p')`
    line-height: ${lineHeight.default};
    a {
            color: ${({ theme }) => theme.colorMap.devWhite};
            &:visited {
                color: ${({ theme }) => theme.colorMap.devWhite};
            }
            &:hover {
                color: ${({ theme }) => theme.colorMap.darkGreen};
            }
      }
`;

const StyledPlayer = styled(AudioPlayer)`
    margin-bottom: ${size.mediumLarge};

    @media ${screenSize.largeAndUp} {
        margin-bottom: ${size.large};
    }
`;

const StyledBlogShareLinks = styled(BlogShareLinks)`
    flex-direction: column;
    align-items: center;
    @media ${screenSize.largeAndUp} {
        > * {
                margin-bottom: ${size.medium};
            
        }
    }
    
    @media ${screenSize.upToLarge} {
        display: inline-flex;
        flex-direction: row;
       
        > * {
            margin-top: 0;
            margin-right: ${size.mediumLarge};
        }  
    }
`;

const StyledShareFooter = styled(ShareFooter)`
    a{
        margin-left: 0 !important;
        margin-right: ${size.medium};
    }
    
`;

const Podcast = ({
    pageContext: {
        data: {
            slug,
            description,
            rawDescription,
            publishDate,
            thumbnailUrl: image,
            title,
            url: podcastUrl,
        }
    },
}) => {
    const { siteUrl } = useSiteMetadata();
    const pageUrl = addTrailingSlashIfMissing(`${siteUrl}${slug}`);
    const parsedDescription = parse(rawDescription);

    const podcastBreadcrumb = useMemo(
        () => [
            ...PODCAST_BREADCRUMB,
            {
                label: 'Podcast',
                target: 'type/podcast'
            },
            {
                label: title,
                target: slug
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
                publishedDate={publishDate}
                imageUrl={image}
            />
            <PodcastJumbotron
                breadcrumb={podcastBreadcrumb}
                image={image}
                publishDate={publishDate}
                title={title}
            />
            <Container>
                <Icons>
                    <StyledBlogShareLinks
                        isTop
                        title={title}
                        tooltipText={TOOLTIP_TEXT}
                        url={pageUrl}
                    />
                </Icons>
                <Content>
                    <StyledPlayer podcast={podcastUrl} />
                    <StyledParagraph>{parsedDescription}</StyledParagraph>
                    <StyledShareFooter
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
            rawDescription: PropTypes.string,
            publishDate: PropTypes.string,
            thumbnailUrl: PropTypes.string,
            title: PropTypes.string,
            url: PropTypes.string,
        }),
        slug: PropTypes.string,
    }),
};

export default Podcast;
