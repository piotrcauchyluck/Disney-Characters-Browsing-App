import styled from 'styled-components';
import { Character } from '../types';

type ImageProps = Pick<Character, 'imageUrl'>;

const StyledImage = styled.image<ImageProps>`
    background-image: url(${({ imageUrl }) => imageUrl});
    display: block;
    width: 100%;
    height: 100%;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
`;

const Image = (props: ImageProps) => {
    const { imageUrl } = props;

    return <StyledImage imageUrl={imageUrl} />;
};

export default Image;
