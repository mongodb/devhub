import React, { useReducer } from 'react';
import Checkbox from '@leafygreen-ui/checkbox';
import Input from './input';
import TextArea from './text-area';
import styled from '@emotion/styled';

import { fontSize, lineHeight } from '~components/dev-hub/theme';

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

const StyledLabel = styled('span')`
    font-family: Akzidenz;
    font-weight: 400;
    font-size: ${fontSize.tiny};
    line-height: ${lineHeight.tiny};
`;

export const InputContainer = styled('div')`
`;


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
                <InputContainer key={labels[0].label}>
                    {labels[0].label && (
                        <StyledLabel>{labels[0].label}</StyledLabel>
                    )}
                    <Input
                        bold
                        darkMode={true}
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
                </InputContainer>
            );
        case FORM_ELEMENT_TYPES.TEXTAREA:
            return (
                <InputContainer key={labels[0].label}>
                    {labels[0].label && (
                        <StyledLabel>{labels[0].label}</StyledLabel>
                    )}
                    <TextArea
                        bold
                        darkMode={true}
                        placeholder={placeholder}
                        value={state[name]}
                        onChange={e =>
                            dispatch({
                                field: name,
                                value: e.target.value,
                            })
                        }
                    />
                </InputContainer>
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
