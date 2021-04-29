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
        </BlogShareContainer>
    );
};

export default BlogShareLinks;
