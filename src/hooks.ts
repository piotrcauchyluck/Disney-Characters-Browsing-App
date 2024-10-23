import { useEffect, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { baseUrl, retrieveCharacters } from './api/disney';
import type { DisneyData } from './types';

export const useDebouncedValue = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(timeout);
        };
    }, [value, delay]);

    return debouncedValue;
};

export const useCharacterData = (input: string) => {
    const nameParam = `name=${encodeURIComponent(input)}`;

    const {
        data: queryData,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: [input],
        queryFn: retrieveCharacters,
        initialPageParam: `${baseUrl}?${nameParam}`,
        enabled: !!input,
        getNextPageParam: (lastPage: DisneyData) => {
            const nextPage = lastPage?.info?.nextPage;
            if (nextPage) return `${nextPage}&${nameParam}`;
        },
    });

    const {
        info: { totalPages },
    } = queryData?.pages[0] || {
        info: { totalPages: 0 },
    };
    const data = queryData?.pages.map(({ data }) => data).flat() || [];

    return {
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        totalPages,
        loadedPages: queryData?.pages.length || 0,
        data,
    };
};
