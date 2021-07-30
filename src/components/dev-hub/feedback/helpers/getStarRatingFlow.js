import dlv from 'dlv';
import { STAR_RATING_FLOW } from '~components/ArticleRatingContext';

const getFlow = (flow, step) => ({
    ratingFlow: flow?.forms[step],
    stepsCounter: flow?.forms?.length,
});

const getStarRatingFlow = (data, star, step) => {
    const {
        OneStarRatingFlow,
        TwoStarRatingFlow,
        ThreeStarRatingFlow,
        FourStarRatingFlow,
        FiveStarRatingFlow,
    } = dlv(data, 'strapiFeedbackRatingFlow', {});

    switch (star) {
        case STAR_RATING_FLOW.ONE:
            return getFlow(OneStarRatingFlow, step);
        case STAR_RATING_FLOW.TWO:
            return getFlow(TwoStarRatingFlow, step);
        case STAR_RATING_FLOW.THREE:
            return getFlow(ThreeStarRatingFlow, step);
        case STAR_RATING_FLOW.FOUR:
            return getFlow(FourStarRatingFlow, step);
        case STAR_RATING_FLOW.FIVE:
            return getFlow(FiveStarRatingFlow, step);
        default:
            return {};
    }
};

export default getStarRatingFlow;
