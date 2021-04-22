import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import PropTypes from 'prop-types';
import ComponentFactory from './ComponentFactory';
import { screenSize, size } from './dev-hub/theme';

const desktopPadding = css`
    padding: 2px ${size.xsmall} 4px;
`;

const tabletPadding = css`
    padding: 0px 4px 2px;
`;

const StyledLiteral = styled('code')`
    background: ${({ theme }) => theme.colorMap.greyDarkThree};
    border-radius: 4px;
    color: ${({ theme }) => theme.colorMap.greyLightTwo};
    overflow-wrap: break-word;
    ${tabletPadding};
    @media ${screenSize.mediumAndUp} {
        ${desktopPadding};
    }
`;

const Literal = ({ nodeData: { children } }) => (
    <StyledLiteral>
        {children.map((node, i) => (
            <ComponentFactory nodeData={node} key={i} />
        ))}
    </StyledLiteral>
);

Literal.propTypes = {
    nodeData: PropTypes.shape({
        children: PropTypes.arrayOf(PropTypes.object).isRequired,
    }).isRequired,
};

export default Literal;
