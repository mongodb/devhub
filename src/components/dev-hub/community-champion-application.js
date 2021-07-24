import React, { useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { fontSize, screenSize, size } from './theme';
import { H5, P } from './text';
import Button from './button';
import CommunityChampionForm from './community-champion-form';
import Modal from './modal';
import SuccessState from './success-state';

const CONTENT_STYLE_MOBILE_BOTTOM_PADDING = '48px';
const CONTENT_STYLE_BOTTOM_PADDING = '40px';
const TITLE_MOBILE_LINE_HEIGHT = '30px';
const DESCRIPTION_BOTTOM_MARGIN = '40px';
const SUCCESS_STATE_BOTTOM_MARGIN = '40px';
const SUCCESS_STATE_HEADING_MOBILE_FONT_SIZE = '28px';
const SUCCESS_STATE_HEADING_MOBILE_LINE_HEIGHT = '38px';
const MODAL_DIALOG_CONTAINER_STYLE_WIDTH = '600px';

const ModalContainer = styled('div')`
    @media ${screenSize.mediumAndUp} {
        padding: 0 ${size.mediumLarge};
    }
`;

const contentStyle = css`
    @media ${screenSize.upToMedium} {
        border: none;
        border-radius: 0;
        max-width: unset;
        min-height: 100vh;
        min-width: unset;
        padding: ${size.default} ${size.default}
            ${CONTENT_STYLE_MOBILE_BOTTOM_PADDING};
        width: 100%;
    }
    @media ${screenSize.mediumAndUp} {
        padding: ${size.default} ${size.default} ${CONTENT_STYLE_BOTTOM_PADDING};
    }
`;

const closeButtonContainerStyle = css`
    display: flex;
    justify-content: center;
    margin-bottom: ${size.xsmall};
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

const StyledSuccessState = styled(SuccessState)`
    margin-bottom: ${SUCCESS_STATE_BOTTOM_MARGIN};
    h3 {
        @media ${screenSize.upToMedium} {
            font-size: ${SUCCESS_STATE_HEADING_MOBILE_FONT_SIZE};
            line-height: ${SUCCESS_STATE_HEADING_MOBILE_LINE_HEIGHT};
        }
    }
`;

const ChampionApplicationForm = ({ triggerComponent }) => {
    const [success, setSuccess] = useState(null);
    return (
        <Modal
            closeButtonContainerStyle={closeButtonContainerStyle}
            CloseTriggerComponent={
                success
                    ? props => (
                          <Button hasArrow={false} primary {...props}>
                              Close
                          </Button>
                      )
                    : null
            }
            contentStyle={contentStyle}
            dialogContainerStyle={{
                padding: 0,
                width: MODAL_DIALOG_CONTAINER_STYLE_WIDTH,
            }}
            dialogMobileContainerStyle={{
                height: '100%',
                minHeight: '100vh',
                padding: 0,
                width: '100%',
            }}
            triggerComponent={triggerComponent}
            verticallyCenter
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
                        <CommunityChampionForm
                            setSuccess={setSuccess}
                            success={success}
                        />
                    </>
                )}
            </ModalContainer>
        </Modal>
    );
};

export default ChampionApplicationForm;
