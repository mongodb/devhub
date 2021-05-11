import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '@leafygreen-ui/icon';
import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import AriaModal from 'react-aria-modal';
import useMedia from '../../hooks/use-media';
import { fontSize, screenSize, size } from './theme';

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

const StyledIcon = styled(Icon)`
    @media ${screenSize.upToMedium} {
        height: ${size.mediumLarge};
        width: ${size.mediumLarge};
    }
`;

const Heading = styled('header')`
    display: flex;
    justify-content: flex-end;
    line-height: ${size.xsmall};
    margin-bottom: ${size.xsmall};
    ${({ headingStyles }) => headingStyles};
`;

const ModalDialog = styled('div')`
    background-color: ${({ theme }) => theme.colorMap.greyDarkThree};
    border: 2px solid ${({ theme }) => theme.colorMap.greyDarkTwo};
    border-radius: ${size.xsmall};
    @media ${screenSize.upToMedium} {
        padding: ${size.small};
    }
    @media ${screenSize.mediumAndUp} {
        padding: ${size.default};
    }
    ${props => props.contentStyle};
    ${({ transparent }) => transparent && transparentModalStyling};
`;
const CloseButtonWrapper = styled('div')`
    color: ${({ theme }) => theme.colorMap.devWhite};
    cursor: pointer;
    font-size: ${fontSize.medium};
    font-weight: bold;
`;

const ModalClose = ({ closeModalOnEnter, deactivateModal, headingStyles }) => (
    <Heading aria-label="close" headingStyles={headingStyles}>
        <CloseButtonWrapper
            tabIndex="0"
            onClick={deactivateModal}
            onKeyUp={closeModalOnEnter}
            data-test="modal-close"
        >
            <StyledIcon glyph="X" />
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
 * @property {Function} props.onCloseModal
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
    headingStyles,
    onCloseModal,
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
    const defaultMobileState = null;
    const isMobile = useMedia(screenSize.upToMedium, defaultMobileState);
    const canDecideIfIsMobile = isMobile !== defaultMobileState;
    const activateModal = () => setIsActive(true);
    const deactivateModal = () => {
        onCloseModal && onCloseModal();
        setIsActive(false);
    };
    const closeModalOnEnter = e => {
        const enterKey = 13;
        if (e.keyCode === enterKey) {
            deactivateModal();
        }
    };
    const theme = useTheme();
    const responsiveModal = () =>
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
                        headingStyles={headingStyles}
                    />
                    {children}
                </ModalDialog>
            </AriaModal>
        );
    // The below line is due to SSR/Weird Media Query use
    // Since this requires a re-render, we delay any rendering until this is done
    // This prevents a jarring mobile experience
    if (!canDecideIfIsMobile) return null;
    if (triggerComponent) {
        return (
            <>
                <span onClick={activateModal}>{triggerComponent}</span>
                {responsiveModal()}
            </>
        );
    }
    return responsiveModal();
};

Modal.propTypes = {
    backdropStyle: PropTypes.object,
    children: PropTypes.node,
    contentStyle: PropTypes.object,
    dialogContainerStyle: PropTypes.object,
    dialogMobileContainerStyle: PropTypes.object,
    onCloseModal: PropTypes.func,
    isOpenToStart: PropTypes.bool,
    isMounted: PropTypes.bool,
    title: PropTypes.string,
    triggerComponent: PropTypes.node,
    transparent: PropTypes.bool,
    verticallyCenter: PropTypes.bool,
};
Modal.displayName = 'Modal';

export default Modal;
