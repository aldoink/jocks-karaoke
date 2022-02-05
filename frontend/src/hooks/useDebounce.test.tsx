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
        expect(result.current).toBeUndefined();

        //when
        act(() => {jest.advanceTimersByTime(delay)});

        //then
        expect(result.current).toBe(value);
    });

    it('clears timer when unmounted', () => {
        //given
        expect(jest.getTimerCount()).toBe(0);

        const value = 'test';
        const delay = 500;
        const {unmount} = renderHook(() => useDebounce(value, delay));
        expect(jest.getTimerCount()).toBe(2); // renderHook uses a timer.

        //when
        unmount();

        //then
        expect(jest.getTimerCount()).toBe(1);
    });
});