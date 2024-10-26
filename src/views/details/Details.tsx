import { useSingleCharacterData } from '../../hooks/services';

import Character from '../../components/Character';
import Loader from '../../components/Loader';
import Message from '../../components/Message';

const Details = () => {
    const { data, isFetching, error } = useSingleCharacterData();

    if (isFetching) return <Loader size="30px" />;

    if (error) return <Message text={`An error has occurred: ${error}`} />;

    if (!data)
        return (
            <Message text={`There is no data for the specifiec character`} />
        );

    return <Character data={data} />;
};

export default Details;
