import useTextFilter from '../../src/hooks/use-text-filter';
import { act, cleanup, renderHook } from '@testing-library/react-hooks';
import {
    JAVA_RESULTS,
    mockTextFilterFetch,
    NODE_RESULTS,
} from './utils/mock-text-filter-fetch';

describe('Use Text Filter', () => {
    beforeEach(() => {});

    test('should get java results', async () => {
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
        window.fetch = mockTextFilterFetch;
        const { result, waitForNextUpdate } = renderHook(() =>
            useTextFilter('node')
        );
        await waitForNextUpdate();
        const { results } = result.current;
        expect(results).toEqual(NODE_RESULTS);
        cleanup();
    });

    test('should debounce queries', async () => {
        window.fetch = jest.fn();
        jest.useFakeTimers();
        let query = 'foo';
        const { result, rerender } = renderHook(() => useTextFilter(query));
        const { results } = result.current;
        expect(results).toEqual(null);
        expect(window.fetch).toHaveBeenCalledTimes(0);
        for (let i = 0; i < 10; i++) {
            query = `${i}`;
            rerender();
        }
        query = 'node';
        rerender();
        await act(async () => {
            await jest.runAllTimers();
        });
        expect(window.fetch).toHaveBeenCalledTimes(1);
        expect(window.fetch).toBeCalledWith('fetchTextFilterResults', ['node']);
        cleanup();
    });
});
