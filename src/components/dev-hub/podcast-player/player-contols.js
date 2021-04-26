import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import Button from '~components/dev-hub/button';
import FastForwardIcon from '~components/dev-hub/icons/audio-player/fast-forward-icon';
import PauseIcon from '~components/dev-hub/icons/audio-player/pause-icon';
import PlayIcon from '~components/dev-hub/icons/audio-player/play-icon';
import RewindIcon from '~components/dev-hub/icons/audio-player/rewind-icon';

import { size } from '~components/dev-hub/theme';

const buttonStyles = css`
    margin-right: 12px;
    padding: ${size.tiny};
    &:active {
        filter: brightness(60%);
    }
`;

export const ControlsContainer = styled('div')`
    align-items: center;
    display: flex;
    justify-content: center;
`;

const StyledTimeControlButton = styled(Button)`
    ${buttonStyles},
    &:hover {
        svg {
            transform: scale(1.15);
        }
    }
`;

const StyledMainButton = styled(Button)`
    ${buttonStyles},
    &:hover {
        svg {
            circle {
                stroke-width: 4;
                r: 38;
            }
            path {
                stroke-width: 4;
            }
        }
    }

    @media only screen and (max-width: 480px) {
        align-items: center;
        display: inline-flex;
        height: 100px;
        justify-content: center;
        width: 110px;

        svg {
            transform: scale(1.25);
        }
    }
`;

const PlayerControls = ({
    className,
    isPlaying,
    moveBack,
    moveForward,
    toggleIsPlaying,
}) => (
    <ControlsContainer className={className}>
        <StyledTimeControlButton aria-label="rewind" onClick={moveBack}>
            <RewindIcon />
        </StyledTimeControlButton>
        <StyledMainButton
            aria-label={isPlaying ? 'pause' : 'play'}
            onClick={toggleIsPlaying}
        >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </StyledMainButton>
        <StyledTimeControlButton
            aria-label="fast-forward"
            onClick={moveForward}
        >
            <FastForwardIcon />
        </StyledTimeControlButton>
    </ControlsContainer>
);

PlayerControls.propTypes = {
    className: PropTypes.object,
    isPlaying: PropTypes.bool.isRequired,
    moveBack: PropTypes.func,
    moveForward: PropTypes.func,
    toggleIsPlaying: PropTypes.func,
};

export default memo(PlayerControls);
