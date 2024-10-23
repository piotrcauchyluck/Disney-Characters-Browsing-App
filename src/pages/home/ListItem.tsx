import styled from 'styled-components';

import type { Character } from '../../types';
import { colors } from '../../theme';

import CharacterContent from '../../components/Character';

const StyledContainer = styled.div`
    display: flex;
    height: 100px;
    border: 1px solid ${colors.orangeMain};
    box-sizing: border-box;
`;

type ListItemProps = Pick<Character, 'films' | 'imageUrl' | 'name'>;

const ListItem = (props: ListItemProps) => {
    const { name, imageUrl, films } = props;

    const Content = () => (
        <ul>
            {films.map((film, index) => (
                <li key={index}>{film}</li>
            ))}
        </ul>
    );

    return (
        <StyledContainer>
            <CharacterContent name={name} imageUrl={imageUrl}>
                <Content />
            </CharacterContent>
        </StyledContainer>
    );
};

export default ListItem;
