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

const StarRating = ({ clickHandlers }) => {
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

    return (
        <StyledContainer>
            <StyledTitle>Rate this article</StyledTitle>
            <StyledStarsContainer onMouseLeave={onLeaveHandler}>
                <StyledButton
                    onClick={() => onClickHandler(clickHandlers[0])}
                    onMouseEnter={() => onHoverHandler(STAR_ACTIONS.ONE)}
                    isActive={ratingState.starts[0]}
                >
                    <StarIcon
                        isActive={ratingState.starts[0]}
                        name="first-star"
                        size={ratingState.starts[0] && size.mediumLarge}
                    >
                        <stop offset="0%" stopColor="#D34F94" />
                        <stop offset="100%" stopColor="#D95B8F" />
                    </StarIcon>
                </StyledButton>
                <StyledButton
                    isActive={ratingState.starts[1]}
                    onClick={() => onClickHandler(clickHandlers[1])}
                    onMouseEnter={() => onHoverHandler(STAR_ACTIONS.TWO)}
                >
                    <StarIcon
                        isActive={ratingState.starts[1]}
                        name="second-star"
                        size={ratingState.starts[1] && size.mediumLarge}
                    >
                        <stop offset="0%" stopColor="#D95B8F" />
                        <stop offset="100%" stopColor="#E06D88" />
                    </StarIcon>
                </StyledButton>
                <StyledButton
                    isActive={ratingState.starts[2]}
                    onClick={() => onClickHandler(clickHandlers[2])}
                    onMouseEnter={() => onHoverHandler(STAR_ACTIONS.THREE)}
                >
                    <StarIcon
                        name="third-star"
                        isActive={ratingState.starts[2]}
                        size={ratingState.starts[2] && size.mediumLarge}
                    >
                        <stop offset="0%" stopColor="#E06D88" />
                        <stop offset="100%" stopColor="#E47983" />
                    </StarIcon>
                </StyledButton>
                <StyledButton
                    isActive={ratingState.starts[3]}
                    onClick={() => onClickHandler(clickHandlers[3])}
                    onMouseEnter={() => onHoverHandler(STAR_ACTIONS.FOUR)}
                >
                    <StarIcon
                        isActive={ratingState.starts[3]}
                        name="fourth-star"
                        size={ratingState.starts[3] && size.mediumLarge}
                    >
                        <stop offset="0%" stopColor="#E47983" />
                        <stop offset="100%" stopColor="#F09677" />
                    </StarIcon>
                </StyledButton>
                <StyledButton
                    isActive={ratingState.starts[4]}
                    onClick={() => onClickHandler(clickHandlers[4])}
                    onMouseEnter={() => onHoverHandler(STAR_ACTIONS.FIVE)}
                >
                    <StarIcon
                        isActive={ratingState.starts[4]}
                        name="fifth-star"
                        size={ratingState.starts[4] && size.mediumLarge}
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
