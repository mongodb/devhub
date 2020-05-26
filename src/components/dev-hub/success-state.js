import React from 'react';
import styled from '@emotion/styled';
import { H3 } from './text';
import { size } from './theme';
import SuccessIcon from './icons/success';

const SuccessContainer = styled('div')`
    text-align: center;
    svg {
        margin-bottom: ${size.large};
    }
`;

const SuccessState = ({ children, ...props }) => (
    <SuccessContainer {...props}>
        <SuccessIcon />
        <H3>{children}</H3>
    </SuccessContainer>
);

export default SuccessState;
