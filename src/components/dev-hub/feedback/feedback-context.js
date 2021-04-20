import React, { createContext, useReducer } from 'react';

const FEEDBACK_FORM_TYPES = {
    checkbox: 'checkbox',
};

const getInitialFormState = () => ({
    comment: '',
    responses: [],
    email: null,
});

const handleCMSFormChange = (state, { field, value, type }) => {
    if (type === FEEDBACK_FORM_TYPES.checkbox) {
        return {
            ...state,
            responses: !!value
                ? [...state.responses, field]
                : state.responses.filter(val => val !== field),
        };
    }

    return {
        ...state,
        [field]: value,
    };
};

const FeedbackFormContext = createContext(getInitialFormState());
const { Provider } = FeedbackFormContext;

const FeedbackFormStateProvider = ({ children }) => {
    const [formState, formDispatch] = useReducer(
        handleCMSFormChange,
        getInitialFormState()
    );

    return <Provider value={{ formState, formDispatch }}>{children}</Provider>;
};

export { FeedbackFormContext, FeedbackFormStateProvider, FEEDBACK_FORM_TYPES };
