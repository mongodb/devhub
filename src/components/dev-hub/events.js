import React, { useEffect, useState } from 'react';
import dlv from 'dlv';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import LocationIcon from './icons/location-icon';
import MediaBlock from './media-block';
import GradientImage from './gradient-image';
import Link from './link';
import { H1, H2, P, H4 } from './text';
import { toDateString } from '../../utils/format-dates';
import {
    gradientMap,
    size,
    colorMap,
    fontSize,
    animationSpeed,
    screenSize,
} from './theme';

const EVENTS_API =
    'https://www.mongodb.com/api/event/all/1?sort=-created_at&populate=tag_ids,node_ids';
// const EVENTS_API = 'https://www.mongodb.com/api/event/all/1';
const sampleEvents = [
    {
        title: 'MongoDB.local San Francisco',
        node_type_attributes: {
            event_start: '2020-02-27T05:00:00.000Z',
            event_end: '2020-02-27T05:00:00.000Z',
            event_country: 'United States',
            event_city: 'San Francisco',
        },
        url: 'https://mongodbanddatabricks.splashthat.com/',
        url_type: 'external',
    },
    {
        node_type_attributes: {
            event_start: '2020-01-29T05:00:00.000Z',
            event_end: '2020-01-29T05:00:00.000Z',
            event_country: 'United States',
            event_city: 'New York City',
        },
        title: 'Coffe With Your Data: Real-Time Analytics',
        url: 'https://mongodbanddatabricks.splashthat.com/',
        url_type: 'external',
    },
    {
        node_type_attributes: {
            event_start: '2019-12-11T18:30:00.000Z',
            event_end: '2019-12-11T11:59:00.000Z',
            event_country: 'United Kingdom',
            event_city: 'London',
        },
        title: 'MongoDB.local London',
        url: 'events/bhm20',
        url_type: 'alias',
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

const useEventData = url => {
    const [events, setEvents] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetch(url, {
                    // credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (data) {
                    console.log(data);
                    setError(null);
                    setEvents(data);
                }
            } catch (e) {
                setError(e);
                setEvents(null);
            }
        };
        getData();
    }, [url]);

    return [events, error];
};
const DateIcon = ({ date }) => {
    const day = toDateString(date, { day: 'numeric', timezone: 'UTC' });
    const month = toDateString(date, { month: 'short', timezone: 'UTC' });
    return (
        <StyledDate>
            <CalendarDate data-name="event-date">
                <Day>{day}</Day>
                <Month>{month}</Month>
            </CalendarDate>
        </StyledDate>
    );
};

const Event = ({ event, maxTitleLines = 2 }) => {
    const [locationColor, setLocationColor] = useState(colorMap.greyLightThree);
    const { title, url, url_type: urlType } = event;
    const { event_city: city, event_country: country, event_start: date } = dlv(
        event,
        'node_type_attributes'
    );

    const urlProp = {
        to: urlType === 'external' ? url : null,
        href: urlType === 'alias' ? url : null,
    };
    return (
        <StyledEvent
            onMouseEnter={() => setLocationColor(colorMap.greyLightOne)}
            onMouseLeave={() => setLocationColor(colorMap.greyLightThree)}
            {...urlProp}
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
                    {city}, {country}
                </Location>
            </EventInfo>
        </StyledEvent>
    );
};

const EventListPreview = () => {
    let previews = sampleEvents;
    const [events, error] = useEventData(EVENTS_API);
    if (events) {
        previews = events.length > 3 ? events.slice(0, 3) : events;
    }
    return previews.length ? (
        <AllEvents>
            {previews.map(event => (
                <Event key={event.url} event={event} />
            ))}
        </AllEvents>
    ) : null;
};
export { Event, EventListPreview };
