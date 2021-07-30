import React from 'react';
import { css } from '@emotion/react';
import Tooltip from './tooltip';
import { P4 } from './text';
import { size } from './theme';

/**
 * @property {node} props.trigger
 * @property {string} props.text
 */
const HoverTooltip = ({ position = 'bottom', trigger, text }) => (
    <Tooltip
        contentStyle={css`
            padding: ${size.tiny};
        `}
        displayOnHover
        position={position}
        trigger={trigger}
    >
        <P4 collapse>{text}</P4>
    </Tooltip>
);

export default HoverTooltip;
