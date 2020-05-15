import React, { useCallback, useState } from 'react';
import Audio from './audio';
import Card from './card';

const PodcastCard = ({ podcast, ...props }) => {
    const [isActive, setIsActive] = useState(false);
    console.log(isActive);
    const openAudio = useCallback(() => {
        setIsActive(true);
    }, []);
    const closeAudio = useCallback(e => {
        e.stopPropagation();
        setIsActive(false);
    }, []);
    return (
        <>
            <Card onClick={openAudio} {...props}></Card>
            <Audio onClose={closeAudio} isActive={isActive} podcast={podcast} />
        </>
    );
};

export default PodcastCard;
