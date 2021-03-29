import React from 'react';
import PropTypes from 'prop-types';
import { Option, Select } from '@leafygreen-ui/select';

const FormSelect = ({ children, name, choices = [], ...props }) => {
    const selectOptions = choices ?? children;

    return (
        <Select darkMode aria-label={name} {...props}>
            {selectOptions.map(([choiceValue, text]) => (
                <Option
                    key={choiceValue}
                    tabIndex="0"
                    value={choiceValue}
                >
                    {text}
                </Option>
            ))}
        </Select>
    );
};

FormSelect.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    choices: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
    defaultText: PropTypes.string,
    validationStatus: PropTypes.string,
    errors: PropTypes.arrayOf(PropTypes.string),
};

export default FormSelect;
