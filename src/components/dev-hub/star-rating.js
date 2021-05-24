import React, { useCallback, useContext, memo } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import StarIcon from '~components/dev-hub/icons/star-icon';
import Button from '~components/dev-hub/button';
import {
    ArticleRatingContext,
    STAR_ACTIONS,
} from '~components/ArticleRatingContext';

import { size, fontSize, screenSize, lineHeight } from './theme';

const StyledButton = styled(Button)`
    margin-right: ${size.mediumLarge};
    padding: 0;

    align-items: center;
    display: inline-flex;
    justify-content: center;

    svg {
        height: ${size.mediumLarge};
        width: ${size.mediumLarge};
    }

    @media ${screenSize.largeAndUp} {
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

    @media ${screenSize.largeAndUp} {
        align-items: center;
        flex-direction: row;
        min-height: ${size.large};
    }
`;

const StyledTitle = styled('span')`
    font-family: 'Fira Mono', monospace;
    font-size: ${fontSize.small};
    font-weight: bold;
    line-height: ${lineHeight.micro};
    margin-bottom: ${size.default};

    @media ${screenSize.largeAndUp} {
        flex-direction: row;
        margin-bottom: 0;
    }
`;

const StyledStarsContainer = styled('div')`
    align-items: center;
    display: flex;

    @media ${screenSize.largeAndUp} {
        margin-left: 28px;
    }
`;

const StarRating = ({ clickHandlers, isTop }) => {
    const { ratingState, ratingDispatch } = useContext(ArticleRatingContext);

    const onClickHandler = useCallback(
        handler => {
            if (!ratingState.isClicked) {
                handler && handler();
                ratingDispatch(STAR_ACTIONS.CLICKED);
            }
        },
        [ratingDispatch, ratingState.isClicked]
    );

    const onHoverHandler = useCallback(
        star => {
            !ratingState.isClicked && ratingDispatch(star);
        },
        [ratingDispatch, ratingState.isClicked]
    );
    const onLeaveHandler = useCallback(() => {
        !ratingState.isClicked && ratingDispatch(STAR_ACTIONS.CLEAR);
    }, [ratingDispatch, ratingState.isClicked]);

    const onOpenFeedback = useCallback(
        (index, starActionsNumber) => () => {
            onHoverHandler(starActionsNumber);
            onClickHandler(clickHandlers[index]);
        },
        [clickHandlers, onClickHandler, onHoverHandler]
    );

    const uniqueStarSuffix = isTop ? '-top' : '-bottom';

    return (
        <StyledContainer>
            <StyledTitle>Rate this article</StyledTitle>
            <StyledStarsContainer onMouseLeave={onLeaveHandler}>
                <StyledButton
                    aria-label="One Star"
                    onClick={onOpenFeedback(0, STAR_ACTIONS.ONE)}
                    onMouseEnter={() => onHoverHandler(STAR_ACTIONS.ONE)}
                    onTouchEnd={onOpenFeedback(0, STAR_ACTIONS.ONE)}
                    isActive={ratingState.stars[0]}
                >
                    <StarIcon
                        ariaLabel="One Star"
                        isActive={ratingState.stars[0]}
                        name={`first-star${uniqueStarSuffix}`}
                        size={ratingState.stars[0] && size.mediumLarge}
                    >
                        <stop offset="0%" stopColor="#D34F94" />
                        <stop offset="100%" stopColor="#D95B8F" />
                    </StarIcon>
                </StyledButton>
                <StyledButton
                    aria-label="Two Stars"
                    isActive={ratingState.stars[1]}
                    onClick={onOpenFeedback(1, STAR_ACTIONS.TWO)}
                    onMouseEnter={() => onHoverHandler(STAR_ACTIONS.TWO)}
                    onTouchEnd={onOpenFeedback(1, STAR_ACTIONS.TWO)}
                >
                    <StarIcon
                        ariaLabel="Two Stars"
                        isActive={ratingState.stars[1]}
                        name={`second-star${uniqueStarSuffix}`}
                        size={ratingState.stars[1] && size.mediumLarge}
                    >
                        <stop offset="0%" stopColor="#D95B8F" />
                        <stop offset="100%" stopColor="#E06D88" />
                    </StarIcon>
                </StyledButton>
                <StyledButton
                    aria-label="Three Stars"
                    isActive={ratingState.stars[2]}
                    onClick={onOpenFeedback(2, STAR_ACTIONS.THREE)}
                    onMouseEnter={() => onHoverHandler(STAR_ACTIONS.THREE)}
                    onTouchEnd={onOpenFeedback(2, STAR_ACTIONS.THREE)}
                >
                    <StarIcon
                        ariaLabel="Three Stars"
                        name={`third-star${uniqueStarSuffix}`}
                        isActive={ratingState.stars[2]}
                        size={ratingState.stars[2] && size.mediumLarge}
                    >
                        <stop offset="0%" stopColor="#E06D88" />
                        <stop offset="100%" stopColor="#E47983" />
                    </StarIcon>
                </StyledButton>
                <StyledButton
                    aria-label="Four Stars"
                    isActive={ratingState.stars[3]}
                    onClick={onOpenFeedback(3, STAR_ACTIONS.FOUR)}
                    onMouseEnter={() => onHoverHandler(STAR_ACTIONS.FOUR)}
                    onTouchEnd={onOpenFeedback(3, STAR_ACTIONS.FOUR)}
                >
                    <StarIcon
                        ariaLabel="Four Stars"
                        isActive={ratingState.stars[3]}
                        name={`fourth-star${uniqueStarSuffix}`}
                        size={ratingState.stars[3] && size.mediumLarge}
                    >
                        <stop offset="0%" stopColor="#E47983" />
                        <stop offset="100%" stopColor="#F09677" />
                    </StarIcon>
                </StyledButton>
                <StyledButton
                    aria-label="Five Stars"
                    isActive={ratingState.stars[4]}
                    onClick={onOpenFeedback(4, STAR_ACTIONS.FIVE)}
                    onMouseEnter={() => onHoverHandler(STAR_ACTIONS.FIVE)}
                    onTouchEnd={onOpenFeedback(4, STAR_ACTIONS.FIVE)}
                >
                    <StarIcon
                        ariaLabel="Five Stars"
                        isActive={ratingState.stars[4]}
                        name={`fifth-star${uniqueStarSuffix}`}
                        size={ratingState.stars[4] && size.mediumLarge}
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

export default memo(StarRating);
