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

const BREADCRUMB_MARGIN = '30px';
const BANNER_BOTTOM_PADDING = '50px';

const ContentContainer = styled('div')`
    max-width: ${HERO_CONTENT_WIDTH};
`;

const Header = styled('header')`
    margin-bottom: 30px;
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
        width: 100%;
    }
`;

const HeroBreadcrumb = styled(Breadcrumb)`
    margin-bottom: ${BREADCRUMB_MARGIN};
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
    // Setting below to false would allow for bleed effect on bg
    shouldContainBackground = true,
    showImageOnMobile = true,
    ...props
}) => {
    const isMobile = useMedia(screenSize.upToLarge);
    return (
        <Header {...props}>
            <HeroBannerContainer
                background={background}
                shouldContainBackground={shouldContainBackground}
            >
                <ContentContainer>
                    {breadcrumb && (
                        <HeroBreadcrumb>{breadcrumb}</HeroBreadcrumb>
                    )}
                    {isMobile && showImageOnMobile && (
                        <MobileMediaContainer>
                            <img src={background} alt={background} />
                        </MobileMediaContainer>
                    )}
                    {children}
                </ContentContainer>
            </HeroBannerContainer>
        </Header>
    );
};

export default HeroBanner;
