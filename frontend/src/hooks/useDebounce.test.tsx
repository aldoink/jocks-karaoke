import {act, renderHook} from "@testing-library/react-hooks";
import useDebounce from "./useDebounce";

describe('useDebounce', () => {

    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
    });

    it('only returns the value after the given delay', async () => {
        //given
        const value = 'test';
        const delay = 500;
        const {result} = renderHook(() => useDebounce(value, delay));

        //when
        await act(async () => {jest.advanceTimersByTime(delay - 1)});

        //then
        expect(result.current).toBeUndefined();

        //when (2)
        await act(async () => {jest.advanceTimersByTime(delay)});

        //then (2)
        expect(result.current).toBe(value);
    });
});