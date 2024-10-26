import { mappedNames } from '../utils/mappedData';
import { mobileThreshold, size } from '../utils/constants';
import { useIsMobile } from '../hooks/common';

import type { Character } from '../types/data';

import { Box, colors, styled, Typography } from '@mui/material';
import Image from './Image';

const StyledContainer = styled(Box)`
    width: min(90%, ${size.defaultListWidth}px);
    display: flex;
    margin: 0 auto;
    padding-top: 20px;
    gap: 30px;
    justify-content: center;
`;

const StyledName = styled(Typography)`
    color: ${colors.orange[700]};
`;

const StyledDescription = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-left: 30px;
    border-left: 2px solid ${colors.grey[300]};
    @media (max-width: ${mobileThreshold}px) {
        border-left: none;
        padding-left: 0;
    }

    .main-list {
        padding-inline-start: 0;
        list-style-type: none;
        @media (max-width: ${mobileThreshold}px) {
            font-size: 12px;
        }
    }
`;

const StyledImage = styled(Image)`
    border-radius: 10px;
    height: fit-content;
`;

const StyledMobileImage = styled(StyledImage)`
    margin: 0 auto;
`;

interface CharacterProps {
    data: Character;
}

const CharacterDescription = ({ data }: CharacterProps) => (
    <ul className="main-list">
        {Object.entries(data).map(([info, InfoValue]) => {
            if (!Array.isArray(InfoValue)) return;

            return (
                <li key={info}>
                    {mappedNames[info as keyof typeof mappedNames]}
                    <ul>
                        {InfoValue.map((value) => (
                            <li key={value}>{value}</li>
                        ))}
                    </ul>
                </li>
            );
        })}
    </ul>
);

const Character = (props: CharacterProps) => {
    const { data } = props;
    const { name, imageUrl } = data;

    const isMobile = useIsMobile();

    return (
        <StyledContainer>
            {!isMobile && <StyledImage src={imageUrl} alt={name} />}
            <StyledDescription>
                <StyledName variant="h5">{name}</StyledName>
                {isMobile && <StyledMobileImage src={imageUrl} alt={name} />}
                <CharacterDescription {...props} />
            </StyledDescription>
        </StyledContainer>
    );
};

export default Character;
