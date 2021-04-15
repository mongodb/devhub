import dlv from 'dlv';

export const STAR_RATING_FLOW = {
    ONE: 'one',
    TWO: 'two',
    THREE: 'three',
    FOUR: 'four',
    FIVE: 'five',
};

const getFlow = (flow, step) => ({
    ratingFlow: flow?.forms[step],
    stepsCounter: flow?.forms?.length,
});

export const getStarRatingFlow = (data, star, step) => {
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
