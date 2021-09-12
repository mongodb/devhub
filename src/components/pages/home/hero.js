import React from 'react';
import styled from '@emotion/styled';
import Card from '../../dev-hub/card';
import { H1, SubHeader } from '../../dev-hub/text';
import { screenSize, size } from '../../dev-hub/theme';
import Button from '../../dev-hub/button';
import { getFeaturedCardFields } from '../../../utils/get-featured-card-fields';

const Header = styled('header')`
    color: ${({ theme }) => theme.colorMap.devWhite};
    padding: ${size.xlarge} ${size.large};
    @media ${screenSize.upToMedium} {
        padding: ${size.large} ${size.medium};
    }
    text-align: center;
`;
const TitleText = styled(H1)`
    max-width: 920px;
    margin: ${size.default} auto;
    word-wrap: break-word;
`;
const Sub = styled(SubHeader)`
    margin: ${size.default} 0;
`;
const CardGallery = styled('section')`
    display: flex;
    justify-content: center;
    margin: ${size.default} ${size.xlarge} ${size.large};
    @media ${screenSize.upToLarge} {
        flex-wrap: wrap;
    }
    @media ${screenSize.upToMedium} {
        margin: ${size.default};
    }
`;
const StyledTopCard = styled(Card)`
    width: 100%;
    @media ${screenSize.upToLarge} {
        flex-basis: 50%;
    }
    @media ${screenSize.upToMedium} {
        flex-basis: 100%;
    }
`;

// TODO: Generalize as new content types are supported
const FeaturedHomePageItem = ({ item }) => {
    const { image, slug, title } = getFeaturedCardFields(item, 'home');
    return <StyledTopCard image={image} to={slug} title={title} key={title} />;
};

const Hero = ({ featuredItems }) => (
    <Header>
        <TitleText>
            {`ideas.find({"attributes":`}
            <br />
            {`["fast", "innovative", "original"]})`}
        </TitleText>
        <Sub>What will you create today?</Sub>
        <CardGallery>
            {/*{featuredItems.map(item => (*/}
            {/*    <FeaturedHomePageItem key={item._id} item={item} />*/}
            {/*))}*/}
        </CardGallery>
        <div>
            <Button to="/learn" primary>
                Learn MongoDB
            </Button>
        </div>
    </Header>
);

export default Hero;
