import { Box } from '@mui/material';

type ImageProps = Record<string, unknown>;

const Image = (props: ImageProps) => {
    return <Box component="img" {...props} />;
};

export default Image;
