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
window.fetch = jest.fn();

describe('Use Fetch', () => {
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
});
