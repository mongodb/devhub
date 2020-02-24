import React, { useEffect, useState } from 'react';
import dlv from 'dlv';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import Button from './button';
import Event, { sampleEvents } from './events';
import { size, screenSize } from './theme';

const EVENTS_API =
    'https://www.mongodb.com/api/event/all/1?sort=-created_at&populate=tag_ids,node_ids';
// const EVENTS_API = 'https://www.mongodb.com/api/event/all/1';

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

const AllEvents = styled('div')`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin: 0 -${size.medium};

    @media ${screenSize.largeAndUp} {
        &:after {
            /* Hack to prevent last row cards from expanding */
            content: '';
            flex-grow: 1000000000;
        }
    }
    @media ${screenSize.upToMedium} {
        display: block;
    }
`;
const eventPositioning = css`
    flex: 1 1 360px;
`;
const CenterBlock = styled('div')`
    text-align: center;
`;

const useEventData = url => {
    const [events, setEvents] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetch(url, {
                    credentials: 'same-origin',
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

export const EventsListPreview = () => {
    let previews = sampleEvents;
    const [events, error] = useEventData(EVENTS_API);
    if (events) {
        previews = events;
    }
    previews = previews.slice(0, 3);
    return previews.length ? (
        <EventsPreview>
            {previews.map(event => (
                <Event key={event.url} event={event} />
            ))}
        </EventsPreview>
    ) : null;
};

const EventsList = ({ items = [], limit = 9 }) => {
    const [visibleCards, setVisibleCards] = useState(limit);
    const hasMore = items.length > visibleCards;
    return (
        <>
            <AllEvents>
                {items.slice(0, visibleCards).map(item => (
                    <Event key={item.url} event={item} css={eventPositioning} />
                ))}
            </AllEvents>
            {hasMore && (
                <CenterBlock>
                    <Button
                        secondary
                        pagination
                        onClick={() => setVisibleCards(visibleCards + limit)}
                    >
                        Load more
                    </Button>
                </CenterBlock>
            )}
        </>
    );
};
export default EventsList;
