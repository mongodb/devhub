import React from 'react';
import { size } from '~components/dev-hub/theme';
import { H3, P2 } from '~components/dev-hub/text';
import Modal from '~components/dev-hub/modal';

const ErrorModal = ({ error }) => (
    <Modal
        verticallyCenter
        isOpenToStart={true}
        dialogContainerStyle={{
            maxWidth: '600px',
            padding: `0 ${size.large}`,
        }}
    >
        <H3>Error: {error}</H3>
        <P2>
            Please try submitting again. If this persists please email
            academia@mongodb.com.
        </P2>
    </Modal>
);

export default ErrorModal;
