import React from 'react';
import styled from '@emotion/styled';
import dlv from 'dlv';
import { useStaticQuery, graphql } from 'gatsby';
import Link from '~components/dev-hub/link';
import ProfileImage from '~components/dev-hub/profile-image';
import { H1, H6, P3, P4 } from '~components/dev-hub/text';
import { screenSize, size } from '~components/dev-hub/theme';
import LocationPinIcon from '~images/community-champions/location-pin-grey.svg';
import ChampionPlaceholderImage from '~images/community-champions/champion-placeholder.svg';

const CHAMPION_CONTAINER_WIDTH = '200px';
const CHAMPION_CONTAINER_MOBILE_WIDTH = '170px';
const PROFILE_PICTURE_SIZE = 112;
const PROFILE_PICTURE_GRADIENT_OFFSET = 8;
const LOCATION_CONTAINER_TOP_MARGIN = '4px';
const LOCATION_CONTAINER_MOBILE_TOP_MARGIN = '2px';
const PIN_LOCATION_IMAGE_RIGHT_MARGIN = '4px';
const CHAMPION_MOBILE_VERTICAL_MARGIN = '4px';

const Title = styled(H1)`
    margin-bottom: calc(${size.xlarge} - ${size.xsmall});
    text-align: center;
    @media ${screenSize.upToLarge} {
        margin-bottom: ${size.medium};
    }
`;

const Container = styled('div')`
    background-color: ${({ theme }) => theme.colorMap.greyDarkThree};
    margin: ${size.xlarge} -${size.xxlarge};
    padding: ${size.xlarge} ${size.xxlarge}
        calc(${size.xlarge} - ${size.xsmall});
    @media ${screenSize.upToLarge} {
        margin: ${size.large} -${size.default};
        padding: ${size.large} ${size.default}
            calc(${size.large} - ${CHAMPION_MOBILE_VERTICAL_MARGIN});
    }
`;

const ChampionsContainer = styled('div')`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const ChampionLink = styled(Link)`
    align-items: center;
    border-radius: ${size.xsmall};
    display: flex;
    flex-direction: column;
    margin: ${size.xsmall} 0;
    padding: ${size.default};
    text-align: center;
    text-decoration: none;
    width: ${CHAMPION_CONTAINER_WIDTH};
    @media ${screenSize.upToLarge} {
        margin: ${CHAMPION_MOBILE_VERTICAL_MARGIN} 0;
    }
    @media ${screenSize.upToMedium} {
        padding: ${size.default} 0;
        width: ${CHAMPION_CONTAINER_MOBILE_WIDTH};
    }
    &:hover,
    &:focus {
        background-color: ${({ theme }) => theme.colorMap.greyDarkTwo};
        color: inherit;
        cursor: pointer;
    }
`;

const LocationPinImage = styled('img')`
    margin-right: ${PIN_LOCATION_IMAGE_RIGHT_MARGIN};
    vertical-align: text-top;
`;

const LocationText = styled(P4)`
    color: ${({ theme }) => theme.colorMap.greyLightTwo};
    margin-top: ${LOCATION_CONTAINER_TOP_MARGIN};
    @media ${screenSize.upToMedium} {
        margin-top: ${LOCATION_CONTAINER_MOBILE_TOP_MARGIN};
    }
`;

const Location = ({ location }) => (
    <LocationText collapse>
        <LocationPinImage src={LocationPinIcon} alt="Location pin" />
        {location}
    </LocationText>
);

const Occupation = styled(P3)`
    color: ${({ theme }) => theme.colorMap.greyLightTwo};
`;

const ProfilePicture = styled(ProfileImage)`
    margin-bottom: ${size.default};
    div {
        ${({ image, theme }) =>
            image ? `background-color: ${theme.colorMap.devWhite};` : ''}
        background-size: cover;
    }
`;

const Champion = ({ imageUrl, location, name, title, to, ...props }) => (
    <ChampionLink to={to} {...props}>
        <ProfilePicture
            defaultImage={ChampionPlaceholderImage}
            gradientOffset={PROFILE_PICTURE_GRADIENT_OFFSET}
            hideOnMobile={false}
            image={imageUrl}
            key={name}
            height={PROFILE_PICTURE_SIZE}
            width={PROFILE_PICTURE_SIZE}
        />
        <H6 collapse>{name}</H6>
        <Occupation collapse>{title}</Occupation>
        <Location location={location} />
    </ChampionLink>
);

const communityChampions = graphql`
    query CommunityChampions {
        allStrapiCommunityChampions(
            sort: { fields: [firstName, middleName, lastName] }
        ) {
            nodes {
                id
                firstName
                middleName
                lastName
                location
                title
                image {
                    url
                }
            }
        }
    }
`;

const List = () => {
    const data = useStaticQuery(communityChampions);
    const champions = dlv(data, ['allStrapiCommunityChampions', 'nodes'], []);
    return (
        <ChampionsContainer data-test="champion-grid">
            {champions.map(
                ({
                    firstName,
                    id,
                    image,
                    lastName,
                    location,
                    middleName,
                    title,
                }) => (
                    <Champion
                        data-test="champion-grid-entry"
                        imageUrl={image ? image.url : null}
                        key={id}
                        location={location}
                        name={[firstName, middleName, lastName].join(' ')}
                        title={title}
                        to={`/community-champions/${firstName.toLowerCase()}-${lastName.toLowerCase()}`}
                    />
                )
            )}
        </ChampionsContainer>
    );
};

const MeetTheChampions = () => (
    <Container>
        <Title>Meet the Champions</Title>
        <List />
    </Container>
);

export default MeetTheChampions;
