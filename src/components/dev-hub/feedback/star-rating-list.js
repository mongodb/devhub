import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { screenSize, size } from '../theme';
import StarIcon from '../icons/star-icon';
import { ArticleRatingContext } from '~components/ArticleRatingContext';

const StyledStarsContainer = styled('div')`
    align-items: center;
    display: flex;

    @media ${screenSize.mediumAndUp} {
        margin-left: 28px;
    }
`;

const StyledStarContainer = styled('div')`
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

const StarRatingList = ({ ...props }) => {
    const state = useContext(ArticleRatingContext);
    const { ratingState } = state;
    return (
        <StyledStarsContainer {...props}>
            <StyledStarContainer>
                <StarIcon
                    isActive={ratingState.stars[0]}
                    name="first-star"
                    size={ratingState.stars[0] && size.mediumLarge}
                >
                    <stop offset="0%" stopColor="#D34F94" />
                    <stop offset="100%" stopColor="#D95B8F" />
                </StarIcon>
            </StyledStarContainer>
            <StyledStarContainer>
                <StarIcon
                    isActive={ratingState.stars[1]}
                    name="second-star"
                    size={ratingState.stars[1] && size.mediumLarge}
                >
                    <stop offset="0%" stopColor="#D95B8F" />
                    <stop offset="100%" stopColor="#E06D88" />
                </StarIcon>
            </StyledStarContainer>
            <StyledStarContainer>
                <StarIcon
                    name="third-star"
                    isActive={ratingState.stars[2]}
                    size={ratingState.stars[2] && size.mediumLarge}
                >
                    <stop offset="0%" stopColor="#E06D88" />
                    <stop offset="100%" stopColor="#E47983" />
                </StarIcon>
            </StyledStarContainer>
            <StyledStarContainer>
                <StarIcon
                    isActive={ratingState.stars[3]}
                    name="fourth-star"
                    size={ratingState.stars[3] && size.mediumLarge}
                >
                    <stop offset="0%" stopColor="#E47983" />
                    <stop offset="100%" stopColor="#F09677" />
                </StarIcon>
            </StyledStarContainer>
            <StyledStarContainer>
                <StarIcon
                    isActive={ratingState.stars[4]}
                    name="fifth-star"
                    size={ratingState.stars[4] && size.mediumLarge}
                >
                    <stop offset="0%" stopColor="#F09677" />
                    <stop offset="100%" stopColor="#F7A76F" />
                </StarIcon>
            </StyledStarContainer>
        </StyledStarsContainer>
    );
};

export default StarRatingList;
