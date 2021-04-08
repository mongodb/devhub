import React, { useCallback, useReducer } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import StarIcon from '~components/dev-hub/icons/star-icon';
import Button from '~components/dev-hub/button';

import { size, fontSize, screenSize, lineHeight } from './theme';

const StyledButton = styled(Button)`
    margin-right: ${size.mediumLarge};
    padding: 0;

    display: inline-flex;
    justify-content: center;
    align-items: center;

    svg {
        height: ${size.mediumLarge};
        width: ${size.mediumLarge};
    }

    @media ${screenSize.mediumAndUp} {
        margin: ${({ isActive }) => (isActive ? '0' : '0 4px')};
        padding: 4px;
        svg {
            height: auto;
            width: auto;
        }
    }
`;

const StyledContainer = styled('div')`
    display: flex;
    flex-direction: column;

    @media ${screenSize.mediumAndUp} {
        flex-direction: row;
        align-items: center;
        min-height: ${size.large};
    }
`;

const StyledTitle = styled('span')`
    font-family: 'Fira Mono', monospace;
    font-size: ${fontSize.small};
    font-weight: bold;
    line-height: ${lineHeight.micro};
    margin-bottom: ${size.default};

    @media ${screenSize.mediumAndUp} {
        flex-direction: row;
        margin-bottom: 0;
    }
`;

const StyledStarsContainer = styled('div')`
    align-items: center;
    display: flex;

    @media ${screenSize.mediumAndUp} {
        margin-left: 28px;
    }
`;

const STAR_ACTIONS = {
    FIRST: 'first',
    SECOND: 'second',
    THIRD: 'third',
    FOURTH: 'fourth',
    FIFTH: 'fifth',
    CLEAR: 'clear',
    CLICKED: 'clicked',
};

const initialState = {
    starts: [false, false, false, false, false],
    isClicked: false,
};

const reducer = (state, action) => {
    let nextState = { isClicked: false, starts: [...initialState.starts] };
    switch (action) {
        case STAR_ACTIONS.FIFTH:
            nextState.starts[4] = true;
        case STAR_ACTIONS.FOURTH:
            nextState.starts[3] = true;
        case STAR_ACTIONS.THIRD:
            nextState.starts[2] = true;
        case STAR_ACTIONS.SECOND:
            nextState.starts[1] = true;
        case STAR_ACTIONS.FIRST:
            nextState.starts[0] = true;
            break;
        case STAR_ACTIONS.CLICKED:
            nextState = { ...state, isClicked: true };
            break;
        case STAR_ACTIONS.CLEAR:
            nextState = { ...initialState };
            break;
        default:
            throw new Error();
    }

    return { ...nextState };
};

const StarRating = ({ clickHandlers }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const onClickHandler = useCallback(
        handler => {
            if (!state.isClicked) {
                handler && handler();
                dispatch(STAR_ACTIONS.CLICKED);
            }
        },
        [state.isClicked]
    );

    const onHoverHandler = useCallback(
        star => {
            !state.isClicked && dispatch(star);
        },
        [state.isClicked]
    );
    const onLeaveHandler = useCallback(() => {
        !state.isClicked && dispatch(STAR_ACTIONS.CLEAR);
    }, [state.isClicked]);

    return (
        <StyledContainer>
            <StyledTitle>Rate this article</StyledTitle>
            <StyledStarsContainer onMouseLeave={onLeaveHandler}>
                <StyledButton
                    onClick={() => onClickHandler(clickHandlers[0])}
                    onMouseEnter={() => onHoverHandler(STAR_ACTIONS.FIRST)}
                    isActive={state.starts[0]}
                >
                    <StarIcon
                        isActive={state.starts[0]}
                        name="first-star"
                        size={state.starts[0] && size.mediumLarge}
                    >
                        <stop offset="0%" stopColor="#D34F94" />
                        <stop offset="100%" stopColor="#D95B8F" />
                    </StarIcon>
                </StyledButton>
                <StyledButton
                    isActive={state.starts[1]}
                    onClick={() => onClickHandler(clickHandlers[1])}
                    onMouseEnter={() => onHoverHandler(STAR_ACTIONS.SECOND)}
                >
                    <StarIcon
                        isActive={state.starts[1]}
                        name="second-star"
                        size={state.starts[1] && size.mediumLarge}
                    >
                        <stop offset="0%" stopColor="#D95B8F" />
                        <stop offset="100%" stopColor="#E06D88" />
                    </StarIcon>
                </StyledButton>
                <StyledButton
                    isActive={state.starts[2]}
                    onClick={() => onClickHandler(clickHandlers[2])}
                    onMouseEnter={() => onHoverHandler(STAR_ACTIONS.THIRD)}
                >
                    <StarIcon
                        name="third-star"
                        isActive={state.starts[2]}
                        size={state.starts[2] && size.mediumLarge}
                    >
                        <stop offset="0%" stopColor="#E06D88" />
                        <stop offset="100%" stopColor="#E47983" />
                    </StarIcon>
                </StyledButton>
                <StyledButton
                    isActive={state.starts[3]}
                    onClick={() => onClickHandler(clickHandlers[3])}
                    onMouseEnter={() => onHoverHandler(STAR_ACTIONS.FOURTH)}
                >
                    <StarIcon
                        isActive={state.starts[3]}
                        name="fourth-star"
                        size={state.starts[3] && size.mediumLarge}
                    >
                        <stop offset="0%" stopColor="#E47983" />
                        <stop offset="100%" stopColor="#F09677" />
                    </StarIcon>
                </StyledButton>
                <StyledButton
                    isActive={state.starts[4]}
                    onClick={() => onClickHandler(clickHandlers[4])}
                    onMouseEnter={() => onHoverHandler(STAR_ACTIONS.FIFTH)}
                >
                    <StarIcon
                        isActive={state.starts[4]}
                        name="fifth-star"
                        size={state.starts[4] && size.mediumLarge}
                    >
                        <stop offset="0%" stopColor="#F09677" />
                        <stop offset="100%" stopColor="#F7A76F" />
                    </StarIcon>
                </StyledButton>
            </StyledStarsContainer>
        </StyledContainer>
    );
};

StarRating.propTypes = {
    clickHandlers: PropTypes.arrayOf(PropTypes.func),
};

export default React.memo(StarRating);
