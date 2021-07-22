import React from 'react';
import { ThemeProvider } from "@emotion/react";
import {darkTheme} from "~components/dev-hub/theme";
import SurveyBanner from "~components/dev-hub/survey-banner";

export const wrapPageElement = ({ element }) => {
    return (

        <ThemeProvider theme={darkTheme}>
            {element}
            <SurveyBanner></SurveyBanner>
        </ThemeProvider>

    );
};

