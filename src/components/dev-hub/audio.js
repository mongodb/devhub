import React, { useCallback, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import styled from '@emotion/styled';
import Button from './button';
import CardBadge from './card-badge';
import { colorMap, layer } from './theme';

const ReactPlayerContainer = styled('div')`
    background-color: ${colorMap.greyDarkTwo};
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 80px;
    z-index: ${layer.superFront};
    display: flex;
    justify-content: space-around;
    /* flex-direction: column; */
    padding: 8px 100px;
`;

const StyledCardBadge = styled(CardBadge)`
    position: relative;
    height: fit-content;
`;

const StyledPlayButton = styled(Button)`
    height: 50px;
    width: 50px;
`;

const StyledReactPlayer = styled(ReactPlayer)`
    background-color: ${colorMap.greyDarkTwo};
`;

const StyledImage = styled('img')`
    margin-right: 32px;
`;

const ContentContainer = styled('div')`
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 1400px;
    justify-content: space-between;
`;

const TEST_PODCAST = {
    description: undefined,
    mediaType: 'podcast',
    publishDate: 'Wed, 06 May 2020 16:00:00 +0000',
    thumbnailUrl:
        'https://ssl-static.libsyn.com/p/assets/3/2/d/b/32dbb642e0f5c977/MDB_Podcast_Cover_Art_V2.png',
    title: 'Ep. 6 Five Ways to Reduce Costs with MongoDB Atlas',
    url:
        'https://traffic.libsyn.com/secure/mongodb/Updated-5-Ways-Mike_-_4_13_20-b.mp3?dest-id=18542',
};

const ProgressBar = styled('input')`
    width: 100%;
`;

const ProgressSlider = ({ onChange, percent, seconds, total }) => {
    return (
        <div style={{ display: 'flex' }}>
            {`${Math.floor(seconds / 60)}:${Math.floor(seconds % 60)}`}
            <ProgressBar
                min="0"
                max={total}
                value={seconds}
                type="range"
                percent={percent}
                onInput={() => onChange(seconds)}
            />
            {`${Math.floor(total / 60)}:${Math.floor(total % 60)}`}
        </div>
    );
};

// Pass in entire podcast
// Trigger?
const Audio = ({ onClose, isActive, podcast = TEST_PODCAST, ...props }) => {
    const [isPlaying, setIsPlaying] = useState(true);
    const toggleIsPlaying = useCallback(
        e => {
            e.stopPropagation();
            setIsPlaying(!isPlaying);
        },
        [isPlaying]
    );
    const [progress, setProgress] = useState({});
    const [duration, setDuration] = useState(null);
    // Progress gives playedSeconds, and played (fraction of total)
    useEffect(() => {}, [progress.played, progress.playedSeconds]);
    useEffect(() => {
        setIsPlaying(isActive);
    }, [isActive]);
    return isActive ? (
        <ReactPlayerContainer {...props}>
            <ContentContainer>
                <StyledImage
                    height="64"
                    width="64"
                    src={podcast.thumbnailUrl}
                    alt={podcast.title}
                />
                {podcast.title}
                <StyledPlayButton play onClick={toggleIsPlaying} />
                <StyledReactPlayer
                    width="0"
                    height="0"
                    url={podcast.url}
                    onDuration={setDuration}
                    onProgress={setProgress}
                    playing={isPlaying}
                />
                <ProgressSlider
                    onChange={console.log}
                    percent={progress.played}
                    seconds={progress.playedSeconds}
                    total={duration}
                />
                <StyledCardBadge contentType="podcast" />
                <Button aria-label="close" onClick={onClose}>
                    &times;
                </Button>
            </ContentContainer>
        </ReactPlayerContainer>
    ) : null;
};

export default Audio;
