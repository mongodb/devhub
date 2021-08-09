import useTextFilter from '../../src/hooks/use-text-filter';
import { act, cleanup, renderHook } from '@testing-library/react-hooks';
import {
    JAVA_RESULTS,
    mockTextFilterFetch,
    FINAL_NODE_RESULTS,
} from './utils/mock-text-filter-fetch';

describe('Use Text Filter', () => {
    beforeEach(() => {});

    test('should get java results', async () => {
        // fetch is being used to mock the stitch callFunction call
        window.fetch = mockTextFilterFetch;
        const { result, waitForNextUpdate } = renderHook(() =>
            useTextFilter('java')
        );
        await waitForNextUpdate();
        const { results } = result.current;
        expect(results).toEqual(JAVA_RESULTS);
        cleanup();
    });

    test('should get node results', async () => {
        // fetch is being used to mock the stitch callFunction call
        window.fetch = mockTextFilterFetch;
        const { result, waitForNextUpdate } = renderHook(() =>
            useTextFilter('node')
        );
        await waitForNextUpdate();
        const { results } = result.current;
        expect(results).toEqual(FINAL_NODE_RESULTS);
        cleanup();
    });

    test('should debounce queries', async () => {
        const targetQuery = 'node';
        // fetch is being used to mock the stitch callFunction call
        window.fetch = jest.fn();
        jest.useFakeTimers();
        let query = 'foo';
        const { result, rerender } = renderHook(() => useTextFilter(query));
        const { results } = result.current;
        // Ensure the timers have not gone off yet
        expect(results).toEqual(null);
        expect(window.fetch).toHaveBeenCalledTimes(0);

        // To check the debounce, update the query and rerender the hook
        // We should only call fetch once
        for (let i = 0; i < 10; i++) {
            query = `${i}`;
            rerender();
        }
        // Now update the hook one more time and then run the timers
        // This should be the only call to `callFunction` (aka fetch with mocks)
        query = targetQuery;
        rerender();
        await act(async () => {
            await jest.runAllTimers();
        });
        expect(window.fetch).toHaveBeenCalledTimes(1);
        expect(window.fetch).toBeCalledWith('fetchDevhubSearchResults', [
            targetQuery,
        ]);
        cleanup();
    });
});
