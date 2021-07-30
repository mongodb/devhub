import React, { createContext, useReducer } from 'react';
import { FORM_ELEMENT_TYPES } from '~components/dev-hub/cms-form';

const getInitialFormState = () => ({
    comment: '',
    responses: [],
    email: null,
});

const handleCMSFormChange = (state, { field, value, type }) => {
    if (type === FORM_ELEMENT_TYPES.CHECKBOXES) {
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

export { FeedbackFormContext, FeedbackFormStateProvider };
