import React, { useContext, memo } from 'react';
import styled from '@emotion/styled';
import Checkbox from '@leafygreen-ui/checkbox';
import Input from './input';
import TextArea from './text-area';
import { FeedbackFormContext } from '~components/dev-hub/feedback/feedback-context';

import { size } from '~components/dev-hub/theme';

export const FORM_ELEMENT_TYPES = {
    CHECKBOXES: 'Checkboxes',
    EMAILINPUT: 'EmailInput',
    TEXTAREA: 'Textarea',
};

const StyledInputContainer = styled('div')`
    margin: ${size.default} 0;
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
                            type: FORM_ELEMENT_TYPES.CHECKBOXES,
                            field: label,
                            value: e.target.checked,
                        })
                    }
                    darkMode={true}
                    label={label}
                />
            ));
        case FORM_ELEMENT_TYPES.EMAILINPUT:
            return (
                <StyledInputContainer key={labels[0].label}>
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
                </StyledInputContainer>
            );
        case FORM_ELEMENT_TYPES.TEXTAREA:
            return (
                <StyledInputContainer key={labels[0].label}>
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
                </StyledInputContainer>
            );
        default:
            break;
    }
};

const CMSForm = ({ form = {} }) => {
    const { formState, formDispatch } = useContext(FeedbackFormContext);
    return (
        <>
            {form.FormElement?.map(formElement =>
                mapTypeToFormElement(formElement, formState, formDispatch)
            )}
        </>
    );
};

export default memo(CMSForm);
