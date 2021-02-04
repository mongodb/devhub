import React from 'react';
import styled from '@emotion/styled';
import Button from '~components/dev-hub/button';
import { H5 } from '~components/dev-hub/text';

const Centered = styled('div')`
    display: flex;
    justify-content: center;
`;

const H5ChangesOnClose = styled(H5)`
    ${({ isClosed, theme }) =>
        isClosed && `color: ${theme.colorMap.greyDarkOne}`};
    float: left;
    ${({ isClosed }) => isClosed && 'margin-bottom: 0'};
`;
const Legend = H5ChangesOnClose.withComponent('legend');

const Fieldset = styled('fieldset')`
    background: #0c1c27;
    border: 1px solid #21313c;
    border-radius: 8px;
    padding: 32px 48px;
    max-width: 792px;
    margin: 0 auto;
    :not(:last-of-type) {
        margin-bottom: 24px;
    }
`;

const FieldsetContent = styled('div')`
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
    > * {
        margin-bottom: 24px;
    }
`;

const SubmitFormFieldset = ({
    buttonText,
    children,
    legendText,
    isOpen,
    onComplete,
    newRef,
}) => (
    <Fieldset ref={newRef}>
        <Legend isClosed={!isOpen}>{legendText}</Legend>
        <FieldsetContent isOpen={isOpen}>
            {children}
            <Centered>
                <Button primary onClick={onComplete}>
                    {buttonText}
                </Button>
            </Centered>
        </FieldsetContent>
    </Fieldset>
);

export default SubmitFormFieldset;
