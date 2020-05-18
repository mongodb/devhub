import React, { useCallback, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import styled from '@emotion/styled';
import useMedia from '../../hooks/use-media';
import AudioPauseIcon from './icons/audio-pause-icon';
import AudioPlayIcon from './icons/audio-play-icon';
import CloseIcon from './icons/close-icon';
import ExpandIcon from './icons/expand-icon';
import Button from './button';
import Badge from './badge';
import Slider from './slider';
import { H2, P } from './text';
import { colorMap, layer, screenSize, size } from './theme';

const ReactPlayerContainer = styled('div')`
    background-color: ${colorMap.greyDarkThree};
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    left: 0;
    position: fixed;
    width: 100%;
    z-index: ${layer.superFront};
    ${({ isExpanded }) => !isExpanded && `height: 80px`};
`;

const StyledBadge = styled(Badge)`
    height: fit-content;
    position: relative;
    ${({ isCompact }) => isCompact && 'display: none;'};
`;

const StyledReactPlayer = styled(ReactPlayer)`
    background-color: ${colorMap.greyDarkThree};
`;

const StyledImage = styled('img')`
    margin-right: ${size.large};
    ${({ isExpanded }) => isExpanded && `margin-top: 8px`};
    ${({ isCompact }) => isCompact && 'display: none;'};
`;

const ContentContainer = styled('div')`
    display: flex;
    align-self: center;
    align-items: center;
    ${({ isExpanded }) => isExpanded && `align-items: flex-start`};

    width: 100%;
    max-width: ${size.maxWidth};
    justify-content: space-between;
`;

const PodcastTitle = styled(P)`
    ${({ isCompact }) => isCompact && 'display: none;'};
`;

const StyledExpandedContainer = styled('div')`
    align-self: center;
    background-color: ${colorMap.greyDarkThree};
    display: flex;
    max-width: ${size.maxWidth};
    padding-top: ${size.large};
    width: 100%;
`;

const ExpandedContainer = ({ podcast }) => (
    <StyledExpandedContainer>
        <H2>{podcast.title}</H2>
        <P>{podcast.description}</P>
    </StyledExpandedContainer>
);

const PlayOptionsContainer = styled('div')`
    align-items: center;
    display: flex;
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
    const isCompact = useMedia(screenSize.upToLarge);
    return isActive ? (
        <ReactPlayerContainer isExpanded={isExpanded} {...props}>
            <ContentContainer isExpanded={isExpanded}>
                <StyledImage
                    isExpanded={isExpanded}
                    height="64"
                    width="64"
                    src={podcast.thumbnailUrl}
                    alt={podcast.title}
                    isCompact={isCompact}
                />
                <DescriptionContainer>
                    <PlayOptionsContainer>
                        <PodcastTitle isCompact={isCompact} collapse>
                            {podcast.title}
                        </PodcastTitle>
                        <Button
                            aria-label={isPlaying ? 'pause' : 'play'}
                            onClick={toggleIsPlaying}
                        >
                            {isPlaying ? <AudioPauseIcon /> : <AudioPlayIcon />}
                        </Button>
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
                        <StyledBadge
                            contentType="podcast"
                            isCompact={isCompact}
                        />
                    </PlayOptionsContainer>
                    {isExpanded && <ExpandedContainer podcast={podcast} />}
                </DescriptionContainer>
                <Button onClick={toggleIsExpanded}>
                    <ExpandIcon down={isExpanded} />
                </Button>
                <Button aria-label="close" onClick={onClose}>
                    <CloseIcon height="36" />
                </Button>
            </ContentContainer>
        </ReactPlayerContainer>
    ) : null;
};

export default Audio;
