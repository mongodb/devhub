import React, { useCallback, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import useMedia from '../../hooks/use-media';
import { getTimeLabel } from '../../utils/get-time-label';
import AudioPauseIcon from './icons/audio-pause-icon';
import AudioPlayIcon from './icons/audio-play-icon';
import CloseIcon from './icons/close-icon';
import ExpandIcon from './icons/expand-icon';
import Button from './button';
import Badge from './badge';
import Slider from './slider';
import { H2, P } from './text';
import { layer, screenSize, size } from './theme';

const ROW_SIZE = 80;

const ReactPlayerContainer = styled('div')`
    align-content: center;
    background-color: ${({ theme }) => theme.colorMap.greyDarkThree};
    bottom: 0;
    display: flex;
    justify-content: center;
    left: 0;
    position: fixed;
    width: 100%;
    z-index: ${layer.superFront};
`;

const condensedMobilePlayerStyle = css`
    grid-template-areas: 'play podcast-title close';
    grid-template-rows: ${ROW_SIZE}px;
    row-gap: 0;
`;

const ContentContainer = styled('div')`
    align-items: center;
    display: grid;
    column-gap: ${size.large};
    justify-items: center;
    grid-template-areas:
        'image play slider badge options'
        'details details details details details';
    grid-template-columns: ${size.xlarge} ${size.large} auto 76px 88px;
    grid-template-rows: ${ROW_SIZE}px auto;
    max-width: ${size.maxWidth};
    padding: 0 ${size.xlarge};
    width: 100%;
    @media ${screenSize.upToLarge} {
        column-gap: ${size.xsmall};
        grid-template-areas:
            'play podcast-title close'
            'slider slider slider'
            'details details details'
            '. expand .';
        grid-template-columns: ${size.large} auto ${size.large};
        grid-template-rows: ${ROW_SIZE}px auto auto 48px;
        padding: 0 ${size.default};
        row-gap: ${size.large};
        ${({ isExpanded }) => !isExpanded && condensedMobilePlayerStyle};
    }
`;

// Create grid-area containers for elements
const CloseButton = styled(Button)`
    grid-area: close;
`;
const ExpandButton = styled(Button)`
    grid-area: expand;
`;
const ExpandedTitle = styled(H2)`
    grid-area: exp-title;
    @media ${screenSize.upToLarge} {
        display: none;
    }
`;
const ExpandedDescription = styled(P)`
    color: ${({ theme }) => theme.colorMap.greyLightTwo};
    grid-area: exp-desc;
`;
const PlayContainer = styled('div')`
    grid-area: play;
`;
const PodcastTitleButton = styled(Button)`
    font-family: akzidenz;
    grid-area: podcast-title;
    text-align: center;
    text-decoration: none;
    width: 100%;
`;
const StyledBadge = styled(Badge)`
    grid-area: badge;
    height: fit-content;
    position: relative;
`;
const SliderContainer = styled('div')`
    grid-area: slider;
    width: 100%;
`;
const StyledImage = styled('img')`
    border-radius: ${size.xsmall};
    grid-area: image;
`;

const StyledExpandedContainer = styled('div')`
    align-self: center;
    background-color: ${({ theme }) => theme.colorMap.greyDarkThree};
    column-gap: ${size.mediumLarge};
    display: grid;
    grid-area: details;
    grid-template-areas: 'exp-title exp-desc exp-desc';
    max-width: ${size.maxWidth};
    padding: ${size.large} 0;
    width: 100%;
    @media ${screenSize.upToLarge} {
        grid-template-areas: 'exp-desc';
        padding: 0;
    }
`;

const ExpandedContainer = ({ podcast }) => (
    <StyledExpandedContainer>
        <ExpandedTitle>{podcast.title}</ExpandedTitle>
        <ExpandedDescription collapse>
            {podcast.description}
        </ExpandedDescription>
    </StyledExpandedContainer>
);

const DesktopOptionsContainer = styled('div')`
    display: flex;
    grid-area: options;
    justify-content: space-between;
    width: 100%;
    a {
        padding-left: 0;
        padding-right: 0;
        width: ${size.large};
    }
`;

const AudioPlayButton = React.memo(({ isPlaying, toggleIsPlaying }) => (
    <PlayContainer>
        <Button
            aria-label={isPlaying ? 'pause' : 'play'}
            onClick={toggleIsPlaying}
        >
            {isPlaying ? <AudioPauseIcon /> : <AudioPlayIcon />}
        </Button>
    </PlayContainer>
));

const PodcastOptions = React.memo(
    ({ isExpanded, isMobile, onClose, toggleIsExpanded }) => {
        const OptionsContainer = isMobile
            ? React.Fragment
            : DesktopOptionsContainer;
        return (
            <OptionsContainer>
                {(!isMobile || isExpanded) && (
                    <ExpandButton onClick={toggleIsExpanded}>
                        <ExpandIcon width={size.large} down={isExpanded} />
                    </ExpandButton>
                )}
                <CloseButton aria-label="close" onClick={onClose}>
                    <CloseIcon width={size.large} />
                </CloseButton>
            </OptionsContainer>
        );
    }
);

const Audio = ({ onClose, podcast, ...props }) => {
    const [playerRef, setPlayerRef] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);
    const [progress, setProgress] = useState({ playedSeconds: 0 });
    const [duration, setDuration] = useState(null);
    const isMobile = useMedia(screenSize.upToLarge);
    const toggleIsExpanded = useCallback(() => {
        setIsExpanded(!isExpanded);
    }, [isExpanded]);
    const toggleIsPlaying = useCallback(
        e => {
            e.stopPropagation();
            setIsPlaying(!isPlaying);
        },
        [isPlaying]
    );
    const onChange = useCallback(
        seconds => {
            playerRef.seekTo(seconds);
        },
        [playerRef]
    );
    useEffect(() => {
        setIsPlaying(!!podcast);
    }, [podcast]);

    return podcast ? (
        <ReactPlayerContainer tabIndex="0" {...props}>
            <ContentContainer isExpanded={isExpanded}>
                {!isMobile && (
                    <StyledImage
                        isExpanded={isExpanded}
                        height={size.xlarge}
                        width={size.xlarge}
                        src={podcast.thumbnailUrl}
                        alt={podcast.title}
                    />
                )}
                {isMobile && (
                    <PodcastTitleButton onClick={toggleIsExpanded}>
                        <P collapse>{podcast.title}</P>
                    </PodcastTitleButton>
                )}
                <AudioPlayButton
                    isPlaying={isPlaying}
                    toggleIsPlaying={toggleIsPlaying}
                />
                {(!isMobile || isExpanded) && (
                    <SliderContainer>
                        <Slider
                            current={progress.playedSeconds}
                            currentLabel={getTimeLabel(progress.playedSeconds)}
                            onChange={onChange}
                            seconds={progress.playedSeconds}
                            total={duration}
                            totalLabel={getTimeLabel(duration)}
                        />
                    </SliderContainer>
                )}
                {!isMobile && <StyledBadge contentType="podcast" />}
                <PodcastOptions
                    isMobile={isMobile}
                    isExpanded={isExpanded}
                    onClose={onClose}
                    toggleIsExpanded={toggleIsExpanded}
                />
                {isExpanded && <ExpandedContainer podcast={podcast} />}
                <ReactPlayer
                    ref={setPlayerRef}
                    width="0"
                    height="0"
                    url={podcast.url}
                    onDuration={setDuration}
                    onProgress={setProgress}
                    playing={isPlaying}
                />
            </ContentContainer>
        </ReactPlayerContainer>
    ) : null;
};

export default Audio;
