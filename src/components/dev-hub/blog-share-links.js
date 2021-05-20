import React, { useCallback, useMemo, useState } from 'react';
import copy from 'copy-to-clipboard';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { getArticleShareLinks } from '../../utils/get-article-share-links';
import { size } from './theme';
import SuccessIcon from './icons/success';
import LinkIcon from './icons/link-icon';
import LinkedIn from './icons/linkedin';
import FacebookIcon from './icons/facebook-icon';
import TwitterIcon from './icons/twitter-icon';
import Link from './link';

const hide = css`
    display: none;
`;

const BlogShareContainer = styled('div')`
    display: flex;
`;

const BlogShareLink = styled(Link)`
    display: inline-block;
    height: ${size.default};
    line-height: ${size.default};
    width: ${size.default};
    cursor: pointer;
    path {
        fill: ${({ theme }) => theme.colorMap.greyLightTwo};
    }
    &:hover {
        path {
            fill: ${({ consistentHoverColor, theme }) =>
                !consistentHoverColor && theme.colorMap.devWhite};
        }
    }
`;

const BlogShareLinks = ({
    isTop,
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
    const [showCopyMessage, setShowCopyMessage] = useState(false);
    const onCopyLink = useCallback(
        e => {
            e.preventDefault();
            copy(articleUrl);
            setShowCopyMessage(true);
            setTimeout(() => setShowCopyMessage(false), 2000);
        },
        [articleUrl]
    );
    const successIconId = useMemo(
        () => (isTop ? 'success-icon-top' : 'success-icon-bottom'),
        [isTop]
    );

    return (
        <BlogShareContainer {...props}>
            <BlogShareLink onClick={onCopyLink} css={showCopyMessage && hide}>
                <LinkIcon height={iconSize} width={iconSize} />
            </BlogShareLink>

            <BlogShareLink
                onClick={onCopyLink}
                css={!showCopyMessage && hide}
                consistentHoverColor={true}
            >
                <SuccessIcon
                    id={successIconId}
                    height={iconSize}
                    width={iconSize}
                />
            </BlogShareLink>

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
