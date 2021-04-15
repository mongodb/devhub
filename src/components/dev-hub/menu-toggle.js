import React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { size } from '~components/dev-hub/theme';

const expanded = css`
    span:nth-of-type(1) {
        left: 50%;
        top: 6px;
        width: 0%;
    }
    span:nth-of-type(2) {
        transform: rotate(45deg);
    }
    span:nth-of-type(3) {
        transform: rotate(-45deg);
    }
    span:nth-of-type(4) {
        left: 50%;
        top: 6px;
        width: 0%;
    }
`;

/** Used the third example from https://codepen.io/designcouch/pen/Atyop */
const HamburgerToggle = styled('div')`
    cursor: pointer;
    height: 10px;
    margin-left: ${size.default};
    transform: rotate(0deg);
    transition: 300ms ease-in-out;
    width: 20px;
    ${({ isOpen }) => isOpen && expanded};
    span {
        background: ${({ theme }) => theme.colorMap.devWhite};
        display: block;
        height: 2px;
        left: 0;
        opacity: 1;
        position: absolute;
        transform: rotate(0deg);
        transition: 150ms ease-in-out;
        width: 100%;
        :nth-of-type(1) {
            top: 0px;
        }
        :nth-of-type(2),
        :nth-of-type(3) {
            top: 5px;
        }
        :nth-of-type(4) {
            top: 10px;
        }
    }
`;

const AnimatedHamburger = props => (
    <HamburgerToggle {...props}>
        <span />
        <span />
        <span />
        <span />
    </HamburgerToggle>
);

const MenuToggle = ({ isOpen, toggleIsOpen }) => (
    <AnimatedHamburger
        data-test="mobile-nav-toggle"
        isOpen={isOpen}
        onClick={toggleIsOpen}
    />
);

export default MenuToggle;
