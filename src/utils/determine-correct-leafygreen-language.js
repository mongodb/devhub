import { Language } from '@leafygreen-ui/code';

const SUPPORTED_LANGUAGES = new Set(Object.values(Language));

export const determineCorrectLeafygreenLanguage = inputLang => {
    let language = !!inputLang ? inputLang.toLowerCase() : 'none';
    if (language === 'html' || language === 'toml') {
        // Seem to be supported but not in the Language export from LG
        return language;
    } else if (language === 'csp') {
        // LG expects 'csp' as 'cs'
        language = 'cs';
    } else if (language === 'sh') {
        language = 'shell';
    } else if (!SUPPORTED_LANGUAGES.has(language)) {
        // Language is not supported formally by LG, set to none to avoid errors
        const warningMessage = `Warning: Language ${language} is not supported. Defaulting to "none"`;
        console.warn(warningMessage);
        console.log(warningMessage);
        language = 'none';
    }
    return language;
};
