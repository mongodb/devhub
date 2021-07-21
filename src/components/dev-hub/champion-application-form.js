import React, { useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { fontSize, lineHeight, screenSize, size } from './theme';
import { H5, P, P3 } from './text';
import Button from './button';
import Checkbox from '@leafygreen-ui/checkbox';
import Input from './input';
import Modal from './modal';
import { Radio, RadioGroup } from '@leafygreen-ui/radio-group';
import SuccessState from './success-state';
import TextArea from './text-area';
import {
    nameInvalidMessage,
    emailInvalidMessage,
} from '~utils/invalid-form-input-messages';

const CONTENT_STYLE_MOBILE_BOTTOM_PADDING = '48px';
const CONTENT_STYLE_BOTTOM_PADDING = '40px';
const TITLE_MOBILE_LINE_HEIGHT = '30px';
const DESCRIPTION_BOTTOM_MARGIN = '40px';
const NAME_INPUT_FIELD_WIDTH = '248px';
const CHECKBOX_MOBILE_BOTTOM_MARGIN = '40px';
const SUCCESS_STATE_BOTTOM_MARGIN = '40px';
const SUCCESS_STATE_HEADING_MOBILE_FONT_SIZE = '28px';
const SUCCESS_STATE_HEADING_MOBILE_LINE_HEIGHT = '38px';
const MODAL_DIALOG_CONTAINER_STYLE_WIDTH = '664px';

const ModalContainer = styled('div')`
    @media ${screenSize.mediumAndUp} {
        padding: 0 ${size.mediumLarge};
    }
`;

const contentStyle = css`
    @media ${screenSize.upToMedium} {
        padding: ${size.default} ${size.default}
            ${CONTENT_STYLE_MOBILE_BOTTOM_PADDING};
    }
    @media ${screenSize.mediumAndUp} {
        padding: ${size.default} ${size.default} ${CONTENT_STYLE_BOTTOM_PADDING};
    }
`;

const ButtonContainer = styled('div')`
    display: flex;
    justify-content: center;
`;

const Title = styled(H5)`
    margin-bottom: ${size.mediumLarge};
    @media ${screenSize.upToMedium} {
        font-size: ${fontSize.medium};
        line-height: ${TITLE_MOBILE_LINE_HEIGHT};
    }
`;

const Description = styled(P)`
    margin-bottom: ${DESCRIPTION_BOTTOM_MARGIN};
    @media ${screenSize.upToMedium} {
        margin-bottom: ${size.large};
    }
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

const StyledSuccessState = styled(SuccessState)`
    margin-bottom: ${SUCCESS_STATE_BOTTOM_MARGIN};
    h3 {
        @media ${screenSize.upToMedium} {
            font-size: ${SUCCESS_STATE_HEADING_MOBILE_FONT_SIZE};
            line-height: ${SUCCESS_STATE_HEADING_MOBILE_LINE_HEIGHT};
        }
    }
`;

const Form = React.memo(({ setSuccess, success }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const experienceOptions = [
        '0-6 months',
        '6 months - 1 year',
        '1-2 years',
        '2-5 years',
        '5+ years',
    ];
    const [experience, setExperience] = useState(experienceOptions[0]);
    const [bio, setBio] = useState('');
    const [agreeToEmail, setAgreeToEmail] = useState(false);
    const [canSubmit, setCanSubmit] = useState(true);
    const handleSubmit = async e => {
        // TODO: implement this
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
                className="experience-radio-group"
                darkMode={true}
                name="experience-input-group"
                onChange={e => setExperience(e.target.value)}
                value={experience}
                variant="default"
            >
                {experienceOptions.map(option => (
                    <Radio className="experience-radio" value={option}>
                        {option}
                    </Radio>
                ))}
            </StyledRadioGroup>
            <StyledTextArea
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
                onChange={e => setAgreeToEmail(e.target.value)}
                required
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

const ChampionApplicationForm = ({ triggerComponent }) => {
    const [success, setSuccess] = useState(null);
    return (
        <Modal
            contentStyle={contentStyle}
            dialogContainerStyle={{
                width: MODAL_DIALOG_CONTAINER_STYLE_WIDTH,
            }}
            dialogMobileContainerStyle={{
                width: '100%',
            }}
            showCloseButton={success}
            triggerComponent={triggerComponent}
        >
            <ModalContainer>
                {success ? (
                    <StyledSuccessState>
                        Thank you for applying!
                    </StyledSuccessState>
                ) : (
                    <>
                        <Title collapse>Become a Champion</Title>
                        <Description collapse>
                            If you’re interested in becoming a MongoDB champion,
                            please let us know by submitting the form and
                            someone from our community team will get back to you
                            within 5 business days.
                        </Description>
                        <Form setSuccess={setSuccess} success={success} />
                    </>
                )}
            </ModalContainer>
        </Modal>
    );
};

export default ChampionApplicationForm;
