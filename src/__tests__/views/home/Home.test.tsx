import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Home from '../../../views/home/Home';

const queryClient = new QueryClient();

const Wrapper = ({ pathname }: { pathname: string }) => (
    <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={[pathname]}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Home />} />
            </Routes>
        </MemoryRouter>
    </QueryClientProvider>
);

test('Displays all elements', () => {
    render(<Wrapper pathname="/" />);

    expect(screen.getByAltText('Disney logo')).toBeInTheDocument();
    expect(
        screen.getByText('Find Your favourite Disney character')
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Character name')).toBeInTheDocument();
});

test('Shows empty input value by default', () => {
    render(<Wrapper pathname="/" />);
    const inputElement = screen.getByLabelText('Character name');

    expect(inputElement).toHaveValue('');
});

test('Reads proper value from search parameter', () => {
    render(<Wrapper pathname="/search?q=test" />);
    const inputElement = screen.getByLabelText('Character name');

    expect(inputElement).toHaveValue('test');
});
