import React, { useState } from 'react';
import styled from '@emotion/styled';
import { colorMap, size, screenSize } from './theme';
import { P, ArticleH3, H3 } from './text';
import Input from './input';
import Button from './button';
import FormSelect from './select';
import Checkbox from '@leafygreen-ui/checkbox';
import SectionHeader from './section-header';
import SuccessIcon from './icons/success';

const StyledButton = styled(Button)`
    display: flex;
    margin: ${size.large} auto;
`;

const StyledInput = styled(Input)`
    height: 40px;
    margin-bottom: ${size.large};
    width: 335px;
`;

const StyledFormSelect = styled(FormSelect)`
    color: ${colorMap.greyLightTwo};
    height: 40px;
    width: 335px;
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

const StyledSectionText = styled(ArticleH3)`
    color: ${colorMap.greyLightTwo};
    font-family: akzidenz;
    font-weight: normal;
`;

const InstructorSection = styled('div')`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: ${size.default};
    @media ${screenSize.upToMedium} {
        display: block;
    }
`;

const InstitutionSection = styled('div')`
    display: flex;
    justify-content: space-between;
    margin-bottom: ${size.default};
    @media ${screenSize.upToMedium} {
        display: block;
    }
`;

const StyledForm = styled('form')`
    margin: 0 auto;
    width: 720px;
`;

const Form = React.memo(({ setSuccess, success }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [institutionName, setInstitutionName] = useState('');
    const [institutionType, setInstitutionType] = useState('');
    const [agreeToEmail, setAgreeToEmail] = useState(false);
    const [canSubmit, setCanSubmit] = useState(true);
    const institutionTypes = [
        ['Bootcamp', 'Bootcamp'],
        ['Online Course', 'Online Course'],
        ['High School', 'High School'],
        ['University / College', 'University / College'],
    ];

    const handleSubmit = async e => {
        e.preventDefault();
        setCanSubmit(false);
        const obj = {
            first_name: firstName,
            last_name: lastName,
            email,
            institution_name: institutionName,
            institution_type: institutionType,
            agree_to_email: agreeToEmail,
        };

        //TODO: communicate with the backend here
    };

    return (
        <StyledForm onSubmit={handleSubmit}>
            <ErrorMessage>
                {success === false &&
                    'Your submission failed. Please try again.'}
            </ErrorMessage>

            <SectionHeader>
                <StyledSectionText>Instructor's Info</StyledSectionText>
            </SectionHeader>

            <InstructorSection>
                <StyledInput
                    value={firstName}
                    maxLength="25"
                    required
                    pattern="^[A-Za-zÀ-ÿ ,.'-]+$"
                    placeholder="First Name"
                    onChange={e => setFirstName(e.target.value)}
                    onInput={e => e.target.setCustomValidity('')}
                    onInvalid={e =>
                        e.target.setCustomValidity(
                            'First names should only contain letters. e.g.John'
                        )
                    }
                />
                <StyledInput
                    value={lastName}
                    maxLength="25"
                    required
                    pattern="^[A-Za-zÀ-ÿ ,.'-]+$"
                    placeholder="Last Name"
                    onChange={e => setLastName(e.target.value)}
                    onInput={e => e.target.setCustomValidity('')}
                    onInvalid={e =>
                        e.target.setCustomValidity(
                            'Last names should only contain letters. e.g.Doe'
                        )
                    }
                />
                <StyledInput
                    type="email"
                    value={email}
                    required
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
                    placeholder="Email Address"
                    onChange={e => setEmail(e.target.value)}
                    onInput={e => e.target.setCustomValidity('')}
                    onInvalid={e =>
                        e.target.setCustomValidity(
                            'Please enter a valid email address. e.g. example@email.com'
                        )
                    }
                />
            </InstructorSection>

            <SectionHeader>
                <StyledSectionText>Institution's Info</StyledSectionText>
            </SectionHeader>

            <InstitutionSection>
                <StyledInput
                    value={institutionName}
                    required
                    placeholder="Name of Institution"
                    onChange={e => setInstitutionName(e.target.value)}
                />
                <StyledFormSelect
                    value={institutionType}
                    defaultText="Institution Type"
                    choices={institutionTypes}
                    onChange={e => setInstitutionType(e)}
                />
            </InstitutionSection>

            <Checkbox
                onChange={e => setAgreeToEmail(e.target.value)}
                label="I agree to receive emails from MongoDB around MongoDB for Academia. After submitting, a 
                MongoDB representative will reach out within five business days."
                variant="light"
            />

            <StyledButton
                disabled={!canSubmit}
                type="submit"
                primary
                hasArrow={false}
            >
                Join MongoDB for Academia
            </StyledButton>
        </StyledForm>
    );
});

const SuccessState = () => (
    <SuccessContainer>
        <SuccessIcon />
        <H3>Thank you for joining!</H3>
    </SuccessContainer>
);

const AcademiaSignUpForm = () => {
    const [success, setSuccess] = useState(null);
    if (success) {
        return <SuccessState />;
    }
    return (
        <>
            <Form setSuccess={setSuccess} success={success} />
        </>
    );
};

export default AcademiaSignUpForm;
