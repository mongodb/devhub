import React from 'react';
import styled from '@emotion/styled';
import {
    fontSize,
    lineHeight,
    screenSize,
    size,
} from '~components/dev-hub/theme';
import { H6, P2 } from '~components/dev-hub/text';
import LocationPinIcon from '~images/community-champions/location-pin-white.svg';
import BriefcaseIcon from '~images/community-champions/briefcase.svg';
import SpeechBubbleIcon from '~images/community-champions/speech-bubble.svg';

const BOTTOM_MARGIN = '48px';
const ROW_GAP = '4px';
const TEXT_COLUMN_WIDTH = '248px';
const ICON_MOBILE_WIDTH = '12px';

const Grid = styled('div')`
    column-gap: ${size.large};
    display: grid;
    grid-template-areas:
        'occupation languages'
        'location languages';
    grid-template-columns: auto auto;
    grid-template-rows: auto auto;
    margin-bottom: ${BOTTOM_MARGIN};
    row-gap: ${ROW_GAP};
    @media ${screenSize.upToSmallDesktop} {
        align-items: center;
        display: flex;
        flex-direction: column;
        margin-bottom: ${size.large};
    }
`;

const ItemContainer = styled('div')`
    align-items: start;
    column-gap: ${size.xsmall};
    display: grid;
    ${({ gridArea }) => (gridArea ? `grid-area: ${gridArea}` : '')};
    grid-template-columns: ${size.default} ${TEXT_COLUMN_WIDTH};
    @media ${screenSize.upToSmallDesktop} {
        grid-template-columns: ${size.default} auto;
        text-align: center;
    }
    @media ${screenSize.upToMedium} {
        grid-template-columns: ${ICON_MOBILE_WIDTH} auto;
    }
`;

const Icon = styled('img')`
    padding-top: ${size.tiny};
    width: 100%;
`;

const IconWithText = ({ alt, gridArea, src, text }) => (
    <ItemContainer gridArea={gridArea}>
        <Icon src={src} alt={alt} />
        <P2 collapse>{text}</P2>
    </ItemContainer>
);

const Occupation = ({ occupation }) => (
    <IconWithText
        gridArea="occupation"
        src={BriefcaseIcon}
        alt="Briefcase"
        text={occupation}
    />
);

const Location = ({ location }) => (
    <IconWithText
        gridArea="location"
        src={LocationPinIcon}
        alt="Location pin"
        text={location}
    />
);

const LanguagesTitle = styled(H6)`
    color: ${({ theme }) => theme.colorMap.greyLightTwo};
    font-size: ${fontSize.tiny};
    font-weight: 500;
    letter-spacing: 0.1em;
    line-height: ${lineHeight.tiny};
    text-transform: uppercase;
    @media ${screenSize.upToSmallDesktop} {
        display: none;
    }
`;

const LanguagesContainer = styled('div')`
    grid-area: languages;
`;

const Languages = ({ languages }) => (
    <LanguagesContainer>
        <LanguagesTitle collapse>Languages</LanguagesTitle>
        <IconWithText
            src={SpeechBubbleIcon}
            alt="Speech bubble"
            text={languages}
        />
    </LanguagesContainer>
);

const BioHeader = ({ location, occupation, languages }) => (
    <Grid>
        <Occupation occupation={occupation} />
        <Location location={location} />
        <Languages languages={languages} />
    </Grid>
);

export default BioHeader;
