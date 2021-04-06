import React, { useCallback, useReducer } from 'react';
import PropTypes from 'prop-types';
import StarIcon from '~components/dev-hub/icons/star-icon';
import styled from '@emotion/styled';
import { size, fontSize, screenSize } from './theme';

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;

    @media ${screenSize.mediumAndUp} {
        flex-direction: row;
    }
`;

const StyledStar = styled(StarIcon)`
    width: ${size.mediumLarge};
    height: ${size.mediumLarge};
    margin-right: ${size.mediumLarge};
    box-sizing: content-box;

    @media ${screenSize.mediumAndUp} {
        padding: 4px;
        width: auto;
        height: auto;
        margin-right: ${({ isActive }) => (isActive ? '0' : size.xsmall)};

        &:hover {
            cursor: ${({ isClicked }) => (isClicked ? 'default' : 'pointer')};
        }
    }
`;

const StyledStarsContainer = styled.div`
    display: flex;
    align-items: center;

    @media ${screenSize.mediumAndUp} {
        margin-left: ${size.large};
    }
`;

const StyledTitle = styled.span`
    font-family: 'Fira Mono', monospace;
    font-weight: bold;
    font-size: ${fontSize.small};
`;

const initialState = {
    first: false,
    second: false,
    third: false,
    fourth: false,
    fifth: false,
    isClicked: false,
};

const reducer = (state, action) => {
    let nextState = { ...initialState };
    switch (action) {
        case 'fifth':
            nextState = { ...nextState, fifth: true };
        case 'fourth':
            nextState = { ...nextState, fourth: true };
        case 'third':
            nextState = { ...nextState, third: true };
        case 'second':
            nextState = { ...nextState, second: true };
        case 'first':
            nextState = { ...nextState, first: true };
            break;
        case 'clicked':
            nextState = { ...state, isClicked: true };
            break;
        case 'clear':
            nextState = { ...initialState };
            break;
        default:
            throw new Error();
    }

    return nextState;
};

const StarRating = ({ onFirstsClick, onMiddleClick, onLatestClick }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const onClickHandler = useCallback(
        handler => {
            if (!state.isClicked) {
                handler && handler();
                dispatch('clicked');
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
        !state.isClicked && dispatch('clear');
    }, [state.isClicked]);

    return (
        <StyledContainer>
            <StyledTitle>Rate this article</StyledTitle>
            <StyledStarsContainer onMouseLeave={onLeaveHandler}>
                <StyledStar
                    isActive={state.first}
                    isClicked={state.isClicked}
                    name="first-star"
                    onClick={() => onClickHandler(onFirstsClick)}
                    onMouseEnter={() => onHoverHandler('first')}
                    width={state.first && size.mediumLarge}
                >
                    <stop offset="0%" stopColor="#D34F94" />
                    <stop offset="100%" stopColor="#D95B8F" />
                </StyledStar>
                <StyledStar
                    isActive={state.second}
                    isClicked={state.isClicked}
                    name="second-star"
                    onClick={() => onClickHandler(onFirstsClick)}
                    onMouseEnter={() => onHoverHandler('second')}
                    width={state.second && size.mediumLarge}
                >
                    <stop offset="0%" stopColor="#D95B8F" />
                    <stop offset="100%" stopColor="#E06D88" />
                </StyledStar>
                <StyledStar
                    isActive={state.third}
                    isClicked={state.isClicked}
                    name="third-star"
                    onClick={() => onClickHandler(onMiddleClick)}
                    onMouseEnter={() => onHoverHandler('third')}
                    width={state.third && size.mediumLarge}
                >
                    <stop offset="0%" stopColor="#E06D88" />
                    <stop offset="100%" stopColor="#E47983" />
                </StyledStar>

                <StyledStar
                    isActive={state.fourth}
                    isClicked={state.isClicked}
                    name="fourth-star"
                    onClick={() => onClickHandler(onLatestClick)}
                    onMouseEnter={() => onHoverHandler('fourth')}
                    width={state.fourth && size.mediumLarge}
                >
                    <stop offset="0%" stopColor="#E47983" />
                    <stop offset="100%" stopColor="#F09677" />
                </StyledStar>

                <StyledStar
                    isActive={state.fifth}
                    isClicked={state.isClicked}
                    name="fifth-star"
                    onClick={() => onClickHandler(onLatestClick)}
                    onMouseEnter={() => onHoverHandler('fifth')}
                    width={state.fifth && size.mediumLarge}
                >
                    <stop offset="0%" stopColor="#F09677" />
                    <stop offset="100%" stopColor="#F7A76F" />
                </StyledStar>
            </StyledStarsContainer>
        </StyledContainer>
    );
};

StarRating.propTypes = {
    onFirstsClick: PropTypes.func,
    onMiddleClick: PropTypes.func,
    onLatestClick: PropTypes.func,
};

export default React.memo(StarRating);
