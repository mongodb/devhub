import { determineCorrectLeafygreenLanguage } from '../../src/utils/determine-correct-leafygreen-language';

const NONE = 'none';

it('should correctly determine code langauges to use with LG', () => {
    const logFn = console.warn;
    const warnFn = console.warn;
    // Mock console functions to suppress output and allow for testing
    console.log = jest.fn();
    console.warn = jest.fn();
    expect(determineCorrectLeafygreenLanguage('')).toBe(NONE);
    expect(determineCorrectLeafygreenLanguage('react')).toBe(NONE);
    // We should warn if an unsupported language is provided and log to build output
    expect(console.log).toHaveBeenCalled();
    expect(console.warn).toHaveBeenCalled();

    expect(determineCorrectLeafygreenLanguage('sh')).toBe('shell');
    expect(determineCorrectLeafygreenLanguage('csp')).toBe('cs');
    expect(determineCorrectLeafygreenLanguage('html')).toBe('html');
    expect(determineCorrectLeafygreenLanguage('toml')).toBe('toml');
    console.log = logFn;
    console.warn = warnFn;
});
