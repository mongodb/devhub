import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { animationSpeed, colorMap, gradientMap, layer, size } from './theme';
import Link from './link';
import Badge from './badge';

const NoLinkWrapper = styled('div')`
    margin: 0;
    padding: 0;
    width: 100%;
`;

const TagsList = styled('ul')`
    bottom: 0;
    color: ${colorMap.white};
    left: ${size.default};
    list-style-type: none;
    margin: 0;
    padding: 0;
    position: absolute;
    z-index: 3;
    li {
        display: inline;
    }
`;

const fullSizeAbsolute = css`
    bottom: 0;
    height: 100%;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
`;

const GradientOverlay = styled('div')`
    background: ${gradientMap.tealVioletPurple};
    background-size: cover;
    border-radius: ${size.small};
    mix-blend-mode: overlay;
    z-index: 3;
    ${fullSizeAbsolute}
`;
const GradientBase = styled('div')`
    background: ${gradientMap.tealVioletReverse};
    background-size: cover;
    border-radius: ${size.small};
    z-index: 1;
    ${fullSizeAbsolute}
`;

const Image = styled('img')`
    border-radius: ${size.small};
    display: block;
    height: 100%;
    overflow: hidden;
    position: relative;
    width: 100%;
    z-index: 2;
    ${props =>
        props.gradient &&
        css`
            filter: saturate(0%);
            opacity: 0.75;
        `}
`;

const ImageWrapper = styled('div')`
    border-radius: ${size.small};
    margin-bottom: ${size.medium};
    overflow: hidden;
    padding: 0;
    position: relative;
    width: 100%;
`;

const Content = styled('div')`
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    margin: auto;
`;

const Wrapper = styled('div')`
    background-color: transparent;
    border-radius: ${size.small};
    max-width: 500px;
    padding: ${size.medium};
    transition: background-color ${animationSpeed.medium};
    width: ${({ width = '100%' }) => width};
    &:hover,
    &:active {
        background-color: ${colorMap.greyDarkTwo};
        cursor: pointer;
        img {
            transform: scale(1.1);
        }
    }
    ${({ distinct }) => distinct && `border: 1px solid ${colorMap.devBlack}`};
    ${({ highlight }) => highlight && `background: rgba(255, 255, 255, 0.3);`};
`;

const noop = (_eventType, _properties, _options, _callback) => {};

const Tags = ({ tags }) =>
    tags && tags.length ? (
        <TagsList>
            {tags.map(tag => (
                <li key={tag}>
                    <Badge>{tag}</Badge>
                </li>
            ))}
        </TagsList>
    ) : null;

/**
 * @param {Object<string, any>} props
 * @property {node} props.children
 * @property {bool?} props.distinct
 * @property {bool?} props.gradient
 * @property {bool?} props.highlight
 * @property {string?} props.href
 * @property {string?} props.image
 * @property {func?} props.onClick
 * @property {string[]?} props.tags
 * @property {string?} props.target
 * @property {string?} props.to
 */

const Card = ({
    children,
    gradient,
    href,
    image,
    onClick = noop,
    to,
    tags,
    target,
    ...props
}) => {
    const isLink = !!(to || href);
    const ContentWrapper = isLink ? Link : NoLinkWrapper;
    const linkAttrs = !isLink
        ? {}
        : {
              to,
              href,
              target,
          };
    return (
        <Wrapper {...props}>
            <ContentWrapper onClick={onClick} {...linkAttrs}>
                {image && (
                    <ImageWrapper>
                        {gradient && <GradientOverlay />}
                        <Image src={image} />
                        {gradient && <GradientBase />}
                    </ImageWrapper>
                )}
                <Content>{children}</Content>

                <Tags tags={tags} />
            </ContentWrapper>
        </Wrapper>
    );
};

export default Card;
