import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Details from './pages/details/Details';
import NoMatch from './pages/noMatch/NoMatch';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route index element={<Home />} />
                <Route path="details" element={<Details />} />
                <Route path="*" element={<NoMatch />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
