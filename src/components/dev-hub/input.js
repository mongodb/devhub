import React from 'react';
import TextInput from '@leafygreen-ui/text-input';

const FormInput = ({ required, label = '', ...props }) => {
    props['aria-labelledby'] = props['aria-labelledby'] ?? label;

    return (
        <TextInput darkMode label={label} optional={!required} {...props} />
    );
}

export default FormInput;
