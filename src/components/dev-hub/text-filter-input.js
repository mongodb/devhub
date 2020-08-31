import React from 'react';
import styled from '@emotion/styled';
import Icon from '@leafygreen-ui/icon';
import Input from './input';
import { screenSize } from './theme';

const InputWithLeftPadding = styled(Input)`
    padding-left: 48px;
`;

const StyledIcon = styled(Icon)`
    color: ${({ theme }) => theme.colorMap.greyLightTwo};
    position: absolute;
    left: 16px;
    top: 12px;
`;

const TextFilterInputContainer = styled('div')`
    max-width: 350px;
    position: relative;
    width: 100%;
    @media ${screenSize.upToMedium} {
        margin-bottom: 16px;
        max-width: none;
    }
`;

const TextFilterInput = ({ onChange, value, ...props }) => (
    <TextFilterInputContainer>
        <InputWithLeftPadding
            narrow
            onChange={onChange}
            value={value}
            {...props}
        />
        <StyledIcon glyph="MagnifyingGlass" />
    </TextFilterInputContainer>
);

export default TextFilterInput;
