import React from 'react';
import { size, lineHeight } from '../../dev-hub/theme';
import { H5, P } from '../../dev-hub/text';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import Button from '../../dev-hub/button';
import AcademiaSignUpForm from '../../dev-hub/academia-sign-up-form';
import Modal from '../../dev-hub/modal';

const MAX_SIGN_UP_WIDTH = '600px';

/* TODO: Update text styles to give this line height to all P on desktop */
const defaultLineHeight = css`
    line-height: ${lineHeight.default};
`;

const ButtonWithAdditionalTopMargin = styled(Button)`
    margin-top: ${size.large};
`;

const StyledAcademiaSignUpForm = styled(AcademiaSignUpForm)`
    margin-top: ${size.large};
`;

const SignUpModal = () => (
    <Modal
        triggerComponent={
            <ButtonWithAdditionalTopMargin primary hasArrow={false}>
                Join MongoDB for Academia
            </ButtonWithAdditionalTopMargin>
        }
        dialogContainerStyle={{ maxWidth: MAX_SIGN_UP_WIDTH }}
    >
        <H5>Join MongoDB for Academia</H5>
        <P css={defaultLineHeight}>
            If you’re interested in receiving MongoDB course materials or if you
            like us to review your current content, please let us know by
            submitting the form and we’ll get back to you within five business
            days.
        </P>
        <StyledAcademiaSignUpForm />
    </Modal>
);

export default SignUpModal;
