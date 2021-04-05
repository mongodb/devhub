import React from 'react';
import Checkbox from '@leafygreen-ui/checkbox';
import Input from './input';
import TextArea from './text-area';

const FORM_ELEMENT_TYPES = {
    CHECKBOXES: 'Checkboxes',
    EMAILINPUT: 'EmailInput',
    TEXTAREA: 'Textarea',
};

const mapTypeToFormElement = (type, labels) => {
    switch (type) {
        case FORM_ELEMENT_TYPES.CHECKBOXES:
            return labels.map(({ label }) => (
                <Checkbox key={label} bold darkMode={true} label={label} />
            ));
        case FORM_ELEMENT_TYPES.EMAILINPUT:
            return (
                <Input
                    key={labels[0].label}
                    bold
                    darkMode={true}
                    label={labels[0].label}
                    type="email"
                />
            );
        case FORM_ELEMENT_TYPES.TEXTAREA:
            return (
                <TextArea
                    key={labels[0].label}
                    bold
                    darkMode={true}
                    label={labels[0].label}
                />
            );
        default:
            break;
    }
};

const CMSForm = ({ form }) => (
    <>
        {form.FormElement.map(({ type, labels }) =>
            mapTypeToFormElement(type, labels)
        )}
    </>
);

export default CMSForm;
