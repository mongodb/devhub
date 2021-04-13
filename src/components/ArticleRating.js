import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { colorMap, size, screenSize } from '~components/dev-hub/theme';
import StarRating from '~components/dev-hub/star-rating';
import { FeedbackContainer } from '~components/dev-hub/feedback';

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

const ArticleRating = ({ isTop, isBottom }) => {
    const Container = isBottom
        ? StyledContainerBottom
        : isTop
        ? StyledContainerTop
        : null;

    const [modal, setModal] = useState('');

    const onSubmitHandler = useCallback(data => {
        console.log('Form Submit', data);
    }, [])

    return (
        <>
            {modal && <FeedbackContainer onSubmit={onSubmitHandler} starRatingFlow={modal} />}
            <Container>
                <StarRating
                    clickHandlers={[
                        () => setModal('one'),
                        () => setModal('two'),
                        () => setModal('three'),
                        () => setModal('four'),
                        () => setModal('five'),
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
