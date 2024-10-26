import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useLocation, useParams } from 'react-router-dom';

import {
    createNextPageParam,
    getInitialPageParam,
    retrieveCharacters,
    retrieveSingleCharacter,
} from '../services/characters';

import type { Character, DisneyData } from '../types/data';

export const useCharacterData = (input: string) => {
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
        initialPageParam: getInitialPageParam(input),
        enabled: !!input,
        getNextPageParam: (lastPage: DisneyData) => {
            const nextPage = lastPage?.info?.nextPage;
            if (nextPage) return createNextPageParam(nextPage, input);
        },
    });

    const totalPages = queryData?.pages[0].info.totalPages || 0;
    const data = queryData?.pages.map(({ data }) => data).flat() || [];
    const loadedPages = queryData?.pages.length || 0;

    return {
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        totalPages,
        loadedPages,
        data,
    };
};

const handleDataStructure = (queryData: CharacterData | Character) => {
    if (Array.isArray(queryData)) return null;

    return queryData;
};

export const useSingleCharacterData = () => {
    const location = useLocation();
    const data: Character = location.state?.data;

    const { id = '' } = useParams();

    const {
        isFetching,
        error,
        data: queryData,
    } = useQuery({
        queryKey: [`singleCharacter-${id}`],
        queryFn: () => retrieveSingleCharacter(id),
        enabled: !data,
    });

    const passedData = data || handleDataStructure(queryData?.data || []);

    return {
        data: passedData,
        isFetching,
        error,
    };
};
