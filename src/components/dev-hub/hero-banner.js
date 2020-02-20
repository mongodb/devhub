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
import MediaBlock from './media-block';

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
    background-size: 50% 100%;
    padding-top: ${size.default};
    padding-left: ${size.xxlarge};
    padding-bottom: ${BANNER_BOTTOM_PADDING};
    padding-right: ${size.xxlarge};
    height: 100%;
    @media ${screenSize.upToLarge} {
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
    ...props
}) => {
    const isMobile = useMedia(screenSize.upToLarge);
    const HeroInfo = () => (
        <HeroBannerContainer background={background}>
            <ContentContainer>
                <HeroBreadcrumb>{breadcrumb}</HeroBreadcrumb>
                {children}
            </ContentContainer>
        </HeroBannerContainer>
    );
    return (
        <Header {...props}>
            {image ? (
                isMobile ? (
                    <HeroBannerContainer background={background}>
                        <HeroBreadcrumb>{breadcrumb}</HeroBreadcrumb>
                        <MobileMediaContainer>{image}</MobileMediaContainer>
                        {children}
                    </HeroBannerContainer>
                ) : (
                    <MediaBlock
                        mediaComponent={image}
                        shouldMatchChildrenHeight
                    >
                        <HeroInfo />
                    </MediaBlock>
                )
            ) : (
                <HeroInfo />
            )}
        </Header>
    );
};

export default HeroBanner;
