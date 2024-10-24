import { useLocation } from 'react-router-dom';

import Message from '../../components/Message';

const NoMatch = () => {
    const { pathname } = useLocation();

    return <Message text={`Sorry, "${pathname}" page does not exist`} />;
};

export default NoMatch;
