import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { retrieveCharacters } from '../../api/disney';
import { colors } from '../../theme';
import { useDebouncedValue } from '../../hooks';
const Home = () => {
    const [searchInput, setSearchInput] = useState('');

    const debouncedSearchInput = useDebouncedValue(searchInput, 2000);

    const { data, error, isLoading } = useQuery({
        queryKey: ['characters', { searchInput: debouncedSearchInput }],
        queryFn: retrieveCharacters,
        enabled: !!debouncedSearchInput,
    });

        return <div>Home</div>;
};

export default Home;
