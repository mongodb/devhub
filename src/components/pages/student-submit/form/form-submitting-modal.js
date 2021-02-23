import React from 'react';
import { size } from '~components/dev-hub/theme';
import { H3 } from '~components/dev-hub/text';
import Modal from '~components/dev-hub/modal';

const FormSubmittingModal = () => (
    <Modal
        verticallyCenter
        isOpenToStart={true}
        dialogContainerStyle={{
            maxWidth: '600px',
            padding: `0 ${size.large}`,
        }}
    >
        <H3>Submitting...</H3>
    </Modal>
);

export default FormSubmittingModal;
