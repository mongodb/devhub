import React, { useCallback, useReducer, useRef } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import ReactPlayer from 'react-player/lazy';

import PlayerControls, {
    ControlsContainer,
} from '~components/dev-hub/podcast-player/player-contols';
import PlayerListenOn, {
    LogosContainer,
} from '~components/dev-hub/podcast-player/player-listen-on';
import Slider, { SliderContainer } from '~components/dev-hub/slider';

import { getTimeLabel } from '~utils/get-time-label';
import { size, colorMap } from '~components/dev-hub/theme';

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
    padding: 30px;
    width: 100%;
`;

const AudioContainer = styled('div')`
    align-items: center;
    display: flex;
    width: 100%;

    @media only screen and (max-width: 600px) {
        flex-direction: column;

        ${ControlsContainer} {
            margin-bottom: ${size.small};
        }
    }
`;

const StyledSliderContainer = styled('div')`
    margin-left: ${size.default};
    width: 100%;

    @media only screen and (max-width: 600px) {
        margin-left: 0;
    }

    @media only screen and (max-width: 480px) {
        margin-top: 15px;

        ${SliderContainer} {
            ${mobileSliderStyles}
        }
    }
`;

const PlayerFooter = styled('div')`
    margin-top: ${size.small};

    @media only screen and (max-width: 600px) {
        margin-top: ${size.medium};
        width: 100%;
    }

    @media only screen and (max-width: 480px) {
        ${LogosContainer} {
            flex-direction: column;
            > a {
                margin-right: 0;
                &:not(:last-of-type) {
                    margin-bottom: 20px;
                }
            }
        }
    }
`;

const AudioPlayer = ({ podcast }) => {
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
            seekTo(getCurrentTime() + 30, 'seconds');
        }
    }, [isReady]);

    const moveBackHandler = useCallback(() => {
        if (isReady) {
            const { getCurrentTime, seekTo } = playerRef.current;
            seekTo(getCurrentTime() - 30, 'seconds');
        }
    }, [isReady]);

    return podcast?.url ? (
        <ContentContainer>
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
                    url={podcast.url}
                    width="0"
                />
            </PlayerContainer>
        </ContentContainer>
    ) : null;
};

export default AudioPlayer;
