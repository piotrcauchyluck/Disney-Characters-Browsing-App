import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { useSingleCharacterData } from '../../hooks/services';

const Details = () => {
    const { data, isFetching, error } = useSingleCharacterData();

    if (isFetching) return <Loader size="30px" />;

    if (error) return <Message text={`An error has occurred: ${error}`} />;

    if (!data)
        return (
            <Message text={`There is no data for the specifiec character`} />
        );

    return <div>My name is {data.name}</div>;
};

export default Details;
