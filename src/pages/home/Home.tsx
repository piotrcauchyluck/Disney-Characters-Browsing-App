import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';

import { retrieveCharacters } from '../../api/disney';
import { colors } from '../../theme';
import { useDebouncedValue } from '../../hooks';

import List from './List';

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: min(90%, 800px);
    margin: 0 auto;
`;

const StyledInput = styled.input`
    line-height: 30px;
    vertical-align: middle;
    padding: 5px 10px;
    box-sizing: border-box;
    border: 2px solid ${colors.orangeMain};
    border-radius: 10px;
`;

const Home = () => {
    const [searchInput, setSearchInput] = useState('');

    const debouncedSearchInput = useDebouncedValue(searchInput, 2000);

    const { data, error, isLoading } = useQuery({
        queryKey: ['characters', { searchInput: debouncedSearchInput }],
        queryFn: retrieveCharacters,
        enabled: !!debouncedSearchInput,
    });

    const charactersData = data?.data || [];

    return (
        <StyledContainer>
            <label htmlFor="search">Search Disney characters</label>
            <StyledInput
                id="search"
                type="text"
                placeholder="Search..."
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
            />

            <List data={charactersData} isLoading={isLoading} error={error} />
        </StyledContainer>
    );
};

export default Home;
