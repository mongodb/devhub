import React, { useReducer } from 'react';
import Checkbox from '@leafygreen-ui/checkbox';
import Input from './input';
import TextArea from './text-area';

const getInitialFormState = () => ({});

const FORM_ELEMENT_TYPES = {
    CHECKBOXES: 'Checkboxes',
    EMAILINPUT: 'EmailInput',
    TEXTAREA: 'Textarea',
};

const handleCMSFormChange = (state, { field, value }) => ({
    ...state,
    [field]: value,
});

const mapTypeToFormElement = (
    { labels, name, placeholder, type },
    state,
    dispatch
) => {
    switch (type) {
        case FORM_ELEMENT_TYPES.CHECKBOXES:
            return labels.map(({ label }, index) => (
                <Checkbox
                    key={`${name}-${index}`}
                    bold
                    onChange={e =>
                        dispatch({
                            field: `${name}-${index}`,
                            value: e.target.checked,
                        })
                    }
                    darkMode={true}
                    label={label}
                />
            ));
        case FORM_ELEMENT_TYPES.EMAILINPUT:
            return (
                <Input
                    bold
                    darkMode={true}
                    key={labels[0].label}
                    placeholder={placeholder}
                    type="email"
                    value={state[name]}
                    onChange={e =>
                        dispatch({
                            field: name,
                            value: e.target.value,
                        })
                    }
                />
            );
        case FORM_ELEMENT_TYPES.TEXTAREA:
            return (
                <TextArea
                    bold
                    darkMode={true}
                    key={labels[0].label}
                    placeholder={placeholder}
                    value={state[name]}
                    onChange={e =>
                        dispatch({
                            field: name,
                            value: e.target.value,
                        })
                    }
                />
            );
        default:
            break;
    }
};

const CMSForm = ({ form = {} }) => {
    const [state, dispatch] = useReducer(
        handleCMSFormChange,
        getInitialFormState()
    );
    return (
        <>
            {form.FormElement?.map(formElement =>
                mapTypeToFormElement(formElement, state, dispatch)
            )}
        </>
    );
};

export default CMSForm;
