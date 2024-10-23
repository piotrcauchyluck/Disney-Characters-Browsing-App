import styled from 'styled-components';

import type { CharactersData } from '../../types';

import ListItem from './ListItem';

interface ListProps {
    data: CharactersData;
    isLoading: boolean;
    error: Error | null;
}

const StyledContainer = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 10px;
    list-style-type: none;
    padding: 0;
    margin: 0;
`;

const List = (props: ListProps) => {
    const { data, isLoading, error } = props;

    if (isLoading) return <div>Fetching characters...</div>;
    if (error) return <div>An error occurred: {error.message}</div>;

    return (
        <StyledContainer>
            {data.map(({ name, _id, films, imageUrl }) => (
                <li key={_id}>
                    <ListItem name={name} films={films} imageUrl={imageUrl} />
                </li>
            ))}
        </StyledContainer>
    );
};

export default List;
