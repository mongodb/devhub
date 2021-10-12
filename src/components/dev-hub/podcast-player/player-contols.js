import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import Button from '~components/dev-hub/button';
import {
    FastForwardIcon,
    PauseIcon,
    PlayIcon,
    RewindIcon,
} from '~components/dev-hub/icons/audio-player';

import { screenSize, size } from '~components/dev-hub/theme';

const MOBILE_MAIN_BUTTON_HEIGHT = '100px';
const MOBILE_MAIN_BUTTON_WIDTH = '110px;';

const buttonStyles = css`
    margin-right: 12px;
    padding: ${size.tiny};
    &:active {
        filter: brightness(60%);
    }
`;

const mainButtonHover = css`
    svg {
        transform: scale(1.075);
        circle {
            stroke-width: 2;
            r: 38;
        }
        path {
            stroke-width: 2;
        }
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
        ${mainButtonHover}
    }

    @media ${screenSize.upToSmall} {
        align-items: center;
        display: inline-flex;
        height: ${MOBILE_MAIN_BUTTON_HEIGHT};
        justify-content: center;
        width: ${MOBILE_MAIN_BUTTON_WIDTH};
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
