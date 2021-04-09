import React from 'react';
import styled from '@emotion/styled';
import { colorMap, size, screenSize } from '~components/dev-hub/theme';
import StarRating from '~components/dev-hub/star-rating';
import PropTypes from 'prop-types';

const StyledContainerTop = styled.div``;

const StyledContainerBottom = styled.div`
    background-color: ${colorMap.devBlack};
    border-radius: ${size.xsmall};
    border: 1px solid ${colorMap.greyDarkThree};
    padding: ${size.mediumLarge};
  
    @media ${screenSize.mediumAndUp} {
        padding-left: ${size.large};
        padding: 15px;
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
                clickHandlers={[
                    () => alert('1 Modal'),
                    () => alert('2 Modal'),
                    () => alert('3 Modal'),
                    () => alert('4 Modal'),
                    () => alert('5 Modal'),
                ]}
            />
        </Container>
    );
};

ArticleRating.propTypes = {
    isTop: PropTypes.bool,
    isBottom: PropTypes.bool,
};

export default React.memo(ArticleRating);
