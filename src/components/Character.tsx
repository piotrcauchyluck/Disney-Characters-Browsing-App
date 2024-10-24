import styled from 'styled-components';

import type { Character } from '../types/data';
import { mappedNames } from '../utils/mappedData';

import Image from './Image';
import { Typography } from '@mui/material';

const StyledContainer = styled.div`
    width: 100%;
    display: flex;
`;

const StyledImageContainer = styled.div`
    width: 30%;
    border-right: 2px solid black;
    box-sizing: border-box;
`;

const StyledDescriptionContainer = styled.div`
    padding: 20px;
    width: 70%;
`;

const StyledName = styled(Typography)`
    margin-bottom: 20px;
    color: orange;
`;

type CharacterProps = { data: Character };

const CharacterDescription = ({ data }: CharacterProps) => (
    <ul>
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

    return (
        <StyledContainer>
            <StyledImageContainer>
                <Image src={imageUrl} alt={name} />
            </StyledImageContainer>
            <StyledDescriptionContainer>
                <StyledName variant="h4" color="textSecondary">
                    {name}
                </StyledName>
                <CharacterDescription {...props} />
            </StyledDescriptionContainer>
        </StyledContainer>
    );
};

export default Character;
