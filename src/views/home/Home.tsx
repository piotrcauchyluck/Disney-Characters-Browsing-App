import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useDebouncedValue } from '../../hooks/common';

import { Container, styled, Typography } from '@mui/material';
import List from '../../components/List';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import DisneyLogo from '../../assets/disney_logo.png';

const StyledContainer = styled(Container)`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: min(90%, 800px);
`;

const StyledLogo = styled(Box)`
    background-image: url(${DisneyLogo});
    width: 200px;
    height: 85px;
    background-size: cover;
    margin: 0 auto;
    @media (max-width: 768px) {
        width: 100px;
        height: 43px;
    }
`;

const Home = () => {
    const [searchInput, setSearchInput] = useState('');
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('q') || '';

    const debouncedSearchInput = useDebouncedValue(searchInput, 1000);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        navigate({
            pathname: '/search',
            search: new URLSearchParams({
                q: value,
            }).toString(),
        });
        setSearchInput(value);
    };

    return (
        <StyledContainer>
            <StyledLogo />
            <Typography variant="h6" align="center">
                Find Your favourite Disney character
            </Typography>
            <Box component="form" noValidate autoComplete="off">
                <TextField
                    id="search"
                    type="text"
                    label="Character name"
                    variant="outlined"
                    fullWidth
                    size="small"
                    value={searchQuery || searchInput}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />
            </Box>
            <List input={debouncedSearchInput || searchQuery} />
        </StyledContainer>
    );
};

export default Home;
