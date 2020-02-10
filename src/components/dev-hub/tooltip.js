import React, { useState } from 'react';
import styled from '@emotion/styled-base';
import { css } from '@emotion/core';
import Popover, { ArrowContainer } from 'react-tiny-popover';
import { colorMap, layer, size } from './theme';

/* needs
- needs a trigger
- needs content to display on hover
- ideally the content can be anything contained in that box
- tooltip can be in different directions: start with bottom && right
*/

const gradient = css`
    linear-gradient(
        315deg,
        ${colorMap.violet} 0%,
        ${colorMap.magenta} 40%,
        ${colorMap.orange} 100%
    )
`;

const Content = styled('div')`
    background: ${colorMap.greyDarkOne};
    border: 2px solid;
    border-image: ${gradient};
    border-image-slice: 1;
    color: ${colorMap.devWhite};
    max-width: 500px;
    padding: ${size.medium} ${size.default};
`;


/**
 * @param {Object<string, any>} props
 * @property {node} props.children
 * @property {string} props.position
 * @property {node} props.trigger
 */

const Tooltip = ({ children, position, trigger }) => {
    const [isOpen, setIsOpen] = useState(false);
    const width = 80;
    const height = 80;
    const targetRect = {
        width: 60,
        height: 60,
        top: 10,
        left: 0,
        right: 0,
        bottom: 0,
    };
    const targetMap = {
        bottom: { height, width, bottom: 0, left: 0, right: 0, top: 0 },
        left: { height, width, bottom: 0, left: 0, right: 0, top: 0 },
        right: { height, width, bottom: 0, left: 0, right: 0, top: 0 },
        top: { height, width },
    };
    const popOverMap = {
        bottom: { height, width, bottom: 0, left: 0, right: 0, top: 0 },
        left: { height, width, bottom: 0, left: 0, right: 0, top: 0 },
        right: { height, width, bottom: 0, left: 0, right: 0, top: 0 },
        top: { height, width },
    };
    const styleMap = {
        bottom: { height, width, bottom: 0, left: 0, right: 0, top: 0 },
        left: { height, width, bottom: 0, left: 0, right: 0, top: 0 },
        right: { left: "2px"},
        top: { bottom: "2px", left: '70px' },
    }
    const tooltipLocation = {
        bottom: {},
        left: {},
        right: { top: 0},
        top: {}
    }

    return (
        <Popover
            content={
                <ArrowContainer
                    arrowSize={10}
                    position={position}
                    arrowColor={colorMap.greyDarkOne}
                    targetRect={targetMap[position]}
                    popoverRect={popOverMap[position]}
                    arrowStyle={styleMap[position]}
                >
                    <Content>{children}</Content>
                </ArrowContainer>
            }
            containerStyle={{zIndex: layer.superFront}}
            disableReposition
            isOpen={isOpen}
            onClickOutside={() => setIsOpen(false)}
            padding={10}
            position={position}
            transitionDuration={0.15}
        >
            <span onClick={() => setIsOpen(true)}>{trigger}</span>
        </Popover>
    );
};

export default Tooltip;
