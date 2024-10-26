import { Link } from 'react-router-dom';

import type { ListChildComponentProps } from 'react-window';

import { colors, ListItem, ListItemText, styled } from '@mui/material';
import Loader from './Loader';

const StyledLink = styled(Link)`
    color: ${colors.grey[900]};
    text-decoration: none;
    padding: 5px;
    box-sizing: border-box;
    margin: 0 5px;
    width: 100%;
    &:hover {
        background-color: ${colors.grey[200]};
    }
`;

type ListItemProps = ListChildComponentProps & { hasNextPage: boolean };

const CustomListItem = (props: ListItemProps) => {
    const { index, style, data: entireData, hasNextPage } = props;

    const isItemLoaded = !hasNextPage || index < entireData.length;
    const data = entireData[index];

    return (
        <ListItem style={style} key={index} component="div" disablePadding>
            {isItemLoaded ? (
                <StyledLink to={`/details/${data._id}`} state={{ data }}>
                    <ListItemText primary={`${data.name}`} />
                </StyledLink>
            ) : (
                <Loader size="20px" />
            )}
        </ListItem>
    );
};

export default CustomListItem;
