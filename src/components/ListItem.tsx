import { Link } from 'react-router-dom';
import { ListItem, ListItemButton, ListItemText, styled } from '@mui/material';
import Loader from './Loader';

import { ListChildComponentProps } from 'react-window';

const StyledLink = styled(Link)`
    color: black;
`;

type ListItemProps = ListChildComponentProps & { hasNextPage: boolean };

const CustomListItem = (props: ListItemProps) => {
    const { index, style, data: entireData, hasNextPage } = props;

    console.log(props);

    const isItemLoaded = !hasNextPage || index < entireData.length;
    const data = entireData[index];

    return (
        <StyledLink
            to={isItemLoaded ? `/details/${data._id}` : ''}
            state={{ data }}
        >
            <ListItem style={style} key={index} component="div" disablePadding>
                {isItemLoaded ? (
                    <ListItemButton>
                        <ListItemText primary={`${data.name}`} />
                    </ListItemButton>
                ) : (
                    <Loader size="20px" />
                )}
            </ListItem>
        </StyledLink>
    );
};

export default CustomListItem;
