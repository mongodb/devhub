import React, { useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { submitAcademiaForm } from '../../utils/devhub-api-stitch';
import { fontSize, size, screenSize } from './theme';
import { P, ArticleH3 } from './text';
import Input from './input';
import Button from './button';
import FormSelect from './select';
import TextArea from './text-area';
import Checkbox from '@leafygreen-ui/checkbox';
import SectionHeader from './section-header';
import {
    nameInvalidMessage,
    emailInvalidMessage,
} from '~utils/invalid-form-input-messages';
import countryList from 'react-select-country-list';

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

const StyledSelect = styled(FormSelect)`
    color: ${({ theme }) => theme.colorMap.greyLightTwo};
`;

const StyledSelect2 = styled('select')`
    padding: 1em;
    width: 130%;
    border-radius: 0.2em;
    border: 1px solid #acacac;
    color: #181820;

    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    -ms-appearance: none;

    background: url('https://cdn1.iconfinder.com/data/icons/arrows-vol-1-4/24/dropdown_arrow-512.png');
    background-repeat: no-repeat;
    background-size: 15px 15px;
    background-position: right;
    background-origin: content-box;
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
    const [instructorType, setInstructorType] = useState('');
    const [instructorTypeDesc, setInstructorTypeDesc] = useState('');
    const [country, setCountry] = useState('');
    const [courseName, setCourseName] = useState('');
    const [courseSyllabus, setCourseSyllabus] = useState('');
    const [instructorInterest, setInstructorInterest] = useState('');
    const [agreeToEmail, setAgreeToEmail] = useState(false);
    const [canSubmit, setCanSubmit] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const institutionTypes = [
        ['bootcamp', 'Bootcamp'],
        ['online_course', 'Online Course'],
        ['high_school', 'High School'],
        ['university_college', 'University / College'],
    ];
    const instructorTypes = [
        ['professor', 'Professor'],
        ['teaching_assistant', 'Teaching Assistant'],
        ['bootcamp_instructor', 'Bootcamp instructor'],
        ['other', 'Other'],
    ];
    const instructorInterests = [
        ['currently_teaching_mongodb', 'Currently Teaching MongoDB'],
        ['interested_in_teaching_mongodb', 'Interested In Teaching MongoDB'],
        ['just_curious', 'Just Curious'],
    ];
    const countries = countryList()
        .getData()
        .map(e => [e.label, e.label]);

    const validateDropdowns = data => {
        const filloutMessage = 'Please fill out the field: ';
        if (data.instructor_type === '') {
            setErrorMessage(`${filloutMessage} I am a`);
            return false;
        }
        if (data.instructor_interests === '') {
            setErrorMessage(`${filloutMessage} I am`);
            return false;
        }
        if (data.institution_type === '') {
            setErrorMessage(`${filloutMessage} Institution Type`);
            return false;
        }
        if (data.country === '') {
            setErrorMessage(`${filloutMessage} Country`);
            return false;
        }
        setErrorMessage('Your submission failed. Please try again.');
        return true;
    };

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
            instructor_type:
                instructorType === 'other'
                    ? instructorTypeDesc
                    : instructorType,
            instructor_interests: instructorInterest,
            country: country,
            course_name: courseName,
            course_syllabus: courseSyllabus,
        };
        const response = validateDropdowns(data)
            ? await submitAcademiaForm(data)
            : { success: false };
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
            <ErrorMessage>{success === false && errorMessage}</ErrorMessage>
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
                <StyledSelect
                    narrow
                    required
                    value={instructorType}
                    defaultText="I am a"
                    choices={instructorTypes}
                    onChange={e => setInstructorType(e)}
                />
                {instructorType === 'other' ? (
                    <Input
                        narrow
                        required
                        value={instructorTypeDesc}
                        placeholder="please specify your profession"
                        onChange={e => setInstructorTypeDesc(e.target.value)}
                    />
                ) : null}
                <StyledSelect
                    narrow
                    required
                    value={instructorInterest}
                    defaultText="I am"
                    choices={instructorInterests}
                    onChange={e => setInstructorInterest(e)}
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
                <StyledSelect
                    narrow
                    value={country}
                    defaultText="Country"
                    choices={countries}
                    onChange={e => setCountry(e)}
                />
                <Input
                    narrow
                    required
                    value={courseName}
                    required
                    maxLength="75"
                    placeholder="Course Name"
                    onChange={e => setCourseName(e.target.value)}
                />
                <TextArea
                    bold
                    darkMode={true}
                    placeholder="Course Syllabus"
                    value={courseSyllabus}
                    onChange={e => setCourseSyllabus(e.target.value)}
                />
            </InstitutionSection>
            <StyledCheckbox
                bold
                value={agreeToEmail}
                darkMode={true}
                onChange={e => setAgreeToEmail(e.target.checked)}
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
                Join the MongoDB for Academia Educator Community
            </StyledButton>
        </form>
    );
});

export default AcademiaSignUpForm;
