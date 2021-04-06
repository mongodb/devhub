import React from 'react';
import styled from '@emotion/styled';
import { colorMap, size, screenSize } from '~components/dev-hub/theme';
import StarRating from '~components/dev-hub/star-rating';
import PropTypes from 'prop-types';

const StyledContainerTop = styled.div``;

const StyledContainerBottom = styled.div`
    background-color: ${colorMap.devBlack};
    border: 1px solid ${colorMap.greyDarkThree};
    border-radius: ${size.xsmall};
    padding: ${size.mediumLarge};
    @media ${screenSize.mediumAndUp} {
        padding-left: ${size.large};
    }
`;

//TODO: test container for rating
const ArticleRating = ({ isTop, isBottom }) => {
    const Container = isBottom
        ? StyledContainerBottom
        : isTop
        ? StyledContainerTop
        : null;

    return (
        <Container>
            <StarRating
                onFirstsClick={() => {
                    alert('First Modal');
                }}
                onMiddleClick={() => {
                    alert('Second Modal');
                }}
                onLatestClick={() => {
                    alert('Third Modal');
                }}
            />
        </Container>
    );
};

ArticleRating.propTypes = {
    isTop: PropTypes.bool,
    isBottom: PropTypes.bool,
};

export default React.memo(ArticleRating);
