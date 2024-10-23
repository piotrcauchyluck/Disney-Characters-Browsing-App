import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Home from './pages/home/Home';
import Details from './pages/details/Details';
import NoMatch from './pages/noMatch/NoMatch';

import './App.css';

const queryClient = new QueryClient();

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route index element={<Home />} />
                    <Route path="details" element={<Details />} />
                    <Route path="*" element={<NoMatch />} />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
};

export default App;
