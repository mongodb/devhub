import React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Breadcrumb from './breadcrumb';
import { fontSize, HERO_CONTENT_WIDTH, screenSize, size } from './theme';
import useMedia from '../../hooks/use-media';
import { BannerType } from '~src/types/banner-type';

const HERO_BOTTOM_MARGIN = '30px';
const BANNER_BOTTOM_PADDING = '50px';

const positionAbsolutelyWithinContainer = css`
    position: absolute; /* If you want text inside of it */
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`;

const squareAspectRatioContainer = css`
    padding-top: 100%;
    position: relative;
`;

const ContentContainer = styled('div')`
    ${({ fullWidth }) =>
        ` max-width: ${fullWidth ? '100%' : HERO_CONTENT_WIDTH}`};
`;

const Header = styled('header')`
    ${({ collapse }) => `margin-bottom: ${collapse ? 0 : HERO_BOTTOM_MARGIN}`};
    @media ${screenSize.upToLarge} {
        ${({ collapse }) => `margin-bottom: ${collapse ? 0 : size.small}`};
    }
`;

const HeroBannerContainer = styled('div')`
    background-color: ${({ theme }) => theme.colorMap.devBlack};
    ${({ background }) =>
        background && `background-image: url(${background});`};
    /* Send background to the right */
    background-position: ${({ backgroundPosition }) => backgroundPosition};
    background-repeat: no-repeat;
    background-size: ${({ shouldContainBackground }) =>
        shouldContainBackground ? 'contain' : 'cover'};
    height: 100%;
    ${({ bannerType }) =>
        bannerType === BannerType.VIDEO
            ? `padding: ${size.default} ${size.xxlarge} ${size.small};`
            : `padding: ${size.default} ${size.xxlarge} ${BANNER_BOTTOM_PADDING};`};
    @media ${screenSize.upToLarge} {
        /* Show image as child under breadcrumbs instead */
        background-image: none;
        padding: ${size.medium};
        width: 100%;
    }
`;

const textTruncate = css`
    max-width: 300px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const HeroBreadcrumb = styled(Breadcrumb)`
    line-height: 1;
    margin-bottom: ${HERO_BOTTOM_MARGIN};
    > a {
        font-size: ${fontSize.xsmall};
        ${textTruncate}
    }
`;

const MobileMediaContainer = styled('div')`
    display: flex;
    justify-content: center;
    width: 100%;
    @media ${screenSize.upToLarge} {
        margin-bottom: ${size.default};
        ${({ maintainSquareAspectRatio }) =>
            maintainSquareAspectRatio && squareAspectRatioContainer};
    }
    > img {
        border-radius: ${size.small};
        width: inherit;
        @media ${screenSize.upToLarge} {
            ${({ maintainSquareAspectRatio }) =>
                maintainSquareAspectRatio && positionAbsolutelyWithinContainer};
        }
    }
`;

const HeroBanner = ({
    background,
    breadcrumb,
    children,
    collapse,
    backgroundPosition = '100%',
    maintainSquareAspectRatio = true,
    // Setting below to false would allow for bleed effect on bg
    shouldContainBackground = true,
    showImageOnMobile = true,
    fullWidth = false,
    bannerType = BannerType.ARTICLE,
    ...props
}) => {
    const isMobile = useMedia(screenSize.upToLarge);
    return (
        <Header collapse={collapse} {...props}>
            <HeroBannerContainer
                background={background}
                backgroundPosition={backgroundPosition}
                shouldContainBackground={shouldContainBackground}
                bannerType={bannerType}
            >
                <ContentContainer fullWidth={fullWidth}>
                    {breadcrumb && (
                        <HeroBreadcrumb>{breadcrumb}</HeroBreadcrumb>
                    )}
                    {isMobile && showImageOnMobile && (
                        <MobileMediaContainer
                            maintainSquareAspectRatio={
                                maintainSquareAspectRatio
                            }
                        >
                            <img src={background} alt="" />
                        </MobileMediaContainer>
                    )}
                    {children}
                </ContentContainer>
            </HeroBannerContainer>
        </Header>
    );
};

export default HeroBanner;
