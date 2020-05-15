import React, { useCallback, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import styled from '@emotion/styled';
import Button from './button';
import CardBadge from './card-badge';
import Slider from './slider';
import { H2, P } from './text';
import { colorMap, layer, size } from './theme';

const ReactPlayerContainer = styled('div')`
    background-color: ${colorMap.greyDarkThree};
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    ${({ isExpanded }) => !isExpanded && `height: 80px`};
    z-index: ${layer.superFront};
    display: flex;
    justify-content: space-around;
    flex-direction: column;
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
    background-color: ${colorMap.greyDarkThree};
`;

const StyledImage = styled('img')`
    margin-right: 32px;
`;

const ContentContainer = styled('div')`
    display: flex;
    align-self: center;
    align-items: center;
    ${({ isExpanded }) => isExpanded && `align-items: flex-start`};

    width: 100%;
    max-width: 1400px;
    justify-content: space-between;
`;

const StyledExpandedContainer = styled('div')`
    background-color: ${colorMap.greyDarkThree};
    display: flex;
    padding-top: ${size.large};
    align-self: center;
    max-width: 1400px;
    width: 100%;
`;

const ExpandedContainer = ({ podcast }) => (
    <StyledExpandedContainer>
        <H2>{podcast.title}</H2>
        <P>{podcast.description}</P>
    </StyledExpandedContainer>
);

const PlayOptionsContainer = styled('div')`
    display: flex;
    align-items: center;
    width: 100%;
`;
const DescriptionContainer = styled('div')`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const getTimeLabel = secondsElapsed => {
    const minutes = Math.floor(secondsElapsed / 60);
    const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const seconds = Math.floor(secondsElapsed % 60);
    const displaySeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${displayMinutes}:${displaySeconds}`;
};

// Pass in entire podcast
// Trigger?
const Audio = ({ onClose, isActive, podcast, ...props }) => {
    const [playerRef, setPlayerRef] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleIsExpanded = useCallback(() => {
        setIsExpanded(!isExpanded);
    }, [isExpanded]);
    const [isPlaying, setIsPlaying] = useState(true);
    const toggleIsPlaying = useCallback(
        e => {
            e.stopPropagation();
            setIsPlaying(!isPlaying);
        },
        [isPlaying]
    );
    const [progress, setProgress] = useState({ playedSeconds: 0 });
    const [duration, setDuration] = useState(null);
    const onChange = useCallback(
        seconds => {
            playerRef.seekTo(seconds);
        },
        [playerRef]
    );
    useEffect(() => {
        setIsPlaying(isActive);
    }, [isActive]);
    return isActive ? (
        <ReactPlayerContainer isExpanded={isExpanded} {...props}>
            <ContentContainer isExpanded={isExpanded}>
                <StyledImage
                    height="64"
                    width="64"
                    src={podcast.thumbnailUrl}
                    alt={podcast.title}
                />
                <DescriptionContainer>
                    <PlayOptionsContainer>
                        {podcast.title}
                        <StyledPlayButton play onClick={toggleIsPlaying} />
                        <StyledReactPlayer
                            ref={setPlayerRef}
                            width="0"
                            height="0"
                            url={podcast.url}
                            onDuration={setDuration}
                            onProgress={setProgress}
                            playing={isPlaying}
                        />
                        <Slider
                            current={progress.playedSeconds}
                            currentLabel={getTimeLabel(progress.playedSeconds)}
                            onChange={onChange}
                            seconds={progress.playedSeconds}
                            total={duration}
                            totalLabel={getTimeLabel(duration)}
                        />
                        <StyledCardBadge contentType="podcast" />
                    </PlayOptionsContainer>
                    {isExpanded && <ExpandedContainer podcast={podcast} />}
                </DescriptionContainer>
                <Button onClick={toggleIsExpanded}>expand</Button>
                <Button aria-label="close" onClick={onClose}>
                    &times;
                </Button>
            </ContentContainer>
        </ReactPlayerContainer>
    ) : null;
};

export default Audio;
