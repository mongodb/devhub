import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import AriaModal from 'react-aria-modal';
import useMedia from '../../hooks/use-media';
import { fontSize, screenSize, size } from './theme';
import { useTheme } from 'emotion-theming';

const transparentModalStyling = css`
    background-color: transparent;
    border: none;
    @media ${screenSize.upToMedium} {
        padding: none;
    }
    @media ${screenSize.mediumAndUp} {
        padding: none;
    }
`;

const Heading = styled('header')`
    display: flex;
    justify-content: flex-end;
`;

const ModalDialog = styled('div')`
    background-color: ${({ theme }) => theme.colorMap.greyDarkThree};
    border: 2px solid ${({ theme }) => theme.colorMap.greyDarkTwo};
    border-radius: ${size.xsmall};
    @media ${screenSize.upToMedium} {
        padding: ${size.small};
    }
    @media ${screenSize.mediumAndUp} {
        padding: ${size.medium};
    }
    ${props => props.contentStyle};
    ${({ transparent }) => transparent && transparentModalStyling};
`;
const CloseButtonWrapper = styled('div')`
    color: ${({ theme }) => theme.colorMap.greyLightThree};
    cursor: pointer;
    font-size: ${fontSize.medium};
    font-weight: bold;
    padding: ${size.tiny};
`;

const ModalClose = ({ closeModalOnEnter, deactivateModal }) => (
    <Heading aria-label="close">
        <CloseButtonWrapper
            tabIndex="0"
            onClick={deactivateModal}
            onKeyUp={closeModalOnEnter}
            data-test="modal-close"
        >
            &times;
        </CloseButtonWrapper>
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
 * @property {Object} props.dialogMobileContainerStyle
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
    dialogMobileContainerStyle,
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
    const underlayStyle = theme => ({
        backgroundColor: theme.colorMap.charcoal + 'CC',
        ...backdropStyle,
        // Add CC for 0.8 alpha value
    });
    const underlayMobileStyle = { height: '100%', ...backdropStyle };
    const dialogStyle = {
        padding: `10% ${size.large}`,
        ...dialogContainerStyle,
    };
    const dialogMobileStyle = {
        padding: `${size.xsmall}`,
        ...dialogMobileContainerStyle,
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
    const theme = useTheme();
    const ResponsiveModal = () =>
        isActive && (
            <AriaModal
                data-test="modal"
                mounted={isMounted}
                focusDialog
                titleText={title || 'Popup Modal'}
                onExit={deactivateModal}
                getApplicationNode={getApplicationNode}
                underlayStyle={
                    isMobile ? underlayMobileStyle : underlayStyle(theme)
                }
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
    dialogMobileContainerStyle: PropTypes.object,
    isOpenToStart: PropTypes.bool,
    isMounted: PropTypes.bool,
    title: PropTypes.string,
    triggerComponent: PropTypes.node,
    transparent: PropTypes.bool,
    verticallyCenter: PropTypes.bool,
};
Modal.displayName = 'Modal';

export default Modal;
