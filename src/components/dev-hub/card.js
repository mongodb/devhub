import React from 'react';
import styled from '@emotion/styled';
import { size, colorMap } from './theme';
import Link from './link';
import { H4 } from './text';
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
    z-index: 4;
    li {
        display: inline;
    }
`;

const GradientOverlay = styled('div')`
    background: linear-gradient(
        270deg,
        ${colorMap.violet} 0%,
        ${colorMap.magenta} 49.99%,
        ${colorMap.orange} 100%
    );
    background-size: cover;
    border-radius: ${size.small};
    height: 100%;
    opacity: 0.2;
    position: absolute;
    width: 100%;
    z-index: 3;
`;

const Image = styled('img')`
    border-radius: ${size.small};
    height: 100%;
    width: 100%;
    z-index: 2;
`;

const ImageWrapper = styled('div')`
    margin-bottom: ${size.medium};
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

const Wrapper = styled('aside')`
    border-radius: ${size.small};
    max-width: 500px;
    padding: ${size.default};
    padding-bottom: ${size.small};
    transition: 0.15s ease-in-out;
    width: ${({ width }) => (width ? width : '100%')};
    &:hover,
    &:active {
        background: rgba(255, 255, 255, 0.45);
        cursor: pointer;
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
                        <Tags tags={tags} />
                    </ImageWrapper>
                )}
                <Content>{children}</Content>
            </ContentWrapper>
        </Wrapper>
    );
};

export default Card;
