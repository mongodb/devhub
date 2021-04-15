import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { colorMap, size, screenSize } from '~components/dev-hub/theme';
import StarRating from '~components/dev-hub/star-rating';
import {
    FeedbackContainer,
    STAR_RATING_FLOW,
} from '~components/dev-hub/feedback';

const StyledContainerTop = styled.div`
    span {
        text-align: end;
    }

    @media ${screenSize.upToMedium} {
        a:last-child {
            margin-right: 0;
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

const ArticleRating = ({ isTop, isBottom, className }) => {
    const Container = isBottom
        ? StyledContainerBottom
        : isTop
        ? StyledContainerTop
        : null;

    const [modal, setModal] = useState('');

    const onSubmitHandler = useCallback(data => {
        console.log('Form Submit', data);
    }, []);

    return (
        <>
            {modal && (
                <FeedbackContainer
                    onSubmit={onSubmitHandler}
                    starRatingFlow={modal}
                />
            )}
            <Container className={className}>
                <StarRating
                    clickHandlers={[
                        () => setModal(STAR_RATING_FLOW.ONE),
                        () => setModal(STAR_RATING_FLOW.TWO),
                        () => setModal(STAR_RATING_FLOW.THREE),
                        () => setModal(STAR_RATING_FLOW.FOUR),
                        () => setModal(STAR_RATING_FLOW.FIVE),
                    ]}
                />
            </Container>
        </>
    );
};

ArticleRating.propTypes = {
    isTop: PropTypes.bool,
    isBottom: PropTypes.bool,
};

export default React.memo(ArticleRating);
