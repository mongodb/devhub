import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Button from './button';
import Event from './events';
import useEventData from '../../hooks/use-event-data';
import { size, screenSize } from './theme';

export const EVENTS_API =
    'https://www.mongodb.com/api/event/all/1?sort=-created_at&populate=tag_ids,node_ids';

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
    display: grid;
    grid-row-gap: ${size.small};
    grid-template-columns: 1fr;
    grid-template-rows: repeat(auto-fill, 1fr);
    padding-bottom: ${size.xlarge};
    width: 100%;
    @media ${screenSize.mediumAndUp} {
        grid-template-columns: repeat(2, 1fr);
    }
    @media ${screenSize.largeAndUp} {
        grid-template-columns: repeat(3, 1fr);
    }
`;
const CenterBlock = styled('div')`
    text-align: center;
`;

export const EventsListPreview = () => {
    // TODO: Update implementation below
    // to handle load/error states when events api CORS issue resolved
    const [events, error] = useEventData(EVENTS_API);
    const previews = events ? events.slice(0, 3) : [];

    return previews.length ? (
        <EventsPreview>
            {previews.map(event => (
                <Event key={event.url} event={event} />
            ))}
        </EventsPreview>
    ) : null;
};

const EventsList = ({ items = [], limit = 12 }) => {
    const [visibleCards, setVisibleCards] = useState(limit);
    const hasMore = items.length > visibleCards;
    return (
        <>
            <AllEvents>
                {items.slice(0, visibleCards).map(item => (
                    <Event key={item.url} event={item} />
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
