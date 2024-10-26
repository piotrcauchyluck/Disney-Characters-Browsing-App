import { mobileThreshold, size } from '../../utils/constants';

import { Container, styled, Typography } from '@mui/material';
import List from '../../components/List';
import Image from '../../components/Image';
import Input from '../../components/Input';
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
    return (
        <StyledContainer>
            <StyledLogo alt="Disney logo" src={DisneyLogo} />
            <Typography variant="h6" align="center">
                Find Your favourite Disney character
            </Typography>
            <Input>{(value) => <List input={value} />}</Input>
        </StyledContainer>
    );
};

export default Home;
