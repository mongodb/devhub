import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import Link from './link';
import { H3, P } from './text';
import {
    colorMap,
    fontSize,
    layer,
    lineHeight,
    screenSize,
    size,
} from './theme';

const BULLET_BOX_WIDTH = '30px';
const BULLET_SIZE = 36;

// Needed to allow more magenta to account for proper text coloring
const BULLET_GRADIENT = `linear-gradient(
    315deg,
    ${colorMap.sherbet} 0%,
    ${colorMap.salmon} 40%,
    ${colorMap.magenta} 100%
);`;

const BORDER_GRADIENT = `linear-gradient(
    0deg,
    ${colorMap.sherbet} 0%,
    ${colorMap.salmon} 49.99%,
    ${colorMap.magenta} 100%
);`;

const activeLiStyles = css`
    font-size: 22px;
    &:after {
        /* Adjust the background bullet position for the bull's eye text */
        font-size: 54px;
        top: 1px;
    }
`;

const activeLinkStyles = css`
    font-weight: bold;
`;

const Breadcrumb = styled('li')`
    display: flex;
    padding-bottom: ${size.small};
    position: relative;
    z-index: ${layer.back};
`;

const DescriptiveText = styled(P)`
    color: ${colorMap.greyLightThree};
    font-size: ${fontSize.tiny};
    @media ${screenSize.upToMedium} {
        padding-bottom: ${size.tiny};
    }
`;

const SeriesBreadcrumbs = styled('div')`
    border-radius: 0 ${size.small} ${size.small} 0;
    background-color: ${colorMap.greyDarkTwo};
    flex: 1;
    margin: 0;
    padding: ${size.large};
    overflow: hidden;
    @media ${screenSize.upToMedium} {
        border-radius: 0 0 ${size.small} ${size.small};
        padding: 24px ${size.medium} ${size.medium};
    }
`;

const SeriesContainer = styled('div')`
    display: flex;
    @media ${screenSize.upToMedium} {
        flex-direction: column;
    }
`;

const SeriesLink = styled(Link)`
    font-family: 'Fira Mono', monospace;
    font-size: ${fontSize.default};
    text-decoration: none;
    ${({ active }) => active && activeLinkStyles};
    @media ${screenSize.upToMedium} {
        font-size: ${fontSize.default};
    }
`;

const BulletIcon = styled('div')`
    background: ${BULLET_GRADIENT};
    background-clip: text;
    display: inline-block;
    font-size: ${BULLET_SIZE}px;
    line-height: ${lineHeight.tiny};
    margin-top: 3px;
    margin-right: 30px;
    position: relative;
    text-align: left;
    vertical-align: top;
    width: ${BULLET_BOX_WIDTH};
    width: 16px;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    /* Create a bullet to match the bg to hide border passing through */
    &:after {
        background: ${colorMap.greyDarkTwo};
        background-clip: text;
        content: '\u2022';
        left: 0;
        font-size: ${fontSize.jumbo};
        height: 100%;
        margin-right: ${size.small};
        position: absolute;
        text-align: left;
        top: 3px;
        vertical-align: top;
        width: ${BULLET_BOX_WIDTH};
        z-index: ${layer.superBack};
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    @media ${screenSize.upToMedium} {
        margin-right: 20px;
    }
    ${({ active }) => active && activeLiStyles};
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
                ${colorMap.greyDarkTwo} 50%,
                ${colorMap.greyDarkTwo} 100%
            ),
            ${BORDER_GRADIENT};
        background-size: ${size.medium} 2px, cover;
        bottom: ${BULLET_SIZE / 2 + 3}px;
        content: '';
        left: 7px;
        position: absolute;
        top: ${BULLET_SIZE / 2}px;
        width: 1px;
    }
`;

const SeriesNameContainer = styled('div')`
    background-color: ${colorMap.greyDarkThree};
    border-radius: ${size.small} 0 0 ${size.small};
    flex: 1;
    padding: ${size.large};
    @media ${screenSize.upToMedium} {
        border-radius: ${size.small} ${size.small} 0 0;
        padding: ${size.medium};
    }
`;

const SeriesIcon = ({ active }) => (
    <BulletIcon active={active}>
        {/* x29BF is bull's eye bullet, x25E6 is hollow bullet */}
        {active ? <>&#x29BF;</> : <>&#x25E6;</>}
    </BulletIcon>
);

const Series = ({ children, currentStep, name }) => (
    <SeriesContainer data-test="series">
        <SeriesNameContainer>
            <DescriptiveText collapse>More from this series</DescriptiveText>
            <H3 collapse>{name}</H3>
        </SeriesNameContainer>
        <SeriesBreadcrumbs>
            <SeriesList>
                {children.map(({ title, slug }) => {
                    const isActive = title === currentStep;
                    return (
                        <Breadcrumb active={isActive}>
                            <SeriesIcon active={isActive} />
                            <SeriesLink active={isActive} to={slug}>
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
