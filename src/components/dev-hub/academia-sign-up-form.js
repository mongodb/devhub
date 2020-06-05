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
import SuccessState from './success-state';

const INPUT_BOX_WIDTH = '335px';

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
    > span {
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

const StyledSuccessState = styled(SuccessState)`
    margin-bottom: ${size.xlarge};
    margin-top: ${size.xlarge};
`;

const InstructorSection = styled('div')`
    display: grid;
    grid-template-columns: repeat(auto-fill, ${INPUT_BOX_WIDTH});
    grid-row-gap: ${size.mediumLarge};
    justify-content: space-between;
    margin-bottom: ${size.xlarge};
    @media ${screenSize.upToMedium} {
        grid-template-columns: 100%;
    }
`;

const InstitutionSection = styled('div')`
    display: grid;
    grid-template-columns: repeat(auto-fill, ${INPUT_BOX_WIDTH});
    grid-row-gap: ${size.mediumLarge};
    justify-content: space-between;
    margin-bottom: ${size.xlarge};
    @media ${screenSize.upToMedium} {
        grid-template-columns: 100%;
    }
`;

const Form = React.memo(({ setSuccess, success, ...props }) => {
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

    const onNameInvalid = (name, nameType) =>
        name === ''
            ? `${nameType} cannot be blank`
            : `${nameType} should only contain letters. e.g. John`;

    const onEmailInvalid = useCallback(
        e => {
            e.target.setCustomValidity(
                email === ''
                    ? 'Email cannot be blank'
                    : 'Please enter a valid email address. e.g. example@email.com'
            );
        },
        [email]
    );

    const onFirstNameInvalid = useCallback(
        e => {
            e.target.setCustomValidity(onNameInvalid(firstName, 'First name'));
        },
        [firstName]
    );

    const onLastNameInvalid = useCallback(
        e => {
            e.target.setCustomValidity(onNameInvalid(lastName, 'Last name'));
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
                <StyledSectionText>Instructor's Info</StyledSectionText>
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
                <StyledSectionText>Institution's Info</StyledSectionText>
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
                onChange={e => setAgreeToEmail(e.target.value)}
                required
                label="I agree to receive emails from MongoDB, Inc. After submitting, 
                a MongoDB representative will reach out within five business days."
                variant="light"
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

const AcademiaSignUpForm = ({ ...props }) => {
    const [success, setSuccess] = useState(null);
    if (success) {
        return <StyledSuccessState>Thank you for joining!</StyledSuccessState>;
    }
    return <Form setSuccess={setSuccess} success={success} {...props} />;
};

export default AcademiaSignUpForm;
