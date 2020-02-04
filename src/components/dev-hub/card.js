import React from 'react';
import styled from '@emotion/styled';
import { size, colorMap } from './theme';
import Link from '../Link';
import { H4 } from './text';
import Badge from './badge';

/*
Card Details
- should include an image (should have image fallback)
- image should have a gradient
- there should be an optional tag (tags?) on top of the image
- content should live underneath the card (if there is any)
- choose 1st type of hover state

*/

// TODO: should use 'gradient' prop?
// - should choose default gradient
// - gradient should either be boolean and set default gradient
// - in the future we can have specific card types with their own gradients
// - so then you can

const Tag = styled('div')`
    bottom: 0;
    left: ${size.default};
    margin: 0;
    padding: 0;
    position: absolute;
    z-index: 4;
`;

const TagsList = styled('ul')`
    bottom: 0;
    color: ${colorMap.white};
    left: ${size.default};
    list-style-type: none;
    padding: ${size.tiny};
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
    height: 500px;
    margin-bottom: ${size.medium};
    padding: 0;
    position: relative;
    width: 100%;
`;

const Title = styled(H4)`
    color: ${colorMap.devWhite};
`;

const Wrapper = styled('aside')`
    border-radius: ${size.small};
    padding: ${size.default};
    padding-bottom: ${size.small};
    transition: 0.15s ease-in-out;
    max-width: 500px;
    &:hover,
    &:active {
        background: rgba(255, 255, 255, 0.3);
        cursor: pointer;
    }
`;

const noop = (_eventType, _properties, _options, _callback) => {};

/**
 * @param {Object<string, any>} props
 * @property {bool?} props.gradient
 * @property {string} props.image
 * @property {string?} props.link
 * @property {func?} props.onClick
 * @property {string?} props.tag
 * @property {string?} props.title
 */

const Card = ({
    gradient,
    image,
    link,
    onClick = noop,
    tag,
    title,
    ...props
}) => {
    const ContentWrapper = link ? Link : 'div';
    return (
        <Wrapper>
            <ContentWrapper to={link} onClick={onClick}>
                <ImageWrapper>
                    {gradient && <GradientOverlay />}
                    <Image src={image} />
                    <Tag>
                        <Badge>{tag}</Badge>
                    </Tag>
                </ImageWrapper>
                <Title bold>{title}</Title>
            </ContentWrapper>
        </Wrapper>
    );
};

export default Card;
