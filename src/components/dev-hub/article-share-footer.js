import React, { useCallback } from 'react';
import copy from 'copy-to-clipboard';
import styled from '@emotion/styled';
import { getArticleShareLinks } from '../../utils/get-article-share-links';
import BlogTagList from './blog-tag-list';
import { screenSize, size } from './theme';
import Link from './link';
import Tooltip from './tooltip';
import LinkIcon from './icons/link-icon';
import LinkedIn from './icons/linkedin';
import FacebookIcon from './icons/facebook-icon';
import TwitterIcon from './icons/twitter-icon';

const ArticleShareArea = styled('div')`
    border-top: 1px solid ${({ theme }) => theme.colorMap.greyDarkTwo};
    display: flex;
    justify-content: space-between;
    margin-bottom: ${size.large};
    margin-top: ${size.xlarge};
    padding-top: ${size.medium};
    @media ${screenSize.upToMedium} {
        margin-top: ${size.large};
    }
`;

const BlogShareLinks = styled('div')`
    span,
    a:not(:last-of-type) {
        margin-right: ${size.medium};
    }
`;

const ArticleShareFooter = ({ tags, title, url }) => {
    const onCopyLink = useCallback(() => {
        copy(url);
    }, [url]);
    const { facebookUrl, linkedInUrl, twitterUrl } = getArticleShareLinks(
        title,
        url
    );
    return (
        <ArticleShareArea>
            <BlogTagList tags={tags} />
            <BlogShareLinks data-test="article-share-links">
                <Tooltip
                    position="bottom"
                    trigger={
                        <Link onClick={onCopyLink}>
                            <LinkIcon />
                        </Link>
                    }
                >
                    Article link copied to clipboard!
                </Tooltip>

                <Link target="_blank" href={linkedInUrl}>
                    <LinkedIn />
                </Link>

                <Link target="_blank" href={twitterUrl}>
                    <TwitterIcon />
                </Link>
                <Link target="_blank" href={facebookUrl}>
                    <FacebookIcon height="22" width="22" />
                </Link>
            </BlogShareLinks>
        </ArticleShareArea>
    );
};

export default ArticleShareFooter;
