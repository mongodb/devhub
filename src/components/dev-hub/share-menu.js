import React, { useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import Tooltip from './tooltip';
import ShareIcon from './icons/share-icon';
import LinkIcon from './icons/link-icon';
import FacebookIcon from './icons/facebook-icon';
import TwitterIcon from './icons/twitter-icon';
import Link from './link';
import { colorMap, size } from './theme';
import LinkedIn from './icons/linkedin';
import copy from 'copy-to-clipboard';
import SuccessIcon from './icons/success';
import HoverTooltip from './hover-tooltip';

const StyledShareIcon = styled(ShareIcon)`
    &:hover {
        path {
            fill: ${colorMap.devWhite};
        }
    }
`;
const SocialLink = styled(Link)`
    padding-right: ${size.default};
    text-decoration: none;
    &:after {
        content: '';
    }
    &:last-of-type {
        padding-right: 0;
    }
`;
const Contents = styled('div')`
    align-items: center;
    display: flex;
    flex-direction: row;
`;
const hide = css`
    display: none;
`;
const SocialIcon = ({ type, href, ...props }) => {
    const [color, setColor] = useState(colorMap.greyLightTwo);
    const iconMap = {
        facebook: FacebookIcon,
        shareLink: LinkIcon,
        twitter: TwitterIcon,
        linkedin: LinkedIn,
        success: SuccessIcon,
    };
    const Icon = iconMap[type];
    const isClickable = href || props.onClick;
    return (
        <SocialLink
            onMouseEnter={() => isClickable && setColor(colorMap.devWhite)}
            onMouseLeave={() => isClickable && setColor(colorMap.greyLightTwo)}
            href={href}
            target="_blank"
            {...props}
        >
            <Icon color={color} width={size.default} height={size.default} />
        </SocialLink>
    );
};
/**
 * @param {Object<string, any>} props
 * @property {string} props.url
 */
const ShareMenu = ({ url, ...props }) => {
    const [showCopyMessage, setShowCopyMessage] = useState(false);
    const onCopyLink = useCallback(
        e => {
            e.preventDefault();
            copy(url);
            setShowCopyMessage(true);
            setTimeout(() => setShowCopyMessage(false), 2000);
        },
        [url]
    );

    return (
        <Tooltip
            hasGradientBorder
            position={'right'}
            trigger={
                <HoverTooltip
                    trigger={<StyledShareIcon {...props} />}
                    text="Share"
                    {...props}
                />
            }
        >
            <Contents>
                <SocialIcon css={!showCopyMessage && hide} type="success" />
                <SocialIcon
                    css={showCopyMessage && hide}
                    type="shareLink"
                    onClick={onCopyLink}
                />
                <SocialIcon
                    type="facebook"
                    href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
                />
                <SocialIcon
                    type="twitter"
                    href={`https://twitter.com/intent/tweet?url=${url}`}
                />
                <SocialIcon
                    type="linkedin"
                    href={`https://www.linkedin.com/shareArticle?url=${url}`}
                />
            </Contents>
        </Tooltip>
    );
};

export default ShareMenu;
