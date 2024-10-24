import axios from 'axios';
import type { RetrieveCharactersProps } from '../types/services';
import type { DisneyData } from '../types/data';

const baseUrl = 'https://api.disneyapi.dev/character';

export const getInitialPageParam = (input: string) =>
    `${baseUrl}?name=${encodeURIComponent(input)}`;

export const createNextPageParam = (nextPage: string, input: string) =>
    `${nextPage}&name=${encodeURIComponent(input)}`;

export const retrieveCharacters = async (
    props: RetrieveCharactersProps
): Promise<DisneyData> => {
    const { pageParam } = props;

    if (pageParam) {
        const response = await axios.get(pageParam);

        return response.data;
    }

    return {
        data: [],
        info: {
            count: 0,
            totalPages: 0,
            previousPage: null,
            nextPage: null,
        },
    };
};

export const retrieveSingleCharacter = async (id: string) => {
    const response = await axios.get(`${baseUrl}/${id}`);

    return response.data;
};
