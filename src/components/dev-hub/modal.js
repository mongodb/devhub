import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import AriaModal from 'react-aria-modal';
import useMedia from '../../hooks/use-media';
import { screenSize, size, colorMap } from './theme';

const Heading = styled('header')`
    font-weight: bold;
    text-align: right;
`;

const ModalDialog = styled('div')`
    background-color: ${({ transparent }) =>
        transparent ? 'transparent' : colorMap.greyDarkThree};
    ${({ transparent }) =>
        !transparent && `border: 2px solid ${colorMap.greyDarkTwo};`}
    border-radius: ${size.xsmall};
    @media ${screenSize.upToMedium} {
        padding: ${size.small};
    }
    @media ${screenSize.mediumAndUp} {
        padding: ${size.medium};
    }
    ${props => props.contentStyle};
`;
const CloseButtonWrapper = styled('div')`
    cursor: pointer;
    &:after {
        content: '\u00D7';
        color: ${colorMap.greyLightThree};
    }
`;

const ModalClose = ({ closeModalOnEnter, deactivateModal }) => (
    <Heading>
        <CloseButtonWrapper
            tabIndex="0"
            onClick={deactivateModal}
            onKeyUp={closeModalOnEnter}
        ></CloseButtonWrapper>
    </Heading>
);

const getApplicationNode = () => document.getElementById('root');

/**
 *
 * @param {Object} props
 * @property {Object} props.backdropStyle
 * @property {JSX.Element[]= | JSX.Element=} props.children
 * @property {Object | String} props.contentStyle
 * @property {Object} props.dialogContainerStyle
 * @property {String=} props.title
 * @property {JSX.Element[]= | JSX.Element=} props.triggerComponent
 * @property {Bool=} props.isOpenToStart
 * @property {Bool=} props.isMounted
 * @property {Bool=} props.transparent
 * @property {Bool=} props.verticallyCenter
 * @property {Bool=} props.withoutEncapsulatingCard
 */
export const Modal = ({
    // Backdrop Style must be an object because of the react-aria-modal library styling
    backdropStyle,
    children,
    contentStyle,
    // Dialog Container Style must be an object because of the react-aria-modal library styling
    dialogContainerStyle,
    title,
    triggerComponent,
    isOpenToStart = false,
    // If Dialog container should be mounted, allows for outside control of modal state
    isMounted = true,
    transparent = false,
    verticallyCenter = false,
    ...props
}) => {
    /**
     * we need to use a style object here because the react-aria-modal
     * library has its own styles that we need to override
     */
    const underlayStyle = {
        // Add CC for 0.8 alpha value
        backgroundColor: colorMap.charcoal + 'CC',
        ...backdropStyle,
    };
    const underlayMobileStyle = { height: '100%', ...backdropStyle };
    const dialogStyle = {
        padding: `10% ${size.large}`,
        ...dialogContainerStyle,
    };
    const dialogMobileStyle = {
        padding: `${size.large}`,
        ...dialogContainerStyle,
    };
    const [isActive, setIsActive] = useState(isOpenToStart);
    const isMobile = useMedia(screenSize.upToMedium);
    const activateModal = () => setIsActive(true);
    const deactivateModal = () => setIsActive(false);
    const closeModalOnEnter = e => {
        const enterKey = 13;
        if (e.keyCode === enterKey) {
            deactivateModal();
        }
    };
    const ResponsiveModal = () =>
        isActive && (
            <AriaModal
                mounted={isMounted}
                focusDialog
                titleText={title || 'Popup Modal'}
                onExit={deactivateModal}
                getApplicationNode={getApplicationNode}
                underlayStyle={isMobile ? underlayMobileStyle : underlayStyle}
                dialogStyle={isMobile ? dialogMobileStyle : dialogStyle}
                verticallyCenter={verticallyCenter}
                {...props}
            >
                <ModalDialog
                    contentStyle={contentStyle}
                    transparent={transparent}
                >
                    <ModalClose
                        closeModalOnEnter={closeModalOnEnter}
                        deactivateModal={deactivateModal}
                    />
                    {children}
                </ModalDialog>
            </AriaModal>
        );

    if (triggerComponent) {
        return (
            <>
                <span onClick={activateModal}>{triggerComponent}</span>
                <ResponsiveModal />
            </>
        );
    }
    return <ResponsiveModal />;
};

Modal.propTypes = {
    backdropStyle: PropTypes.object,
    children: PropTypes.node,
    contentStyle: PropTypes.object,
    dialogContainerStyle: PropTypes.object,
    isOpenToStart: PropTypes.bool,
    isMounted: PropTypes.bool,
    title: PropTypes.string,
    triggerComponent: PropTypes.node,
    verticallyCenter: PropTypes.bool,
};
Modal.displayName = 'Modal';

export default Modal;
