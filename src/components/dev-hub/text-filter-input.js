import React from 'react';
import styled from '@emotion/styled';
import Icon from '@leafygreen-ui/icon';
import Input from './input';
import { screenSize, size } from './theme';

const MAGNIFYING_GLASS_PADDING = '48px';
const MAX_WIDTH = '350px';

const InputWithLeftPadding = styled(Input)`
    padding-left: ${MAGNIFYING_GLASS_PADDING};
`;

const StyledIcon = styled(Icon)`
    color: ${({ theme }) => theme.colorMap.greyLightTwo};
    position: absolute;
    left: ${size.default};
    top: 12px;
`;

const TextFilterInputContainer = styled('div')`
    max-width: ${MAX_WIDTH};
    position: relative;
    width: 100%;
    @media ${screenSize.upToMedium} {
        margin-bottom: ${size.default};
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
