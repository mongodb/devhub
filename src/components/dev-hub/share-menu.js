import React, { useState } from 'react';
import styled from '@emotion/styled';
import Tooltip from './tooltip';
import ShareIcon from './icons/share-icon';
import LinkIcon from './icons/link-icon';
import FacebookIcon from './icons/facebook-icon';
import TwitterIcon from './icons/twitter-icon';
import Link from './link';
import { colorMap, size } from './theme';

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

const SocialIcon = ({ type, href }) => {
    const [color, setColor] = useState(colorMap.greyLightTwo);
    const iconMap = {
        facebook: FacebookIcon,
        shareLink: LinkIcon,
        twitter: TwitterIcon,
    };
    const Icon = iconMap[type];
    return (
        <SocialLink
            onMouseEnter={() => setColor(colorMap.devWhite)}
            onMouseLeave={() => setColor(colorMap.greyLightTwo)}
            href={href}
        >
            <Icon color={color} />
        </SocialLink>
    );
};
/**
 * @param {Object<string, any>} props
 * @property {string} props.facebook
 * @property {string} props.shareLink
 * @property {string} props.twitter
 */

// TODO: Continue to add different social links based on how
// we want dev-hub content shared
const ContentsMenu = ({ facebook, shareLink, twitter }) => {
    const [activeItem, setActiveItem] = useState(null);

    return (
        <Tooltip hasGradientBorder position={'right'} trigger={<ShareIcon />}>
            <Contents>
                {shareLink && <SocialIcon type="shareLink" href={shareLink} />}
                {facebook && <SocialIcon type="facebook" href={facebook} />}
                {twitter && <SocialIcon type="twitter" href={twitter} />}
            </Contents>
        </Tooltip>
    );
};

export default ContentsMenu;
