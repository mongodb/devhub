import React, { useState } from 'react';
import dlv from 'dlv';
import styled from '@emotion/styled';
import LocationIcon from './icons/location-icon';
import Link from './link';
import { P, H4 } from './text';
import { toDateString } from '../../utils/format-dates';
import { darkTheme, size, fontSize, animationSpeed } from './theme';

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
    background-color: ${darkTheme.colorMap.greyDarkThree};
    border-radius: ${size.xsmall};
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    text-align: center;
`;

const StyledDate = styled('div')`
    background: ${darkTheme.gradientMap.greenTeal};
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
    color: ${darkTheme.colorMap.greyLightThree};
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
    -webkit-line-clamp: ${props => props.maxTitleLines};
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
        color: ${darkTheme.colorMap.devWhite};
        background: ${darkTheme.colorMap.greyDarkTwo};
        div[data-name='event-date'] {
            background: ${darkTheme.gradientMap.greenTeal};
        }
        p[data-name='event-location'] {
            color: ${darkTheme.colorMap.devWhite};
        }
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
    const [locationColor, setLocationColor] = useState(
        darkTheme.colorMap.greyLightThree
    );
    const { title, url } = event;
    const { event_city: city, event_country: country, event_start: date } = dlv(
        event,
        'node_type_attributes'
    );

    return (
        <StyledEvent
            data-test="event"
            onMouseEnter={() =>
                setLocationColor(darkTheme.colorMap.greyLightOne)
            }
            onMouseLeave={() =>
                setLocationColor(darkTheme.colorMap.greyLightThree)
            }
            target="_blank"
            rel="noreferrer noopener"
            href={url}
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
