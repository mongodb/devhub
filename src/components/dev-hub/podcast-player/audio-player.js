import React, { useCallback, useReducer, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import ReactPlayer from 'react-player/lazy';

import PlayerControls, {
    ControlsContainer,
} from '~components/dev-hub/podcast-player/player-contols';
import PlayerListenOn from '~components/dev-hub/podcast-player/player-listen-on';
import Slider, { SliderContainer } from '~components/dev-hub/slider';

import { getTimeLabel } from '~utils/get-time-label';
import { size, colorMap, screenSize } from '~components/dev-hub/theme';

import {
    PLAYER_ACTIONS,
    playerInitialState,
    playerReducer,
} from '~components/dev-hub/podcast-player/player-reducer';

const mobileSliderStyles = css`
    display: grid;
    grid-template-areas:
        'slider slider'
        'current  total';
    justify-content: space-between;

    input {
        grid-area: slider;
    }
    p {
        &:first-of-type {
            grid-area: current;
            margin-left: ${size.tiny};
        }
        &:last-of-type {
            grid-area: total;
            margin-right: ${size.tiny};
            text-align: end;
        }
    }
`;

const ContentContainer = styled('div')`
    display: flex;
    justify-content: center;
`;

const PlayerContainer = styled('div')`
    align-items: flex-start;
    background-color: ${colorMap.devBlack};
    border-radius: ${size.xsmall};
    border: ${colorMap.greyDarkTwo} 1px solid;
    display: flex;
    flex-direction: column;
    justify-items: center;
    padding: ${size.large};
    width: 100%;
`;

const AudioContainer = styled('div')`
    align-items: center;
    display: flex;
    width: 100%;

    @media ${screenSize.upToMedium} {
        flex-direction: column;

        ${ControlsContainer} {
            a:last-of-type {
                margin-right: 0;
            }
        }
    }
`;

const StyledSliderContainer = styled('div')`
    margin-left: ${size.default};
    width: 100%;

    @media ${screenSize.upToMedium} {
        margin-top: ${size.small};
        margin-left: 0;
    }

    @media ${screenSize.upToSmall} {
        margin-top: ${size.mediumLarge};

        ${SliderContainer} {
            ${mobileSliderStyles}
        }
    }
`;

const PlayerFooter = styled('div')`
    margin-top: ${size.small};

    @media ${screenSize.upToMedium} {
        margin-top: ${size.large};
        width: 100%;
    }
`;

const AudioPlayer = ({ className, podcast }) => {
    const playerRef = useRef(null);
    const [playerState, playerDispatch] = useReducer(
        playerReducer,
        playerInitialState
    );
    const { isPlaying, progress, duration, isReady } = playerState;

    const setDuration = useCallback(duration => {
        playerDispatch({ type: PLAYER_ACTIONS.SET_DURATION, value: duration });
    }, []);

    const setProgress = useCallback(progress => {
        playerDispatch({ type: PLAYER_ACTIONS.SET_PROGRESS, value: progress });
    }, []);

    const toggleIsPlaying = useCallback(e => {
        e.stopPropagation();
        playerDispatch({
            type: PLAYER_ACTIONS.TOGGLE_IS_PLAYING,
        });
    }, []);

    const onChangeHandler = useCallback(
        seconds => {
            if (isReady) {
                setProgress({ playedSeconds: seconds });
                playerRef.current.seekTo(seconds);
            }
        },
        [isReady, setProgress]
    );

    const onReadyHandler = useCallback(player => {
        playerRef.current = player;
        playerDispatch({
            type: PLAYER_ACTIONS.SET_IS_READY,
            value: true,
        });
    }, []);

    const moveForwardHandler = useCallback(() => {
        if (isReady) {
            const { getCurrentTime, seekTo } = playerRef.current;
            const newTime = getCurrentTime() + 30;
            seekTo(newTime, 'seconds');
        }
    }, [isReady]);

    const moveBackHandler = useCallback(() => {
        if (isReady) {
            const { getCurrentTime, seekTo } = playerRef.current;
            const newTime = getCurrentTime() - 30;
            seekTo(newTime, 'seconds');
        }
    }, [isReady]);

    return podcast ? (
        <ContentContainer className={className}>
            <PlayerContainer>
                <AudioContainer>
                    <PlayerControls
                        isPlaying={isPlaying}
                        moveBack={moveBackHandler}
                        moveForward={moveForwardHandler}
                        toggleIsPlaying={toggleIsPlaying}
                    />
                    <StyledSliderContainer>
                        <Slider
                            current={progress.playedSeconds}
                            currentLabel={getTimeLabel(progress.playedSeconds)}
                            onChange={onChangeHandler}
                            seconds={progress.playedSeconds}
                            total={duration}
                            totalLabel={getTimeLabel(duration)}
                        />
                    </StyledSliderContainer>
                </AudioContainer>
                <PlayerFooter>
                    <PlayerListenOn />
                </PlayerFooter>
                <ReactPlayer
                    height="0"
                    onDuration={setDuration}
                    onProgress={setProgress}
                    onReady={onReadyHandler}
                    playing={isPlaying}
                    url={podcast}
                    width="0"
                />
            </PlayerContainer>
        </ContentContainer>
    ) : null;
};

AudioPlayer.propTypes = {
    className: PropTypes.string,
    podcast: PropTypes.string.isRequired,
};

export default AudioPlayer;
