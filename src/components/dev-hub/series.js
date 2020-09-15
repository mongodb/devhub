import React from 'react';
import { withPrefix } from 'gatsby';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import Link from './link';
import { H5, P3 } from './text';
import { fontSize, layer, lineHeight, screenSize, size } from './theme';

const MAX_CONTENT_WIDTH = '410px';
const PAST_LINK_COLOR = '#89989b';

// Needed to allow more magenta to account for proper text coloring
const BULLET_GRADIENT = theme => css`
    linear-gradient(
        315deg,
        ${theme.colorMap.sherbet} 0%,
        ${theme.colorMap.salmon} 40%,
        ${theme.colorMap.magenta} 100%
    )
`;

const BORDER_GRADIENT = theme => css`
    linear-gradient(
        0deg,
        ${theme.colorMap.sherbet} 0%,
        ${theme.colorMap.salmon} 49.99%,
        ${theme.colorMap.magenta} 100%
    )
`;

const activeLiStyles = css`
    font-size: ${fontSize.xsmall};
    padding-left: 1px;
    line-height: ${lineHeight.small};
    &:after {
        /* Adjust the background bullet position for the bull's eye text */
        top: -1px;
    }
`;

const activeLinkStyles = css`
    font-weight: bold;
`;
const pastLinkStyles = theme => css`
    color: ${PAST_LINK_COLOR};
    &:visited {
        color: ${PAST_LINK_COLOR};
    }
    &:hover {
        color: ${theme.colorMap.darkGreen};
    }
`;

const Breadcrumb = styled('li')`
    display: flex;
    padding-bottom: ${size.mediumLarge};
    position: relative;
    z-index: ${layer.back};
    :last-of-type {
        padding-bottom: 0;
        > div {
            &:before {
                background: ${({ theme }) => theme.colorMap.greyDarkThree};
                content: '';
                top: ${size.small};
                height: 100%;
                width: 100%;
                position: absolute;
                z-index: ${layer.superBack};
            }
        }
    }
`;

const DescriptiveText = styled(P3)`
    color: ${({ theme }) => theme.colorMap.greyLightThree};
`;

const SeriesBreadcrumbs = styled('div')`
    border-radius: 0 0 ${size.small} ${size.small};
    background-color: ${({ theme }) => theme.colorMap.greyDarkThree};
    flex: 1;
    margin: 0;
    padding: ${size.large} 40px;
    overflow: hidden;
`;

const SeriesContainer = styled('div')`
    display: flex;
    flex-direction: column;
    margin-bottom: ${size.large};
    @media ${screenSize.upToMedium} {
        margin-bottom: ${size.medium};
    }
`;

const SeriesLink = styled(Link)`
    font-family: 'Fira Mono', monospace;
    font-size: ${fontSize.small};
    line-height: ${lineHeight.small};
    max-width: ${MAX_CONTENT_WIDTH};
    text-decoration: none;
    ${({ isActive }) => isActive && activeLinkStyles};
    ${({ isPast, theme }) => isPast && pastLinkStyles(theme)};
`;

const BulletIcon = styled('div')`
    background: ${({ theme }) => BULLET_GRADIENT(theme)};
    background-clip: text;
    display: inline-block;
    font-family: 'Fira Mono', monospace;
    font-size: ${fontSize.large};
    line-height: ${lineHeight.tiny};
    margin-right: ${size.medium};
    position: relative;
    text-align: left;
    vertical-align: top;
    width: ${size.default};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    /* Create a bullet to match the bg to hide border passing through */
    &:after {
        background: ${({ theme }) => theme.colorMap.greyDarkThree};
        background-clip: text;
        content: '\u25CF';
        left: 0;
        font-family: 'Fira Mono', monospace;
        font-size: ${fontSize.large};
        margin-right: ${size.small};
        position: absolute;
        width: ${size.default};
        z-index: ${layer.superBack};
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    @media ${screenSize.upToMedium} {
        margin-right: ${size.medium};
    }
`;

const SeriesList = styled('ul')`
    list-style: none;
    margin-bottom: 0;
    margin-top: 0;
    padding-left: 0;
    position: relative;
    /* Dashed border line */
    &:after {
        background-image: linear-gradient(
                0deg,
                transparent,
                transparent 50%,
                ${({ theme }) => theme.colorMap.greyDarkThree} 50%,
                ${({ theme }) => theme.colorMap.greyDarkThree} 100%
            ),
            ${({ theme }) => BORDER_GRADIENT(theme)};
        background-size: ${size.medium} 2px, cover;
        bottom: 0;
        content: '';
        left: 6px;
        position: absolute;
        top: ${size.default};
        width: 1px;
    }
`;

const SeriesNameContainer = styled('div')`
    background-color: ${({ theme }) => theme.colorMap.greyDarkTwo};
    border-radius: ${size.small} ${size.small} 0 0;
    flex: 1;
    padding: ${size.default} ${size.mediumLarge};
`;

const SeriesIcon = ({ isActive, isPast, isUpcoming }) => (
    <BulletIcon css={isActive && activeLiStyles}>
        {/* x25C9 is bull's eye bullet, x25CB is hollow bullet, x25CF is filled bullet */}
        {isActive && <>&#x25C9;</>}
        {isPast && <>&#x25CB;</>}
        {isUpcoming && <>&#x25CF;</>}
    </BulletIcon>
);

const Series = ({ children, name }) => (
    <SeriesContainer data-test="series">
        <SeriesNameContainer>
            <DescriptiveText collapse>More from this series</DescriptiveText>
            <H5 collapse>{name}</H5>
        </SeriesNameContainer>
        <SeriesBreadcrumbs>
            <SeriesList>
                {children.map(({ position, title, slug }) => {
                    // TODO: Add styling for past and upcoming series articles
                    const isActive = position === 'active';
                    const isPast = position === 'past';
                    const isUpcoming = position === 'upcoming';
                    return (
                        <Breadcrumb>
                            <SeriesIcon
                                isActive={isActive}
                                isPast={isPast}
                                isUpcoming={isUpcoming}
                            />
                            <SeriesLink
                                isActive={isActive}
                                isPast={isPast}
                                to={withPrefix(slug)}
                            >
                                {title}
                            </SeriesLink>
                        </Breadcrumb>
                    );
                })}
            </SeriesList>
        </SeriesBreadcrumbs>
    </SeriesContainer>
);

export default Series;
