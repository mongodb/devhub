import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Button from './button';
import { fontSize, screenSize, size, layer } from './theme';
import XWithCircleIcon from '@leafygreen-ui/icon/dist/XWithCircle';
import IconButton from '@leafygreen-ui/icon-button';

const Footer = styled('div')`
    background-color: ${({ theme }) => theme.colorMap.greyDarkTwo};
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    border: 1px solid ${({ theme }) => theme.colorMap.greyDarkOne};
    padding: 0px ${size.medium};
    @media ${screenSize.mediumAndUp} {
        padding: 0px ${size.large};
    }
    display: flex;
    justify-content: space-between;
    z-index: ${layer.superFront};
`;

const SurveyContent = styled('div')`
    margin: auto;
    @media ${screenSize.largeAndUp} {
        display: flex;
        flex-wrap: wrap;
    }
`;

const SurveyText = styled('P')`
    font-family: 'Fira Mono', monospace;
    font-size: ${fontSize.tiny};
    padding-left: ${size.small};
`;

const SurveyButtonContainer = styled('div')`
    display: flex;
    padding: ${size.xsmall};
`;

const CloseButtonContainer = styled('div')`
    padding: ${size.small};
`;

const StyledButton = styled(Button)`
    font-size: ${fontSize.tiny};
    padding: ${size.default} ${size.medium};
`;

const surveyLink =
    'https://mongodb.co1.qualtrics.com/jfe/form/SV_24x6XG9EVxE0dOm';

const SurveyBanner = () => {
    const [showSurveyBanner, setShowSurveyBanner] = useState(true);
    const closeSurveyBanner = () => {
        localStorage.setItem('surveybanner', 'hide');
        setShowSurveyBanner(false);
    };

    useEffect(() => {
        const storedBannerDisplayInLocalStorage = localStorage.getItem(
            'surveybanner'
        );
        if (storedBannerDisplayInLocalStorage === 'hide') {
            setShowSurveyBanner(false);
        }
    }, []);

    return showSurveyBanner === true ? (
        <Footer>
            <SurveyContent>
                <SurveyText>
                    Help improve this experience by taking a 2 minute survey!
                </SurveyText>
                <SurveyButtonContainer>
                    <StyledButton
                        onClick={closeSurveyBanner}
                        primary
                        hasArrow={false}
                        href={surveyLink}
                        target="_blank"
                    >
                        Take Survey
                    </StyledButton>
                    <StyledButton onClick={closeSurveyBanner}>
                        No Thanks
                    </StyledButton>
                </SurveyButtonContainer>
            </SurveyContent>
            <CloseButtonContainer>
                <IconButton onClick={closeSurveyBanner}>
                    <XWithCircleIcon fill="#f9fbfa" />
                </IconButton>
            </CloseButtonContainer>
        </Footer>
    ) : (
        <></>
    );
};

export default SurveyBanner;
