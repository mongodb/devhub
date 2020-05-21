import React, { useState } from 'react';
import styled from '@emotion/styled';
import { colorMap, size, screenSize } from './theme';
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

const StyledSelect = styled(Select)`
    color: ${colorMap.greyLightTwo};
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
    display: grid;
    grid-template-columns: repeat(auto-fill, ${INPUT_BOX_WIDTH});
    grid-row-gap: ${size.mediumLarge};
    justify-content: space-between;
    margin-bottom: ${size.xlarge};
    @media ${screenSize.upToMedium} {
        display: grid;
        grid-template-columns: repeat(auto-fill, ${INPUT_BOX_WIDTH});
        grid-row-gap: ${size.mediumLarge};
        justify-content: space-between;
        margin-bottom: ${size.xlarge};
    }
`;

const InstitutionSection = styled('div')`
    display: grid;
    grid-template-columns: repeat(auto-fill, ${INPUT_BOX_WIDTH});
    grid-row-gap: ${size.mediumLarge};
    justify-content: space-between;
    margin-bottom: ${size.xlarge};
    @media ${screenSize.upToMedium} {
        display: grid;
        grid-template-columns: repeat(auto-fill, ${INPUT_BOX_WIDTH});
        grid-row-gap: ${size.mediumLarge};
        justify-content: space-between;
        margin-bottom: ${size.xlarge};
    }
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
        ['bootcamp', 'Bootcamp'],
        ['online_course', 'Online Course'],
        ['high_school', 'High School'],
        ['university_college', 'University / College'],
    ];

    const handleSubmit = async e => {
        e.preventDefault();
        setCanSubmit(false);
        setSuccess(true);
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
        <Form onSubmit={handleSubmit}>
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
                    onInvalid={e =>
                        e.target.setCustomValidity(
                            'First names should only contain letters. e.g.John'
                        )
                    }
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
                    onInvalid={e =>
                        e.target.setCustomValidity(
                            'Last names should only contain letters. e.g.Doe'
                        )
                    }
                />
                <Input
                    narrow
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
                    required
                    defaultText="Institution Type"
                    choices={institutionTypes}
                    onChange={e => setInstitutionType(e)}
                />
            </InstitutionSection>

            <Checkbox
                onChange={e => setAgreeToEmail(e.target.value)}
                required
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
        </Form>
    );
});

const AcademiaSignUpForm = () => {
    const [success, setSuccess] = useState(null);
    if (success) {
        return <SuccessState>Thank you for joining!</SuccessState>;
    }
    return <Form setSuccess={setSuccess} success={success} />;
};

export default AcademiaSignUpForm;
