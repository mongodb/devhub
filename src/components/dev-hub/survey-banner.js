import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Button from './button';
import Icon from '@leafygreen-ui/icon';
import { fontSize, screenSize, size, colorMap } from './theme';

const Footer = styled('div')`
    background-color: ${colorMap.greyDarkTwo};
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    border: 1px solid ${colorMap.greyDarkOne};
`;

const FooterContent = styled('div')`
    display: flex;
    justify-content: space-between;
    @media ${screenSize.mediumAndUp} {
        margin: 0 2% 0 15%;
    } ;
`;

const SurveyContent = styled('div')`
    @media ${screenSize.mediumAndUp} {
        display: flex;
    }
`;

const SurveyText = styled('div')`
    font-family: 'Fira Mono', monospace;
    font-size: ${fontSize.tiny};
    padding: 18px;
    @media ${screenSize.upToMedium} {
        padding: ${size.xsmall} ${size.xsmall} 0px ${size.xsmall};
    }
`;

const SurveyButtonContainer = styled('div')`
    display: 'flex';
    padding: ${size.xsmall} 0px ${size.xsmall} ${size.xsmall};
`;

const CloseButtonContainer = styled('div')`
    padding: 18px;
`;

const StyledButton = styled(Button)`
    font-size: ${fontSize.tiny};
    padding: ${size.default} ${size.medium};
`;

const StyledIcon = styled(Icon)`
    cursor: pointer;
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
            <FooterContent>
                <SurveyContent>
                    <SurveyText>
                        Help improve this experience by taking a 2 minute
                        survey!
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
                    <StyledIcon
                        glyph="XWithCircle"
                        fill={colorMap.devWhite}
                        onClick={closeSurveyBanner}
                    />
                </CloseButtonContainer>
            </FooterContent>
        </Footer>
    ) : (
        <></>
    );
};

export default SurveyBanner;
