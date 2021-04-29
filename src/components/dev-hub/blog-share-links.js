import React, { useCallback } from 'react';
import copy from 'copy-to-clipboard';
import styled from '@emotion/styled';
import { getArticleShareLinks } from '../../utils/get-article-share-links';
import { size } from './theme';
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
    display: inline-block;
    height: ${size.default};
    line-height: ${size.default};
    width: ${size.default};
`;

const StyledTooltip = styled(Tooltip)`
    line-height: ${size.default};
`;

const BlogShareLinks = ({
    iconSize = size.default,
    tags,
    title,
    url,
    ...props
}) => {
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
                        <LinkIcon height={iconSize} width={iconSize} />
                    </BlogShareLink>
                }
            >
                Article link copied to clipboard!
            </StyledTooltip>

            <BlogShareLink target="_blank" href={linkedInUrl}>
                <LinkedIn height={iconSize} width={iconSize} />
            </BlogShareLink>

            <BlogShareLink target="_blank" href={twitterUrl}>
                <TwitterIcon height={iconSize} width={iconSize} />
            </BlogShareLink>
            <BlogShareLink target="_blank" href={facebookUrl}>
                <FacebookIcon height={iconSize} width={iconSize} />
            </BlogShareLink>
        </BlogShareContainer>
    );
};

export default BlogShareLinks;
