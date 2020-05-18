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
    align-content: center;
    justify-content: center;
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
    border-radius: ${size.xsmall};
    ${({ isCompact }) => isCompact && 'display: none;'};
`;

const ContentContainer = styled('div')`
    display: grid;
    align-items: center;
    justify-items: center;
    grid-template-columns: 64px 36px auto 76px 88px;
    grid-template-rows: 80px auto;
    column-gap: 32px;
    grid-template-areas:
        'title play slider badge options'
        'details details details details details';
    width: 100%;
    padding: 0 ${size.xlarge};
    max-width: ${size.maxWidth};
    @media ${screenSize.upToLarge} {
        align-items: center;
        justify-items: center;
        grid-template-areas:
            'play title close'
            'slider slider slider'
            'details details details'
            '. expand .';
        grid-template-columns: 36px auto 36px;
        grid-template-rows: 80px auto auto 48px;
        column-gap: 8px;
        row-gap: 30px;
        padding: 0 ${size.default};
    }
`;

const PodcastTitle = styled(P)`
    ${({ isCompact }) => !isCompact && 'display: none;'};
`;

const StyledExpandedContainer = styled('div')`
    align-self: center;
    grid-area: details;
    background-color: ${colorMap.greyDarkThree};
    display: grid;
    grid-template-areas: 'title desc desc';
    column-gap: 24px;
    max-width: ${size.maxWidth};
    padding: ${size.large};
    width: 100%;
    @media ${screenSize.upToLarge} {
        grid-template-areas: 'desc';
        padding: 0;
    }
`;

const ExpandedTitle = styled(H2)`
    grid-area: title;
    @media ${screenSize.upToLarge} {
        display: none;
    }
`;

const ExpandedDescription = styled(P)`
    color: ${colorMap.greyLightTwo};
    grid-area: desc;
`;

const ExpandedContainer = ({ podcast }) => (
    <StyledExpandedContainer>
        <ExpandedTitle>{podcast.title}</ExpandedTitle>
        <ExpandedDescription collapse>
            {podcast.description}
        </ExpandedDescription>
    </StyledExpandedContainer>
);

const TitleContainer = styled('div')`
    display: flex;
    justify-content: center;
    align-items: center;
    grid-area: title;
`;
const PlayContainer = styled('div')`
    grid-area: play;
`;
const SliderContainer = styled('div')`
    grid-area: slider;
    width: 100%;
`;
const BadgeContainer = styled('div')`
    grid-area: badge;
`;
const ExpandContainer = styled('div')`
    grid-area: expand;
`;
const CloseContainer = styled('div')`
    grid-area: close;
`;

const DesktopOptionsContainer = styled('div')`
    grid-area: options;
    display: flex;
    justify-content: space-between;
    width: 100%;
    a {
        padding-left: 0;
        padding-right: 0;
        width: 36px;
    }
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
    const OptionsContainer = isCompact
        ? React.Fragment
        : DesktopOptionsContainer;
    return isActive ? (
        <ReactPlayerContainer isExpanded={isExpanded} {...props}>
            <ContentContainer isExpanded={isExpanded}>
                <TitleContainer>
                    <StyledImage
                        isExpanded={isExpanded}
                        height="64"
                        width="64"
                        src={podcast.thumbnailUrl}
                        alt={podcast.title}
                        isCompact={isCompact}
                    />
                    <PodcastTitle isCompact={isCompact} collapse>
                        {podcast.title}
                    </PodcastTitle>
                </TitleContainer>
                <PlayContainer>
                    <Button
                        aria-label={isPlaying ? 'pause' : 'play'}
                        onClick={toggleIsPlaying}
                    >
                        {isPlaying ? <AudioPauseIcon /> : <AudioPlayIcon />}
                    </Button>
                </PlayContainer>
                <SliderContainer>
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
                </SliderContainer>
                {!isCompact && (
                    <BadgeContainer>
                        <StyledBadge
                            contentType="podcast"
                            isCompact={isCompact}
                        />
                    </BadgeContainer>
                )}
                <OptionsContainer>
                    <ExpandContainer>
                        <Button onClick={toggleIsExpanded}>
                            <ExpandIcon down={isExpanded} />
                        </Button>
                    </ExpandContainer>
                    <CloseContainer>
                        <Button aria-label="close" onClick={onClose}>
                            <CloseIcon height="36" />
                        </Button>
                    </CloseContainer>
                </OptionsContainer>
                {isExpanded && <ExpandedContainer podcast={podcast} />}
            </ContentContainer>
        </ReactPlayerContainer>
    ) : null;
};

export default Audio;
