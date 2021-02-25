import React from 'react';
import styled from '@emotion/styled';
import { H3 } from '../text';
import Button from '../button';
import { size } from '../theme';

const FORM_LINK = '/academia/students/submit/';
const MAX_WIDTH = '600px';

const MaxWidthContainer = styled('div')`
    margin: 0 auto;
    max-width: ${MAX_WIDTH};
    padding: 0 ${size.default};
    text-align: center;
`;

const HeaderWithIncreasedMargin = styled(H3)`
    margin-bottom: ${size.medium};
`;

const ShareProjectCTA = ({ ...props }) => (
    <MaxWidthContainer {...props}>
        <HeaderWithIncreasedMargin>
            Have an interesting MongoDB project to share? Let us know!
        </HeaderWithIncreasedMargin>
        <Button primary to={FORM_LINK}>
            Show off your project
        </Button>
    </MaxWidthContainer>
);

export default ShareProjectCTA;
