import { useState } from 'react';
import { Container, styled } from '@mui/material';

import { useDebouncedValue } from '../../hooks';

import List from './List';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const StyledContainer = styled(Container)`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: min(90%, 800px);
`;

const Home = () => {
    const [searchInput, setSearchInput] = useState('');

    const debouncedSearchInput = useDebouncedValue(searchInput, 1000);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    };

    return (
        <StyledContainer>
            <Box component="form" noValidate autoComplete="off">
                <TextField
                    id="search"
                    type="text"
                    label="Character name"
                    variant="outlined"
                    fullWidth
                    size="small"
                    value={searchInput}
                    onChange={(event) => setSearchInput(event.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </Box>
            <List input={debouncedSearchInput} />
        </StyledContainer>
    );
};

export default Home;
