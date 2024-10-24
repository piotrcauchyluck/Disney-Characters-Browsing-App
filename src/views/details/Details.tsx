import { useLocation, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import type { Character } from '../../types/data';

const Details = () => {
    const location = useLocation();
    const data: Character = location.state?.data || null;

    const { id } = useParams();

    const {
        isFetching,
        error,
        data: queryData,
    } = useQuery({
        queryKey: [`singleCharacter-${id}`],
        queryFn: () =>
            fetch(`https://api.disneyapi.dev/character/${id}`).then((res) =>
                res.json()
            ),
        enabled: !data,
    });

    if (isFetching) return 'Loading...';

    if (error) return 'An error has occurred: ' + error.message;

    if (data) {
        return <div>I'm from data: {data.name}</div>;
    } else {
        return <div>Not from data: {queryData.data.name}</div>;
    }
};

export default Details;
