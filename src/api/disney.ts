import axios from 'axios';
import type { DisneyData, RetrieveCharactersProps } from '../types';

const baseUrl = 'https://api.disneyapi.dev/character';

export const retrieveCharacters = async (
    props: RetrieveCharactersProps
): Promise<DisneyData> => {
    const { queryKey } = props;
    const [, { searchInput }] = queryKey;

    const response = await axios.get(
        `${baseUrl}?name=${encodeURIComponent(searchInput)}`
    );
    return response.data;
};
