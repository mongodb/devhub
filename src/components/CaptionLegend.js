import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import ComponentFactory from './ComponentFactory';
import { P3 } from './dev-hub/text';
import { colorMap } from './dev-hub/theme';

const StyledCaption = styled(P3)`
    color: ${colorMap.greyLightTwo};
`;
const Caption = StyledCaption.withComponent('figcaption');

const CaptionLegend = ({ nodeData: { children }, ...rest }) => (
    <React.Fragment>
        {children.length > 0 && (
            <Caption className="caption">
                <span className="caption-text">
                    <ComponentFactory
                        {...rest}
                        nodeData={children[0]}
                        parentNode="caption"
                    />
                </span>
            </Caption>
        )}
        {children.length > 1 && (
            <div className="legend">
                {children.slice(1).map((child, index) => (
                    <ComponentFactory {...rest} key={index} nodeData={child} />
                ))}
            </div>
        )}
    </React.Fragment>
);

CaptionLegend.propTypes = {
    nodeData: PropTypes.shape({
        children: PropTypes.arrayOf(PropTypes.object).isRequired,
    }).isRequired,
};

export default CaptionLegend;
