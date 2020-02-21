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
    background-repeat: no-repeat;
    background-position: 100%;
    background-size: ${({ shouldContainImage }) =>
        shouldContainImage ? 'contain' : 'cover'};
    padding-top: ${size.default};
    padding-left: ${size.xxlarge};
    padding-bottom: ${BANNER_BOTTOM_PADDING};
    padding-right: ${size.xxlarge};
    height: 100%;
    @media ${screenSize.upToLarge} {
        width: 100%;
        background: none;
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
    @media ${screenSize.upToLarge} {
        margin-bottom: ${size.default};
    }
    width: 100%;
    > img {
        width: inherit;
    }
`;

const HeroBanner = ({
    background,
    breadcrumb,
    children,
    image,
    reverse,
    shouldContainImage = true,
    showImageOnMobile = true,
    ...props
}) => {
    const isMobile = useMedia(screenSize.upToLarge);
    return (
        <Header {...props}>
            <HeroBannerContainer
                background={background}
                shouldContainImage={shouldContainImage}
            >
                <ContentContainer>
                    <HeroBreadcrumb>{breadcrumb}</HeroBreadcrumb>
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
