import React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Clock from '~components/dev-hub/icons/clock';
import { animationSpeed, lineHeight, size, fontSize } from './theme';
import { P, P2 } from './text';
import Link from './link';
import Badge from './badge';

const Image = styled('img')`
    border-radius: ${size.xsmall};
`;

const ImageWrapper = styled('div')`
    flex: 0 0 80px;
    margin-right: ${size.default};
`;
const RelativeBadge = styled(Badge)`
    grid-area: badge;
    margin: 0;
    position: relative;
    height: fit-content;
    width: fit-content;
`;
const hoverStyles = theme => css`
    &:hover,
    &:active {
        background-color: ${theme.colorMap.greyDarkTwo};
        color: inherit;
        cursor: pointer;
        ${Image} {
            transform: scale(1.1);
            transition: transform ${animationSpeed.slow};
        }
    }
`;
const Wrapper = styled('div')`
    background-color: transparent;
    border-radius: ${size.small};
    display: flex;
    max-height: 100%;
    width: 100%;
    padding: ${size.default};
    text-decoration: none;
    transition: background-color ${animationSpeed.medium};
    ${({ highlight }) => highlight && `background: rgba(255, 255, 255, 0.3);`};
    ${({ isclickable, theme }) => isclickable && hoverStyles(theme)}
`;
const TimeToReadText = styled(P)`
    color: ${({ theme }) => theme.colorMap.greyLightTwo};
    font-size: ${fontSize.tiny};
    grid-area: ttr;
    line-height: ${lineHeight.tiny};
`;
const truncate = maxLines => css`
    display: -webkit-box;
    -webkit-line-clamp: ${maxLines}; /* supported cross browser */
    -webkit-box-orient: vertical;
    overflow: hidden;
`;
const CardTitle = styled(P2)`
    font-family: 'Fira Mono';
    grid-area: title;
    ${truncate(2)};
`;

const StyledClock = styled(Clock)`
    margin-right: 4px;
    margin-top: -3px;
    vertical-align: middle;
`;

const Grid = styled('div')`
    display: grid;
    grid-template-areas: 'badge ttr' 'title title';
    grid-template-columns: 60px auto;
    grid-template-rows: ${size.medium} auto;
    column-gap: ${size.medium};
    row-gap: ${size.xsmall};
`;

const Card = ({
    className,
    description,
    href,
    image,
    to,
    timeToRead,
    title,
    type,
    ...props
}) => {
    const isLink = !!(to || href);
    const ContentWrapper = isLink ? Wrapper.withComponent(Link) : Wrapper;
    const linkAttrs = !isLink
        ? {}
        : {
              to,
              href,
          };
    return (
        <ContentWrapper
            data-test="card"
            {...linkAttrs}
            isclickable={true}
            className={className}
            {...props}
        >
            <ImageWrapper>
                <Image height="80" width="80" src={image} />
            </ImageWrapper>
            <Grid>
                <RelativeBadge contentType={type} />
                {timeToRead && (
                    <TimeToReadText>
                        <StyledClock />
                        {timeToRead} min read
                    </TimeToReadText>
                )}
                <CardTitle bold collapse>
                    {title}
                </CardTitle>
            </Grid>
        </ContentWrapper>
    );
};

export default Card;
