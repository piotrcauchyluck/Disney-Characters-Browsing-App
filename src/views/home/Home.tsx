import { useNavigate } from 'react-router-dom';

import { useDebouncedValue } from '../../hooks/common';
import { useSearchInput } from '../../hooks/homeView';
import { mobileThreshold, size } from '../../utils/constants';

import { Container, styled, Typography } from '@mui/material';
import List from '../../components/List';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Image from '../../components/Image';
import DisneyLogo from '../../assets/disney_logo.png';

const StyledContainer = styled(Container)`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: min(90%, ${size.defaultListWidth}px);
`;

const StyledLogo = styled(Image)`
    width: 200px;
    height: 85px;
    margin: 0 auto;
    @media (max-width: ${mobileThreshold}px) {
        width: 100px;
        height: 43px;
    }
`;

const Home = () => {
    const [searchInput, setSearchInput] = useSearchInput();
    const debouncedSearchInput = useDebouncedValue(searchInput, 1000);
    const navigate = useNavigate();

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
            <StyledLogo alt="Disney logo" src={DisneyLogo} />
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
                    value={searchInput}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />
            </Box>
            <List input={debouncedSearchInput} />
        </StyledContainer>
    );
};

export default Home;
