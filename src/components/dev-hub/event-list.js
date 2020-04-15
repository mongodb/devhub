import React, { useState } from 'react';
import styled from '@emotion/styled';
import Button from './button';
import Event from './events';
import { P } from './text';
import useEventData from '../../hooks/use-event-data';
import { size, screenSize } from './theme';

const EventsPreview = styled('div')`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    min-height: ${size.xxlarge};
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
    const [events, error, isLoading] = useEventData();
    const previews = events ? events.slice(0, 3) : [];

    return (
        <EventsPreview>
            {isLoading && <P>Loading...</P>}
            {!error &&
                !!previews.length &&
                previews.map(event => <Event key={event.url} event={event} />)}
            {error && <P>Check back later for upcoming events</P>}
        </EventsPreview>
    );
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
