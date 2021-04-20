import React, { createContext, useReducer } from 'react';

const ArticleRatingContext = createContext({});
const { Provider } = ArticleRatingContext;

const STAR_RATING_FLOW = {
    ONE: 1,
    TWO: 2,
    THREE: 3,
    FOUR: 4,
    FIVE: 5,
};

const STAR_ACTIONS = {
    ...STAR_RATING_FLOW,
    CLEAR: 'clear',
    CLICKED: 'clicked',
    SET_FLOW: 'set-flow',
};

const initialState = {
    starts: [false, false, false, false, false],
    isClicked: false,
    starRatingFlow: null,
};

const ratingReducer = (state, { type, value }) => {
    let nextState = { isClicked: false, starts: [...initialState.starts] };
    switch (type) {
        case STAR_ACTIONS.FIVE:
            nextState.starts[4] = true;
        case STAR_ACTIONS.FOUR:
            nextState.starts[3] = true;
        case STAR_ACTIONS.THREE:
            nextState.starts[2] = true;
        case STAR_ACTIONS.TWO:
            nextState.starts[1] = true;
        case STAR_ACTIONS.ONE:
            nextState.starts[0] = true;
            break;
        case STAR_ACTIONS.CLICKED:
            nextState = { ...state, isClicked: true };
            break;
        case STAR_ACTIONS.CLEAR:
            nextState = { ...initialState };
            break;
        case STAR_ACTIONS.SET_FLOW:
            nextState = { ...state, starRatingFlow: value };
            break;
        default:
            throw new Error();
    }

    return { ...nextState };
};

const ArticleRatingProvider = ({ children }) => {
    const [ratingState, dispatch] = useReducer(ratingReducer, initialState);

    const ratingDispatch = (type, value) => {
        dispatch({ type: type, value: value });
    };

    return (
        <Provider value={{ ratingState, ratingDispatch }}>{children}</Provider>
    );
};

export { ArticleRatingProvider, ArticleRatingContext, STAR_ACTIONS, STAR_RATING_FLOW };
