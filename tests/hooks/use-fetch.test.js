import useFetch from '../../src/hooks/use-fetch';
import { cleanup, renderHook } from '@testing-library/react-hooks';

const sampleSuccess = {
    someResult:
        "I'm an example of a success response. This hook is meant to provide #request() capabilities in hook format",
};

const mockSuccessApi = {
    ok: true,
    json() {
        return sampleSuccess;
    },
};

const mockFailApi = {
    ok: false,
    json() {
        return new Error('An error occured');
    },
};

describe('Use Fetch', () => {
    beforeEach(() => {
        window.fetch = jest.fn();
    });

    test('should get data', async () => {
        window.fetch.mockReturnValue(mockSuccessApi);
        const { result, waitForNextUpdate } = renderHook(() =>
            useFetch('/url', x => x.json())
        );
        await waitForNextUpdate();
        const { data, error } = result.current;
        expect(data).toEqual(sampleSuccess);
        expect(error).toEqual(null);
        cleanup();
    });

    test('should return an error if any are thrown', async () => {
        const { warn } = console;
        console.warn = jest.fn();
        window.fetch.mockReturnValue(mockFailApi);
        const { result, waitForNextUpdate } = renderHook(() =>
            useFetch('/url', x => x.json())
        );
        await waitForNextUpdate();
        const { data, error } = result.current;
        expect(data).toEqual(null);
        expect(console.warn).toHaveBeenCalledTimes(1);
        expect(error).not.toBeNull();
        console.warn = warn;
        cleanup();
    });

    test('should debounce fetch if requested', async () => {
        // Use fake timers for easier control over debounce
        jest.useFakeTimers();
        window.fetch.mockReturnValue(mockSuccessApi);
        let url = '/url';
        const { result, rerender, waitForNextUpdate } = renderHook(() =>
            useFetch(url, x => x.json(), 1000)
        );
        expect(window.fetch).toHaveBeenCalledTimes(0);
        let { data, error } = result.current;
        expect(data).toEqual(null);
        expect(error).toEqual(null);
        // Update the hook 10 additional times before running timers,
        // only one call should occur (last one)
        for (let i = 0; i < 10; i++) {
            url = `/url${i}`;
            rerender();
        }
        await jest.runAllTimers();
        await waitForNextUpdate();
        expect(window.fetch).toHaveBeenCalledTimes(1);
        expect(window.fetch).toHaveBeenCalledWith(url);
        let { data: updatedData, error: updatedError } = result.current;
        expect(updatedData).toEqual(sampleSuccess);
        expect(updatedError).toEqual(null);
        cleanup();
    });
});
