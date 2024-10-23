import axios from 'axios';
import type { DisneyData, RetrieveCharactersProps } from '../types';

export const baseUrl = 'https://api.disneyapi.dev/character';

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
