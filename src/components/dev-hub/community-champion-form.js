import React, { useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { fontSize, lineHeight, screenSize, size } from './theme';
import { P, P3 } from './text';
import Button from './button';
import Checkbox from '@leafygreen-ui/checkbox';
import Input from './input';
import { Radio, RadioGroup } from '@leafygreen-ui/radio-group';
import TextArea from './text-area';
import {
    nameInvalidMessage,
    emailInvalidMessage,
} from '~utils/invalid-form-input-messages';
import { submitCommunityChampionApplication } from '~utils/devhub-api-stitch';

const NAME_INPUT_FIELD_WIDTH = '248px';
const CHECKBOX_MOBILE_BOTTOM_MARGIN = '40px';

const ButtonContainer = styled('div')`
    display: flex;
    justify-content: center;
`;

const StyledInput = styled(Input)`
    margin-bottom: ${size.mediumLarge};
`;

const ErrorMessage = styled(P)`
    color: ${({ theme }) => theme.colorMap.salmon};
`;

const NameSection = styled('div')`
    display: grid;
    grid-template-columns: repeat(auto-fill, ${NAME_INPUT_FIELD_WIDTH});
    justify-content: space-between;
    @media ${screenSize.upToMedium} {
        grid-template-columns: 100%;
    }
`;

const StyledCheckbox = styled(Checkbox)`
    /* Leafygreen's Checkbox input is given height/width of 0, hiding invalid popup */
    > input {
        height: ${size.medium};
        width: ${size.medium};
    }
    > span {
        line-height: ${lineHeight.tiny};
    }
    margin-bottom: ${size.large};
    @media ${screenSize.upToMedium} {
        margin-bottom: ${CHECKBOX_MOBILE_BOTTOM_MARGIN};
    }
`;

const RadioGroupTitle = styled(P3)`
    margin-bottom: ${size.xsmall};
    @media ${screenSize.upToMedium} {
        font-size: ${fontSize.tiny};
        line-height: ${lineHeight.tiny};
    }
`;

const StyledRadioGroup = styled(RadioGroup)`
    column-gap: ${size.mediumLarge};
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: repeat(3, max-content);
    grid-template-rows: auto auto;
    margin-bottom: ${size.mediumLarge};
    max-width: 100%;
    @media ${screenSize.upToMedium} {
        grid-auto-flow: row;
        grid-template-columns: auto;
    }
`;

const StyledTextArea = styled(TextArea)`
    margin-bottom: ${size.large};
    @media ${screenSize.upToMedium} {
        margin-bottom: ${size.default};
    }
`;

const experienceOptions = [
    '0-6 months',
    '6 months - 1 year',
    '1-2 years',
    '2-5 years',
    '5+ years',
];

const callRealm = async (data, callback) => {
    try {
        const res = await submitCommunityChampionApplication(data);
        res && callback(true);
    } catch {
        callback(false);
    }
};

const Form = React.memo(({ setSuccess, success }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [experience, setExperience] = useState(experienceOptions[0]);
    const [bio, setBio] = useState('');
    const [agreeToEmail, setAgreeToEmail] = useState(false);
    const [canSubmit, setCanSubmit] = useState(true);
    const handleSubmit = async e => {
        e.preventDefault();
        setCanSubmit(false);
        const data = {
            first_name: firstName,
            last_name: lastName,
            email,
            experience,
            bio,
            agree_to_email: agreeToEmail,
        };
        const callback = hasSuccess => {
            setSuccess(hasSuccess);
            setCanSubmit(!hasSuccess);
        };
        callRealm(data, callback);
    };

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

    const onEmailInvalid = useCallback(
        e => {
            e.target.setCustomValidity(emailInvalidMessage(email));
        },
        [email]
    );

    return (
        <form onSubmit={handleSubmit}>
            <ErrorMessage>
                {success === false &&
                    'Your submission failed. Please try again.'}
            </ErrorMessage>
            <NameSection>
                <StyledInput
                    maxLength="25"
                    narrow
                    onChange={e => setFirstName(e.target.value)}
                    onInput={e => e.target.setCustomValidity('')}
                    onInvalid={onFirstNameInvalid}
                    pattern="^[A-Za-zÀ-ÿ ,.'-]+$"
                    placeholder="First Name"
                    required
                    value={firstName}
                />
                <StyledInput
                    maxLength="25"
                    narrow
                    onChange={e => setLastName(e.target.value)}
                    onInput={e => e.target.setCustomValidity('')}
                    onInvalid={onLastNameInvalid}
                    pattern="^[A-Za-zÀ-ÿ ,.'-]+$"
                    placeholder="Last Name"
                    required
                    value={lastName}
                />
            </NameSection>
            <StyledInput
                narrow
                onChange={e => setEmail(e.target.value)}
                onInput={e => e.target.setCustomValidity('')}
                onInvalid={onEmailInvalid}
                placeholder="Email Address"
                required
                type="email"
                value={email}
            />
            <RadioGroupTitle>Experience with MongoDB</RadioGroupTitle>
            <StyledRadioGroup
                darkMode={true}
                name="experience-input-group"
                onChange={e => setExperience(e.target.value)}
                value={experience}
                variant="default"
            >
                {experienceOptions.map((option, index) => (
                    <Radio
                        checked={experience == option}
                        key={index}
                        value={option}
                    >
                        {option}
                    </Radio>
                ))}
            </StyledRadioGroup>
            <StyledTextArea
                collapse
                onChange={e => setBio(e.target.value)}
                placeholder="Why are you interested in becoming a champion?"
                required
                value={bio}
            />
            <StyledCheckbox
                bold
                darkMode={true}
                label="I agree to receive emails from MongoDB, Inc. After submitting, a MongoDB
                representative will reach out within five business days."
                onChange={e => setAgreeToEmail(e.target.checked)}
                required
                value={agreeToEmail}
            />
            <ButtonContainer>
                <Button
                    disabled={!canSubmit}
                    hasArrow={false}
                    primary
                    type="submit"
                >
                    Submit
                </Button>
            </ButtonContainer>
        </form>
    );
});

export default Form;
