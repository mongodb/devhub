import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import {
    default as StarRating,
    StyledContainer,
    StyledStarsContainer,
} from '~components/dev-hub/star-rating';

import { colorMap, size, screenSize } from '~components/dev-hub/theme';

export const StyledContainerTop = styled.div`
    span {
        padding: 0;
    }
    ${StyledContainer} {
      align-items: flex-end;
    }
    ${StyledStarsContainer} a:last-child {
      margin-right: 0;
    }
 
    @media ${screenSize.mediumAndUp} {
      ${StyledContainer} {
        align-items: center;
      }
    }
`;

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
