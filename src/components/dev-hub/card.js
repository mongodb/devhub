import React from 'react';
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
    z-index: ${layer.front};
    li {
        display: inline;
    }
`;

const GradientOverlay = styled('div')`
    background: ${gradientMap.tealVioletReverse};
    background-size: cover;
    border-radius: ${size.small};
    height: 100%;
    /* opacity: 0.2; */
    position: absolute;
    width: 100%;
    z-index: ${layer.middle};
`;

const Image = styled('img')`
    border-radius: ${size.small};
    height: 100%;
    width: 100%;
    z-index: ${layer.back};
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

const Wrapper = styled('div')`
    border-radius: ${size.small};
    max-width: 500px;
    padding: ${size.medium};
    transition: background ${animationSpeed.fast};
    width: ${({ width = '100%' }) => width};
    &:hover,
    &:active {
        background-color: ${colorMap.greyDarkTwo};
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
                        <Image src={image} style={{ opacity: '.75' }} />
                        {gradient && <GradientOverlay />}
                    </ImageWrapper>
                )}
                <Content>{children}</Content>

                <Tags tags={tags} />
            </ContentWrapper>
        </Wrapper>
    );
};

export default Card;
