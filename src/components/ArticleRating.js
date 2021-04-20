import React, { useCallback, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { colorMap, size, screenSize } from '~components/dev-hub/theme';
import StarRating from '~components/dev-hub/star-rating';
import { FeedbackContainer } from '~components/dev-hub/feedback';
import { FeedbackFormStateProvider } from '~components/dev-hub/feedback/feedback-context';
import {
    ArticleRatingContext,
    STAR_ACTIONS,
} from '~components/ArticleRatingContext';

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

const ArticleRating = ({ isTop, isBottom, className, articleMeta }) => {
    const Container = isBottom
        ? StyledContainerBottom
        : isTop
        ? StyledContainerTop
        : null;

    const {
        ratingState: { starRatingFlow },
        ratingDispatch,
    } = useContext(ArticleRatingContext);
    const [showModal, setShowModal] = useState(false);

    const setFlowHandler = useCallback(
        flow => {
            ratingDispatch(STAR_ACTIONS.SET_FLOW, flow);
            setShowModal(true);
        },
        [ratingDispatch]
    );

    const closeModalHandler = useCallback(() => setShowModal(false), []);

    const renderFeedback = () =>
        showModal && starRatingFlow ? (
            <FeedbackFormStateProvider>
                <FeedbackContainer
                    articleMeta={articleMeta}
                    starRatingFlow={starRatingFlow}
                    closeModal={closeModalHandler}
                />
            </FeedbackFormStateProvider>
        ) : null;

    return (
        <>
            {renderFeedback()}
            <Container className={className}>
                <StarRating
                    clickHandlers={[
                        () => setFlowHandler(STAR_ACTIONS.ONE),
                        () => setFlowHandler(STAR_ACTIONS.TWO),
                        () => setFlowHandler(STAR_ACTIONS.THREE),
                        () => setFlowHandler(STAR_ACTIONS.FOUR),
                        () => setFlowHandler(STAR_ACTIONS.FIVE),
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
