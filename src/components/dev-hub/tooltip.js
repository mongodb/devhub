import React, { useState } from 'react';
import ControlledTooltip from './controlled-tooltip';
const Tooltip = props => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <ControlledTooltip {...props} isOpen={isOpen} setIsOpen={setIsOpen} />
    );
};
export default Tooltip;
