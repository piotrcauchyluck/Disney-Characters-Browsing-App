import { Typography } from '@mui/material';

const Message = (props: { text: string }) => (
    <Typography variant="subtitle2">{props.text}</Typography>
);

export default Message;
