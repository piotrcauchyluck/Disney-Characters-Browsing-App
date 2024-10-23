import styled from 'styled-components';

import { Character } from '../types';

import Image from './Image';

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
    width: 70%;
`;

type CharacterContentProps = Pick<Character, 'imageUrl' | 'name'> & {
    children: JSX.Element;
};

const CharacterContent = (props: CharacterContentProps) => {
    const { name, children, imageUrl } = props;

    return (
        <StyledContainer>
            <StyledImageContainer>
                <Image imageUrl={imageUrl} />
            </StyledImageContainer>
            <StyledDescriptionContainer>
                {name}
                {children}
            </StyledDescriptionContainer>
        </StyledContainer>
    );
};

export default CharacterContent;
