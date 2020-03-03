import React, { useEffect, useState } from 'react';
import dlv from 'dlv';
import styled from '@emotion/styled';
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

const MONGODB_WEBSITE = 'https://www.mongodb.com';

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

const EventsPreview = styled('div')`
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

const Event = ({ event, maxTitleLines = 2, ...props }) => {
    const [locationColor, setLocationColor] = useState(colorMap.greyLightThree);
    const { title, url, url_type: urlType } = event;
    const { event_city: city, event_country: country, event_start: date } = dlv(
        event,
        'node_type_attributes'
    );

    const urlProp = {
        // internal mdb event urls only contain relative path,
        // so these must be updated manually
        href: urlType === 'alias' ? `${MONGODB_WEBSITE}/${url}` : url,
    };
    return (
        <StyledEvent
            onMouseEnter={() => setLocationColor(colorMap.greyLightOne)}
            onMouseLeave={() => setLocationColor(colorMap.greyLightThree)}
            target="_blank"
            rel="noreferrer noopener"
            {...urlProp}
            {...props}
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

export default Event;
