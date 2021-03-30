import React from 'react';
import PropTypes from 'prop-types';
import { Option, Select } from '@leafygreen-ui/select';
import styled from '@emotion/styled';

const SelectContainer = styled(Select)`
    //Need for modal form
    div {
        z-index: 1;
    }
`;

const FormSelect = ({
    children,
    name,
    choices = [],
    usePortal = false,
    ...props
}) => {
    const selectOptions = choices ?? children;

    return (
        <SelectContainer
            aria-label={name}
            darkMode
            usePortal={usePortal}
            {...props}
        >
            {selectOptions.map(([choiceValue, text]) => (
                <Option key={choiceValue} tabIndex="0" value={choiceValue}>
                    {text}
                </Option>
            ))}
        </SelectContainer>
    );
};

FormSelect.propTypes = {
    'aria-labelledby': PropTypes.string,
    children: PropTypes.node,
    choices: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
    className: PropTypes.string,
    defaultValue: PropTypes.string,
    description: PropTypes.string,
    disabled: PropTypes.bool,
    id: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    readOnly: PropTypes.bool,
    size: PropTypes.oneOf(['xsmall', 'small', 'default', 'large']),
    usePortal: PropTypes.bool,
    value: PropTypes.string,
};

export default FormSelect;
