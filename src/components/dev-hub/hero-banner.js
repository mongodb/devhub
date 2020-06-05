import React from 'react';
import styled from '@emotion/styled';
import Breadcrumb from './breadcrumb';
import {
    colorMap,
    fontSize,
    HERO_CONTENT_WIDTH,
    screenSize,
    size,
} from './theme';
import useMedia from '../../hooks/use-media';

const HERO_BOTTOM_MARGIN = '30px';
const BANNER_BOTTOM_PADDING = '50px';

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
    background-color: ${colorMap.devBlack};
    ${({ background }) =>
        background && `background-image: url(${background});`};
    /* Send background to the right */
    background-position: 100%;
    background-repeat: no-repeat;
    background-size: ${({ shouldContainBackground }) =>
        shouldContainBackground ? 'contain' : 'cover'};
    height: 100%;
    padding: ${size.default} ${size.xxlarge} ${BANNER_BOTTOM_PADDING};
    @media ${screenSize.upToLarge} {
        /* Show image as child under breadcrumbs instead */
        background-image: none;
        padding: ${size.medium};
        width: 100%;
    }
`;

const HeroBreadcrumb = styled(Breadcrumb)`
    line-height: 1;
    margin-bottom: ${HERO_BOTTOM_MARGIN};
    > a {
        font-size: ${fontSize.xsmall};
    }
`;

const MobileMediaContainer = styled('div')`
    display: flex;
    justify-content: center;
    width: 100%;
    @media ${screenSize.upToLarge} {
        margin-bottom: ${size.default};
    }
    > img {
        border-radius: ${size.small};
        width: inherit;
    }
`;

const HeroBanner = ({
    background,
    breadcrumb,
    children,
    collapse,
    // Setting below to false would allow for bleed effect on bg
    shouldContainBackground = true,
    showImageOnMobile = true,
    fullWidth = false,
    ...props
}) => {
    const isMobile = useMedia(screenSize.upToLarge);
    return (
        <Header collapse={collapse} {...props}>
            <HeroBannerContainer
                background={background}
                shouldContainBackground={shouldContainBackground}
            >
                <ContentContainer fullWidth={fullWidth}>
                    {breadcrumb && (
                        <HeroBreadcrumb>{breadcrumb}</HeroBreadcrumb>
                    )}
                    {isMobile && showImageOnMobile && (
                        <MobileMediaContainer>
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
