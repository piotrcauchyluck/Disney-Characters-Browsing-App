import Details from './views/details/Details';
import Home from './views/home/Home';
import NoMatch from './views/noMatch/NoMatch';

export const routesConfig = [
    {
        path: '/',
        element: <Home />,
        errorElement: <NoMatch />,
    },
    {
        path: '/search',
        element: <Home />,
    },
    {
        path: '/details/:id',
        element: <Details />,
    },
];
