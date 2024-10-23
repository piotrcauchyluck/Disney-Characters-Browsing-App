import { useCharacterData } from '../../hooks';

import { ListItem, ListItemButton, ListItemText, styled } from '@mui/material';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import Loader from '../../components/Loader';

const StyledFixedSizeList = styled(FixedSizeList)`
    max-width: 100%;
    max-height: calc(100vh - 300px);
`;

interface ListProps {
    input: string;
}

const List = (props: ListProps) => {
    const { input } = props;

    const {
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        totalPages,
        loadedPages,
        data,
    } = useCharacterData(input);

    if (isFetching && !isFetchingNextPage) return <Loader />;
    if (error) return <div>An error occurred: {error.message}</div>;
    if (input && !totalPages) return <div>No items found</div>;

    const isItemLoaded = (index: number) => !hasNextPage || index < data.length;

    function renderRow(props: ListChildComponentProps) {
        const { index, style } = props;

        return (
            <ListItem style={style} key={index} component="div" disablePadding>
                {isItemLoaded(index) ? (
                    <ListItemButton>
                        <ListItemText primary={`${data[index]?.name}`} />
                    </ListItemButton>
                ) : (
                    <Loader size="20px" />
                )}
            </ListItem>
        );
    }

    const itemCount = data.length + (hasNextPage ? 1 : 0);

    return (
        <>
            {input && (
                <div>
                    Loaded {loadedPages}/{totalPages} pages
                </div>
            )}
            <InfiniteLoader
                isItemLoaded={(index) => index < data.length}
                itemCount={itemCount}
                loadMoreItems={() => {
                    if (!isFetchingNextPage) {
                        fetchNextPage();
                    }
                }}
            >
                {({ onItemsRendered, ref }) => (
                    <StyledFixedSizeList
                        height={2000}
                        width={800}
                        itemSize={48}
                        itemCount={itemCount}
                        onItemsRendered={onItemsRendered}
                        ref={ref}
                    >
                        {renderRow}
                    </StyledFixedSizeList>
                )}
            </InfiniteLoader>
        </>
    );
};

export default List;
