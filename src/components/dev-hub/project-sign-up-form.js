import React, { useState } from 'react';
import Modal from './modal';
import styled from '@emotion/styled';
import { colorMap, size } from './theme';
import { H5, P } from './text';
import Input from './input';
import Button from './button';
import TextArea from './text-area';
import { useSiteMetadata } from '../../hooks/use-site-metadata';
import useSegmentData from '../../hooks/use-segment-data';
import { submitDevhubProject } from '../../utils/snooty-stitch';
import SuccessState from './success-state';

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
const ErrorMessage = styled(P)`
    color: ${colorMap.salmon};
`;
const callStitch = async (metadata, object, segmentData, callback) => {
    try {
        const res = await submitDevhubProject(metadata, object, segmentData);
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
                maxLength="50"
                required
                placeholder="Name"
                pattern="^[A-Za-zÀ-ÿ ,.'-]+$"
                onChange={e => setName(e.target.value)}
                onInput={e => e.target.setCustomValidity('')}
                onInvalid={e =>
                    e.target.setCustomValidity(
                        'Names should only contain letters. e.g. John Doe'
                    )
                }
            />
            <StyledInput
                type="email"
                value={email}
                required
                placeholder="Email Address"
                onChange={e => setEmail(e.target.value)}
                onInput={e => e.target.setCustomValidity('')}
                onInvalid={e =>
                    e.target.setCustomValidity(
                        'Please enter a valid email address. e.g. example@email.com'
                    )
                }
            />
            <TextArea
                value={projectDescription}
                maxLength="250"
                required
                placeholder="Project Description (250 characters)"
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

const ModalContent = () => {
    const [success, setSuccess] = useState(null);
    if (success) {
        return <SuccessState>Thank you for sharing!</SuccessState>;
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
