import { useLocation } from 'react-router-dom';

const NoMatch = () => {
    const { pathname } = useLocation();

    return <div>{`Sorry, "${pathname}" page does not exist`}</div>;
};

export default NoMatch;
