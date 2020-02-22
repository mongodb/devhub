import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import Link from './link';
import { H3, P } from './text';
import {
    colorMap,
    fontSize,
    gradientMap,
    layer,
    screenSize,
    size,
} from './theme';

const BULLET_BOX_WIDTH = '14px';
const BULLET_SIZE = '22px';

const activeLiStyles = css`
    content: '\u29BF';
    font-size: ${fontSize.default};
`;

const activeLinkStyles = css`
    font-weight: bold;
`;

const Breadcrumb = styled('li')`
    margin-bottom: 0;
    padding-bottom: ${size.small};
    position: relative;
    width: 100%;
    z-index: ${layer.back};
    /* Create gradient bullet */
    :before {
        background: ${gradientMap.magentaSalmonSherbet};
        background-clip: text;
        content: '\u25E6';
        display: inline-block;
        font-size: ${BULLET_SIZE};
        margin-right: ${size.small};
        text-align: center;
        width: ${BULLET_BOX_WIDTH};
        z-index: ${layer.front};
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        ${({ active }) => active && activeLiStyles}
    }

    /* Create overflowing line to next element */
    /* TODO: Allow text-overflow ellipsis but allow line below to next bullet */
    :not(:last-of-type):after {
        position: absolute;
        content: '';
        background-image: linear-gradient(
                0deg,
                transparent,
                transparent 50%,
                ${colorMap.greyDarkTwo} 50%,
                ${colorMap.greyDarkTwo} 100%
            ),
            ${gradientMap.magentaSalmonSherbet};
        background-size: ${size.medium} 3px, 100% 3px;
        border-image-repeat: round;
        left: 6px;
        top: ${size.medium};
        height: 30px;
        width: 1px;
        z-index: ${layer.superBack};
    }
`;

const DescriptiveText = styled(P)`
    color: ${colorMap.greyLightThree};
    font-size: ${fontSize.tiny};
`;

const SeriesBreadcrumbs = styled('div')`
    border-radius: 0 ${size.small} ${size.small} 0;
    background-color: ${colorMap.greyDarkTwo};
    flex: 1;
    margin: 0;
    padding: ${size.large};
    /* TODO: fix overflow to allow ellipsis and line to next bullet */
    overflow: hidden;
    white-space: nowrap;
    @media ${screenSize.upToMedium} {
        border-radius: 0 0 ${size.small} ${size.small};
        padding: ${size.medium};
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
`;

const SeriesList = styled('ul')`
    list-style: none;
    padding-left: 0;
`;

const SeriesNameContainer = styled('div')`
    background-color: ${colorMap.greyDarkThree};
    border-radius: ${size.small} 0 0 ${size.small};
    padding: ${size.large};
    flex: 1;
    @media ${screenSize.upToMedium} {
        border-radius: ${size.small} ${size.small} 0 0;
        padding: ${size.medium};
    }
`;

const Series = ({ children, currentStep, name }) => {
    return (
        <SeriesContainer>
            <SeriesNameContainer>
                <DescriptiveText>More from this series</DescriptiveText>
                <H3>{name}</H3>
            </SeriesNameContainer>
            <SeriesBreadcrumbs>
                <SeriesList>
                    {children.map(({ title, slug }) => (
                        <Breadcrumb active={title === currentStep}>
                            <SeriesLink
                                active={title === currentStep}
                                to={slug}
                            >
                                {title}
                            </SeriesLink>
                        </Breadcrumb>
                    ))}
                </SeriesList>
            </SeriesBreadcrumbs>
        </SeriesContainer>
    );
};

export default Series;
