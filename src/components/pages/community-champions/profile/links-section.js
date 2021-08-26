import React from 'react';
import styled from '@emotion/styled';
import {
    fontSize,
    lineHeight,
    screenSize,
    size,
} from '~components/dev-hub/theme';
import { H4, H6, P2 } from '~components/dev-hub/text';
import Link from '~components/dev-hub/link';
import LinkedinIcon from '~components/dev-hub/icons/linkedin';
import FacebookIcon from '~components/dev-hub/icons/facebook-icon';
import TwitterIcon from '~components/dev-hub/icons/twitter-icon';
import GithubIcon from '~components/dev-hub/icons/github';
import TwitchIcon from '~components/dev-hub/icons/twitch';
import YoutubeIcon from '~components/dev-hub/icons/youtube';

const COLUMN_GAP = '86px';
const LINK_CONTAINER_WIDTH = '256px';
const LINK_ROW_GAP = '4px';
const MOBILE_BOTTOM_MARGIN = '48px';
const SOCIAL_LINKS_GRID_COLUMN_GAP = '48px';
const SOCIAL_LINK_MIN_WIDTH = '86px';

const Title = styled(H4)`
    margin-bottom: ${size.mediumLarge};
    @media ${screenSize.upToSmallDesktop} {
        margin-bottom: ${size.default};
    }
    @media ${screenSize.upToMedium} {
        font-size: ${fontSize.medium};
        line-height: 30px;
    }
`;

const Subtitle = styled(H6)`
    color: ${({ theme }) => theme.colorMap.greyLightThree};
    font-weight: bold;
    letter-spacing: 0.1em;
    margin-bottom: ${size.xsmall};
    text-transform: uppercase;
    @media ${screenSize.upToMedium} {
        font-size: ${fontSize.small};
        line-height: ${lineHeight.small};
    }
`;

const Grid = styled('div')`
    column-gap: ${COLUMN_GAP};
    display: grid;
    grid-template-columns: repeat(2, max-content);
    margin-bottom: ${size.xlarge};
    @media ${screenSize.upToSmallDesktop} {
        grid-template-columns: auto;
        margin-bottom: ${MOBILE_BOTTOM_MARGIN};
        row-gap: ${size.large};
    }
`;

const BlogsAndPublicationsLinksContainer = styled('div')`
    display: flex;
    flex-direction: column;
    row-gap: ${LINK_ROW_GAP};
    width: ${LINK_CONTAINER_WIDTH};
    @media ${screenSize.upToSmallDesktop} {
        width: 100%;
    }
`;

const BlogsAndPublicationsLink = styled(Link)`
    font-size: ${fontSize.small};
    line-height: ${lineHeight.small};
    max-width: max-content;
`;

const BlogsAndPublications = ({ blogsAndPublications }) => (
    <div>
        <Subtitle collapse>Blogs &amp; Publications</Subtitle>
        <BlogsAndPublicationsLinksContainer>
            {blogsAndPublications.map(({ id, title, link }) => (
                <BlogsAndPublicationsLink key={id} href={link} target="_blank">
                    {title}
                </BlogsAndPublicationsLink>
            ))}
        </BlogsAndPublicationsLinksContainer>
    </div>
);

const SocialLinkItemContainer = styled(Link)`
    align-items: center;
    column-gap: ${size.xsmall};
    display: grid;
    grid-template-columns: ${size.default} auto;
    text-decoration: none;
    path {
        fill: ${({ theme }) => theme.colorMap.devWhite};
    }
    &:hover {
        path {
            fill: ${({ theme }) => theme.colorMap.darkGreen};
        }
    }
`;

const SocialLinksContainer = styled('div')`
    column-gap: ${SOCIAL_LINKS_GRID_COLUMN_GAP};
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: repeat(2, max-content);
    grid-template-rows: repeat(3, auto);
    row-gap: ${size.xsmall};
    @media ${screenSize.upToSmallDesktop} {
        column-gap: ${size.mediumLarge};
        grid-auto-flow: row;
        grid-template-columns: repeat(3, max-content);
        grid-template-rows: repeat(2, auto);
    }
    @media ${screenSize.upToSmall} {
        grid-template-columns: repeat(
            auto-fill,
            minmax(${SOCIAL_LINK_MIN_WIDTH}, 1fr)
        );
        grid-template-rows: none;
    }
`;

const SocialLinkText = styled(P2)`
    @media ${screenSize.upToMedium} {
        font-size: ${fontSize.small};
        line-height: ${lineHeight.small};
    }
`;

const SocialLink = ({ icon, link, type }) => (
    <SocialLinkItemContainer href={link} target="_blank">
        {icon}
        <SocialLinkText collapse>{type}</SocialLinkText>
    </SocialLinkItemContainer>
);

const Socials = ({ socials }) => {
    const links = [
        {
            type: 'LinkedIn',
            url: socials.linkedinUrl,
            Icon: LinkedinIcon,
        },
        {
            type: 'GitHub',
            url: socials.githubUrl,
            Icon: GithubIcon,
        },
        {
            type: 'Twitch',
            url: socials.twitchUrl,
            Icon: TwitchIcon,
        },
        {
            type: 'YouTube',
            url: socials.youtubeUrl,
            Icon: YoutubeIcon,
        },
        {
            type: 'Facebook',
            url: socials.facebookUrl,
            Icon: FacebookIcon,
        },
        {
            type: 'Twitter',
            url: socials.twitterUrl,
            Icon: TwitterIcon,
        },
    ];
    return (
        <div>
            <Subtitle collapse>Social</Subtitle>
            <SocialLinksContainer>
                {links.map(
                    ({ type, url, Icon }) =>
                        url && (
                            <SocialLink
                                key={type}
                                icon={
                                    <Icon
                                        height={size.default}
                                        width={size.default}
                                    />
                                }
                                type={type}
                                link={url}
                            />
                        )
                )}
            </SocialLinksContainer>
        </div>
    );
};

const LinksSection = ({ blogsAndPublications, firstName, socials }) => (
    <div>
        <Title>Follow {firstName}</Title>
        <Grid>
            {blogsAndPublications && (
                <BlogsAndPublications
                    blogsAndPublications={blogsAndPublications}
                />
            )}
            {socials && <Socials socials={socials} />}
        </Grid>
    </div>
);

export default LinksSection;
