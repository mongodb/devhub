import React, { useState } from 'react';
import Modal from './modal';
import styled from '@emotion/styled';
import { size } from './theme';
import { H5 } from './text';
import Input from './input';
import Button from './button';
import TextArea from './text-area';

const ModalContainer = styled('div')`
    padding: ${size.default};
    padding-left: ${size.xlarge};
`;
const SubmitContainer = styled('div')`
    align-items: center;
    display: flex;
    justify-content: flex-end;
    margin: ${size.large} ${size.large} 0 0;
`;
const Title = styled(H5)`
    padding-bottom: ${size.medium};
`;
const Form = React.memo(() => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [project, setProject] = useState('');
    const handleSubmit = () => {
        console.log({
            name,
            email,
            project,
        });
    };
    return (
        <form onSubmit={handleSubmit}>
            <Input
                value={name}
                required
                placeholder="Name"
                onChange={e => setName(e.target.value)}
            />
            <br></br>
            <Input
                value={email}
                required
                placeholder="Email Address"
                onChange={e => setEmail(e.target.value)}
            />
            <br></br>
            <TextArea
                value={project}
                required
                placeholder="Project Description"
                onChange={e => setProject(e.target.value)}
            />
            <SubmitContainer>
                <Button type="submit" primary>
                    Submit project
                </Button>
            </SubmitContainer>
        </form>
    );
});

export default ({ triggerComponent }) => {
    return (
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
                <Title>Submit Your Project</Title>
                <Form />
            </ModalContainer>
        </Modal>
    );
};
