import React, { useState } from 'react';
import Modal from './modal';
import styled from '@emotion/styled';
import { size } from './theme';
import { H5 } from './text';
import Input from './input';
import Button from './button';
import UploadButton from './upload-button';
import TextArea from './text-area';

const ModalContainer = styled('div')`
    padding: ${size.default};
    padding-left: ${size.xlarge};
`;
const SubmitContainer = styled('div')`
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin: ${size.large} ${size.large} 0 0;
`;
const Title = styled(H5)`
    padding-bottom: ${size.medium};
`;
const Form = React.memo(() => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [github, setGithub] = useState('');
    const [project, setProject] = useState('');
    const [file, setFile] = useState(null);
    const handleSubmit = () => {
        console.log({
            name,
            email,
            github,
            project,
            file,
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
            <Input
                value={github}
                required
                placeholder="GitHub Repository URL"
                onChange={e => setGithub(e.target.value)}
            />
            <br></br>
            <TextArea
                value={project}
                required
                placeholder="Project Description"
                onChange={e => setProject(e.target.value)}
            />
            <SubmitContainer>
                <UploadButton
                    label="Attach walkthrough (mov., .zip, etc)"
                    name="walkthrough"
                    onChange={e => setFile(e.target.files[0])}
                    file={file}
                />
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
