import React from 'react';
import { size } from '~components/dev-hub/theme';
import { H3, P2 } from '~components/dev-hub/text';
import Modal from '~components/dev-hub/modal';
import SuccessState from '~components/dev-hub/success-state';

const FormSuccessModal = () => (
    <Modal
        verticallyCenter
        isOpenToStart={true}
        dialogContainerStyle={{
            maxWidth: '600px',
            padding: `0 ${size.large}`,
        }}
    >
        <SuccessState>
            <H3>Thank you for sharing!</H3>
            <P2>
                We’re looking forward to reading about your project. We will
                review your submission and will send you an email once it’s
                added to the page, stay tuned!
            </P2>
        </SuccessState>
    </Modal>
);

export default FormSuccessModal;
