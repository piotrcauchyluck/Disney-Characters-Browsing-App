import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Home from './views/home/Home';
import Details from './views/details/Details';
import NoMatch from './views/noMatch/NoMatch';

import './App.css';

const queryClient = new QueryClient();

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route index element={<Home />} />
                    <Route path="details/:id" element={<Details />} />
                    <Route path="*" element={<NoMatch />} />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
};

export default App;
