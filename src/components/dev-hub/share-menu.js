import React, { useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { getArticleShareLinks } from '../../utils/get-article-share-links';
import Tooltip from './tooltip';
import ShareIcon from './icons/share-icon';
import LinkIcon from './icons/link-icon';
import FacebookIcon from './icons/facebook-icon';
import TwitterIcon from './icons/twitter-icon';
import Link from './link';
import { size } from './theme';
import LinkedIn from './icons/linkedin';
import copy from 'copy-to-clipboard';
import SuccessIcon from './icons/success';
import HoverTooltip from './hover-tooltip';
import { useTheme } from '@emotion/react';

const StyledShareIcon = styled(ShareIcon)`
    &:hover {
        path {
            fill: ${({ theme }) => theme.colorMap.devWhite};
        }
    }
`;
const SocialLink = styled(Link)`
    padding-right: ${size.default};
    text-decoration: none;
    ${({ isClickable }) => isClickable && 'cursor: pointer;'}
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
    const theme = useTheme();
    const [color, setColor] = useState(theme.colorMap.greyLightTwo);
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
            onMouseEnter={() =>
                isClickable && setColor(theme.colorMap.devWhite)
            }
            onMouseLeave={() =>
                isClickable && setColor(theme.colorMap.greyLightTwo)
            }
            href={href}
            target="_blank"
            isClickable={isClickable}
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
const ShareMenu = ({ title, Trigger, url, position = 'right', ...props }) => {
    const [showCopyMessage, setShowCopyMessage] = useState(false);
    const {
        articleUrl,
        facebookUrl,
        linkedInUrl,
        twitterUrl,
    } = getArticleShareLinks(title, url);
    const onCopyLink = useCallback(
        e => {
            e.preventDefault();
            copy(articleUrl);
            setShowCopyMessage(true);
            setTimeout(() => setShowCopyMessage(false), 2000);
        },
        [articleUrl]
    );

    const TriggerComponent = Trigger || (
        <HoverTooltip
            trigger={<StyledShareIcon {...props} />}
            text="Share"
            {...props}
        />
    );

    return (
        <Tooltip
            hasGradientBorder
            position={position}
            trigger={TriggerComponent}
        >
            <Contents>
                <SocialIcon css={!showCopyMessage && hide} type="success" />
                <SocialIcon
                    css={showCopyMessage && hide}
                    type="shareLink"
                    onClick={onCopyLink}
                />
                <SocialIcon type="facebook" href={facebookUrl} />
                <SocialIcon type="twitter" href={twitterUrl} />
                <SocialIcon type="linkedin" href={linkedInUrl} />
            </Contents>
        </Tooltip>
    );
};

export default ShareMenu;
