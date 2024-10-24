import { useCharacterData } from '../hooks/services';
import { useWindowDimensions } from '../hooks/common';

import { FixedSizeList } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import { styled } from '@mui/material';
import Loader from './Loader';
import Message from './Message';
import CustomListItem from './ListItem';

const StyledFixedSizeList = styled(FixedSizeList)`
    max-width: 100%;
    max-height: calc(100vh - 300px);

    ::-webkit-scrollbar {
        width: 12px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px grey;
        border-radius: 10px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #3b3b35;
        border-radius: 10px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #6e6e62;
    }
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

    const { height } = useWindowDimensions();

    if (isFetching && !isFetchingNextPage) return <Loader />;
    if (error) return <Message text="An error occurred. Try again" />;
    if (input && !totalPages) return <Message text="No items found" />;

    const dataLength = data.length;
    const itemCount = dataLength + (hasNextPage ? 1 : 0);

    return (
        <>
            {input && (
                <Message text={`Loaded ${loadedPages}/${totalPages} pages`} />
            )}
            <InfiniteLoader
                isItemLoaded={(index) => index < dataLength}
                itemCount={itemCount}
                loadMoreItems={() => {
                    if (!isFetchingNextPage) {
                        fetchNextPage();
                    }
                }}
            >
                {({ onItemsRendered, ref }) => (
                    <StyledFixedSizeList
                        height={height - 300}
                        width={800}
                        itemSize={48}
                        itemCount={itemCount}
                        onItemsRendered={onItemsRendered}
                        ref={ref}
                        itemData={data}
                    >
                        {(props) => (
                            <CustomListItem
                                hasNextPage={hasNextPage}
                                {...props}
                            />
                        )}
                    </StyledFixedSizeList>
                )}
            </InfiniteLoader>
        </>
    );
};

export default List;
