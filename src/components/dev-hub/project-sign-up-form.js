import React, { useState } from 'react';
import Modal from './modal';
import styled from '@emotion/styled';
import { colorMap, size } from './theme';
import { H3, H5, P } from './text';
import Input from './input';
import Button from './button';
import TextArea from './text-area';
import { useSiteMetadata } from '../../hooks/use-site-metadata';
import useSegmentData from '../../hooks/use-segment-data';
import { authenticate, callStitchFunction } from '../../utils/stitch';
import SuccessIcon from './icons/success';

const ModalContainer = styled('div')`
    padding: 0 ${size.default};
`;
const SubmitContainer = styled('div')`
    align-items: center;
    display: flex;
    justify-content: flex-end;
    margin-top: ${size.medium};
`;
const Title = styled(H5)`
    padding-bottom: ${size.medium};
`;
const StyledInput = styled(Input)`
    margin-bottom: ${size.large};
`;
const SuccessContainer = styled('div')`
    text-align: center;
    svg {
        margin-bottom: ${size.large};
    }
`;
const ErrorMessage = styled(P)`
    color: ${colorMap.salmon};
`;
const callStitch = async (metadata, object, segmentData, callback) => {
    try {
        const res = await callStitchFunction(
            'submitDevhubProject',
            metadata,
            object,
            segmentData
        );
        res && callback(true);
    } catch {
        callback(false);
    }
};

const Form = React.memo(({ setSuccess, success }) => {
    const metadata = useSiteMetadata();
    const segmentData = useSegmentData();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [canSubmit, setCanSubmit] = useState(true);
    const handleSubmit = async e => {
        e.preventDefault();
        setCanSubmit(false);
        const obj = {
            name,
            email,
            projectDescription,
        };
        await authenticate();
        const callback = hasSuccess => {
            setSuccess(hasSuccess);
            setCanSubmit(!hasSuccess);
        };
        callStitch(metadata, obj, segmentData, callback);
    };
    return (
        <form onSubmit={handleSubmit}>
            <ErrorMessage>
                {success === false &&
                    'Your submission failed. Please try again.'}
            </ErrorMessage>
            <StyledInput
                value={name}
                required
                placeholder="Name"
                onChange={e => setName(e.target.value)}
            />
            <StyledInput
                value={email}
                required
                placeholder="Email Address"
                onChange={e => setEmail(e.target.value)}
            />
            <TextArea
                value={projectDescription}
                required
                placeholder="Project Description"
                onChange={e => setProjectDescription(e.target.value)}
            />
            <SubmitContainer>
                <Button disabled={!canSubmit} type="submit" primary>
                    Submit project
                </Button>
            </SubmitContainer>
        </form>
    );
});

const SuccessState = () => (
    <SuccessContainer>
        <SuccessIcon />
        <H3>Thank you for sharing!</H3>
    </SuccessContainer>
);

const ModalContent = () => {
    const [success, setSuccess] = useState(null);
    if (success) {
        return <SuccessState />;
    }
    return (
        <>
            <Title>Submit Your Project</Title>
            <Form setSuccess={setSuccess} success={success} />
        </>
    );
};

export default ({ triggerComponent }) => (
    <Modal
        dialogContainerStyle={{
            width: '800px',
        }}
        dialogMobileContainerStyle={{
            width: '100%',
        }}
        triggerComponent={triggerComponent}
    >
        <ModalContainer>
            <ModalContent />
        </ModalContainer>
    </Modal>
);
