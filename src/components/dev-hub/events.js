import React, { useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import LocationIcon from './icons/location-icon';
import MediaBlock from './media-block';
import GradientImage from './gradient-image';
import Link from './link';
import { H1, H2, P, H4 } from './text';
import {
    gradientMap,
    size,
    colorMap,
    fontSize,
    animationSpeed,
    screenSize,
} from './theme';

const sampleEvents = [
    {
        date: new Date('January 20, 2020'),
        title: 'MongoDB.local San Francisco',
        location: 'San Francisco, California',
        url: '/community',
    },
    {
        date: new Date('January 29, 2020'),
        title: 'Coffe With Your Data: Real-Time Analytics',
        location: 'New York, New York',
        url: '/community',
    },
    {
        date: new Date('February 13, 2020'),
        title: 'Happy Hour & Arcade',
        location: 'Los Angeles, California',
        url: '/community',
    },
];

const Day = styled('span')`
    display: block;
    font-size: ${fontSize.medium};
    font-weight: bold;
    margin-bottom: 0;
`;
const Month = styled('span')`
    display: block;
    font-size: ${fontSize.xsmall};
    margin-top: -${size.small};
`;

const CalendarDate = styled('div')`
    background-color: ${colorMap.greyDarkThree};
    border-radius: ${size.xsmall};
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    text-align: center;
`;

const StyledDate = styled('div')`
    background: ${gradientMap.greenTeal};
    border-radius: ${size.xsmall};
    grid-area: image;
    height: ${size.xlarge};
    margin-right: ${size.medium};
    padding: 2px;
    width: ${size.xlarge};
`;

const EventInfo = styled('div')`
    grid-area: content;
`;

const Location = styled(P)`
    color: ${colorMap.greyLightThree};
    font-size: ${fontSize.tiny};
    margin: 0;
`;

const StyledLocationIcon = styled(LocationIcon)`
    vertical-align: middle;
`;

const Title = styled(H4)`
    font-size: ${fontSize.medium};
    margin: 0;
    /* truncate text to "maxTitleLines" lines */
    display: -webkit-box;
    -webkit-line-clamp: ${props =>
        props.maxTitleLines}; /* supported cross browser */
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

const StyledEvent = styled(Link)`
    border-radius: ${size.xsmall};
    cursor: pointer;
    display: grid;
    flex-direction: row;
    grid-template-areas: 'image content';
    grid-template-columns: 1fr 3fr;
    margin-right: ${size.medium};
    max-width: 400px;
    padding: ${size.medium};
    text-decoration: none;
    transition: background-color ${animationSpeed.medium};

    &:focus,
    &:hover {
        color: ${colorMap.devWhite};
        background: ${colorMap.greyDarkTwo};
        div[data-name='event-date'] {
            background: ${gradientMap.greenTeal};
        }
        p[data-name='event-location'] {
            color: ${colorMap.devWhite};
        }
    }
`;

const AllEvents = styled('div')`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    @media ${screenSize.upToMedium} {
        flex-direction: column;
        justify-content: start;
    }
`;

const DateIcon = ({ date }) => {
    const day = date.getUTCDate();
    const month = date.toLocaleString('default', {
        month: 'short',
        timezone: 'UTC',
    });
    return (
        <StyledDate>
            <CalendarDate data-name="event-date">
                <Day>{day}</Day>
                <Month>{month}</Month>
            </CalendarDate>
        </StyledDate>
    );
};

const Event = ({ date, maxTitleLines = 2, location, title, url }) => {
    const [locationColor, setLocationColor] = useState(colorMap.greyLightThree);
    return (
        <StyledEvent
            onMouseEnter={() => setLocationColor(colorMap.greyLightOne)}
            onMouseLeave={() => setLocationColor(colorMap.greyLightThree)}
            to={url}
        >
            <DateIcon date={date} />
            <EventInfo>
                <Title maxTitleLines={maxTitleLines}>{title}</Title>
                <Location data-name="event-location">
                    <StyledLocationIcon
                        color={locationColor}
                        height="15px"
                        width="15px"
                    />{' '}
                    {location}
                </Location>
            </EventInfo>
        </StyledEvent>
    );
};

const EventListPreview = ({ events = sampleEvents }) => {
    const previews = events.length > 3 ? events.slice(0, 3) : events;
    return (
        <AllEvents>
            {previews.map(event => (
                <Event key={event.title} {...event} />
            ))}
        </AllEvents>
    );
};
export { Event, EventListPreview };
