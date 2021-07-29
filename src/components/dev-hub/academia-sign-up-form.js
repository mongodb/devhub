import React, { useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { submitAcademiaForm } from '../../utils/devhub-api-stitch';
import { fontSize, size, screenSize } from './theme';
import { P, ArticleH3 } from './text';
import Input from './input';
import Button from './button';
import Select from './select';
import Checkbox from '@leafygreen-ui/checkbox';
import SectionHeader from './section-header';
import {
    nameInvalidMessage,
    emailInvalidMessage,
} from '~utils/invalid-form-input-messages';

const INPUT_BOX_WIDTH = '100%';

const StyledButton = styled(Button)`
    display: flex;
    margin: ${size.large} auto;
`;

const StyledCheckbox = styled(Checkbox)`
    /* Leafygreen's Checkbox input is given height/width of 0, hiding invalid popup */
    > input {
        height: 20px;
        width: 20px;
    }
    > label {
        font-size: ${fontSize.small};
    }
`;

const StyledSelect = styled(Select)`
    color: ${({ theme }) => theme.colorMap.greyLightTwo};
`;

const ErrorMessage = styled(P)`
    color: ${({ theme }) => theme.colorMap.salmon};
`;

const StyledSectionText = styled(ArticleH3)`
    color: ${({ theme }) => theme.colorMap.greyLightTwo};
    font-family: akzidenz;
    font-weight: normal;
`;

const InstructorSection = styled('div')`
    display: grid;
    grid-template-columns: ${INPUT_BOX_WIDTH};
    grid-row-gap: ${size.default};
    margin-bottom: ${size.large};
    @media ${screenSize.upToMedium} {
        grid-template-columns: 100%;
    }
`;

const InstitutionSection = styled('div')`
    display: grid;
    grid-template-columns: ${INPUT_BOX_WIDTH};
    grid-row-gap: ${size.default};
    justify-content: space-between;
    margin-bottom: ${size.large};
    @media ${screenSize.upToMedium} {
        grid-template-columns: 100%;
    }
`;

const AcademiaSignUpForm = React.memo(({ setSuccess, success, ...props }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [institutionName, setInstitutionName] = useState('');
    const [institutionType, setInstitutionType] = useState('');
    const [agreeToEmail, setAgreeToEmail] = useState(false);
    const [canSubmit, setCanSubmit] = useState(true);
    const institutionTypes = [
        ['bootcamp', 'Bootcamp'],
        ['online_course', 'Online Course'],
        ['high_school', 'High School'],
        ['university_college', 'University / College'],
    ];

    const handleSubmit = async e => {
        e.preventDefault();
        setCanSubmit(false);
        const data = {
            first_name: firstName,
            last_name: lastName,
            email,
            institution_name: institutionName,
            institution_type: institutionType,
            agree_to_email: agreeToEmail,
        };
        const response = await submitAcademiaForm(data);

        setSuccess(response.success);
        setCanSubmit(!response.success);
    };

    const onEmailInvalid = useCallback(
        e => {
            e.target.setCustomValidity(emailInvalidMessage(email));
        },
        [email]
    );

    const onFirstNameInvalid = useCallback(
        e => {
            e.target.setCustomValidity(
                nameInvalidMessage(firstName, 'First name')
            );
        },
        [firstName]
    );

    const onLastNameInvalid = useCallback(
        e => {
            e.target.setCustomValidity(
                nameInvalidMessage(lastName, 'Last name')
            );
        },
        [lastName]
    );

    return (
        <form onSubmit={handleSubmit} {...props}>
            <ErrorMessage>
                {success === false &&
                    'Your submission failed. Please try again.'}
            </ErrorMessage>

            <SectionHeader>
                <StyledSectionText>Instructor</StyledSectionText>
            </SectionHeader>

            <InstructorSection>
                <Input
                    narrow
                    value={firstName}
                    maxLength="25"
                    required
                    pattern="^[A-Za-zÀ-ÿ ,.'-]+$"
                    placeholder="First Name"
                    onChange={e => setFirstName(e.target.value)}
                    onInput={e => e.target.setCustomValidity('')}
                    onInvalid={onFirstNameInvalid}
                />
                <Input
                    narrow
                    value={lastName}
                    maxLength="25"
                    required
                    pattern="^[A-Za-zÀ-ÿ ,.'-]+$"
                    placeholder="Last Name"
                    onChange={e => setLastName(e.target.value)}
                    onInput={e => e.target.setCustomValidity('')}
                    onInvalid={onLastNameInvalid}
                />
                <Input
                    narrow
                    type="email"
                    value={email}
                    required
                    placeholder="Email Address"
                    onChange={e => setEmail(e.target.value)}
                    onInput={e => e.target.setCustomValidity('')}
                    onInvalid={onEmailInvalid}
                />
            </InstructorSection>

            <SectionHeader>
                <StyledSectionText>Institution</StyledSectionText>
            </SectionHeader>

            <InstitutionSection>
                <Input
                    narrow
                    value={institutionName}
                    required
                    maxLength="50"
                    placeholder="Name of Institution"
                    onChange={e => setInstitutionName(e.target.value)}
                />
                <StyledSelect
                    narrow
                    value={institutionType}
                    defaultText="Institution Type"
                    choices={institutionTypes}
                    onChange={e => setInstitutionType(e)}
                />
            </InstitutionSection>

            <StyledCheckbox
                bold
                darkMode={true}
                onChange={e => setAgreeToEmail(e.target.value)}
                required
                label="I agree to receive emails from MongoDB, Inc. After submitting, 
                a MongoDB representative will reach out within five business days."
                title="Please submit"
            />

            <StyledButton
                disabled={!canSubmit}
                type="submit"
                primary
                hasArrow={false}
            >
                Join MongoDB for Academia
            </StyledButton>
        </form>
    );
});

export default AcademiaSignUpForm;
