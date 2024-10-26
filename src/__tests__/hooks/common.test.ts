import { fireEvent, renderHook, waitFor } from '@testing-library/react';
import {
    useDebouncedValue,
    useIsMobile,
    useWindowDimensions,
} from '../../hooks/common';
import { act } from 'react';

describe('useDebouncedValue', () => {
    test('Returns proper value', () => {
        const { result, rerender } = renderHook((value: string) =>
            useDebouncedValue(value, 1000)
        );
        rerender('test');
        waitFor(() => expect(result.current).toBe('test'));

        rerender('test2');
        waitFor(() => expect(result.current).toBe('test2'));
    });
});

describe('useWindowDimensions', () => {
    test('Returns proper values', () => {
        window.innerWidth = 100;
        window.innerHeight = 100;

        const { result } = renderHook(() => useWindowDimensions());
        expect(result.current).toStrictEqual({ width: 100, height: 100 });
        act(() => {
            window.innerHeight = 500;
            window.innerWidth = 500;
        });

        fireEvent(window, new Event('resize'));

        expect(result.current).toStrictEqual({ width: 500, height: 500 });
    });
});

describe('useIsMobile', () => {
    test('Returns proper valuee', () => {
        window.innerWidth = 500;

        const { result } = renderHook(() => useIsMobile());
        expect(result.current).toBe(true);
        act(() => {
            window.innerWidth = 1000;
        });

        fireEvent(window, new Event('resize'));

        expect(result.current).toBe(false);
    });
});
