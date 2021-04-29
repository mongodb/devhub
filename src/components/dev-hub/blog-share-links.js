import React, { useCallback } from 'react';
import copy from 'copy-to-clipboard';
import styled from '@emotion/styled';
import { getArticleShareLinks } from '../../utils/get-article-share-links';
import LinkIcon from './icons/link-icon';
import LinkedIn from './icons/linkedin';
import FacebookIcon from './icons/facebook-icon';
import TwitterIcon from './icons/twitter-icon';
import Link from './link';
import Tooltip from './tooltip';

const BlogShareContainer = styled('div')`
    display: flex;
`;

const BlogShareLink = styled(Link)`
    height: 16px;
    line-height: 16px;
    width: 16px;
`;

const StyledTooltip = styled(Tooltip)`
    /* span { */
    line-height: 16px;
    /* } */
`;

const BlogShareLinks = ({ tags, title, url, ...props }) => {
    const {
        articleUrl,
        facebookUrl,
        linkedInUrl,
        twitterUrl,
    } = getArticleShareLinks(title, url);
    const onCopyLink = useCallback(() => {
        copy(articleUrl);
    }, [articleUrl]);
    return (
        <BlogShareContainer {...props}>
            <StyledTooltip
                position="right"
                trigger={
                    <BlogShareLink onClick={onCopyLink}>
                        <LinkIcon height="16" width="16" />
                    </BlogShareLink>
                }
            >
                Article link copied to clipboard!
            </StyledTooltip>

            <BlogShareLink target="_blank" href={linkedInUrl}>
                <LinkedIn height="16" width="16" />
            </BlogShareLink>

            <BlogShareLink target="_blank" href={twitterUrl}>
                <TwitterIcon height="16" width="16" />
            </BlogShareLink>
            <BlogShareLink target="_blank" href={facebookUrl}>
                <FacebookIcon height="16" width="16" />
            </BlogShareLink>
        </BlogShareContainer>
    );
};

export default BlogShareLinks;
