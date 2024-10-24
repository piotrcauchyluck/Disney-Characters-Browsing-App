import styled from 'styled-components';
import type { Character } from '../types/data';

type ImageProps = Pick<Character, 'imageUrl' | 'name'>;
type StyledImageProps = Pick<ImageProps, 'imageUrl'> & { alt: string };

const StyledImage = styled.image<StyledImageProps>`
    background-image: url(${({ imageUrl }) => imageUrl});
    display: block;
    width: 100%;
    height: 100%;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
`;

const Image = (props: ImageProps) => {
    const { imageUrl, name } = props;

    return <StyledImage imageUrl={imageUrl} alt={name} />;
};

export default Image;
