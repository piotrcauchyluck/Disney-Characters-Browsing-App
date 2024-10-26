import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen, waitFor } from '@testing-library/react';

import { detailsJackSparrow, noData } from '../../mockedData';
import { mappedNames } from '../../../utils/mappedData';

import Details from '../../../views/details/Details';

const detailsURL = 'https://api.disneyapi.dev/character/6322';
const server = setupServer(
    http.get(detailsURL, () => {
        return HttpResponse.json(detailsJackSparrow);
    })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const queryClient = new QueryClient();

const Wrapper = () => (
    <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={[`/details/6322`]}>
            <Routes>
                <Route path="/details/:id" element={<Details />} />
            </Routes>
        </MemoryRouter>
    </QueryClientProvider>
);

test('Displays all elements when data is loaded', async () => {
    render(<Wrapper />);

    await waitFor(() => {
        Object.values(mappedNames).forEach((name) => {
            expect(screen.getByText(name)).toBeInTheDocument();
        });
        expect(
            screen.getByAltText(detailsJackSparrow.data.name)
        ).toBeInTheDocument();
        expect(
            screen.getByText(detailsJackSparrow.data.name)
        ).toBeInTheDocument();
    });
});

test('Displays no data message', async () => {
    server.use(
        http.get('https://api.disneyapi.dev/character/6322', () => {
            return HttpResponse.json(noData);
        })
    );

    render(<Wrapper />);

    await waitFor(() => {
        expect(
            screen.getByText('There is no data for the specifiec character')
        ).toBeInTheDocument();
    });
});

test('Displays loader before data is loaded', async () => {
    render(<Wrapper />);
    await waitFor(() => {
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
        expect(
            screen.getByAltText(detailsJackSparrow.data.name)
        ).toBeInTheDocument();
    });
});

test('Displays error message', async () => {
    server.use(
        http.get('https://api.disneyapi.dev/character/6322', () => {
            return HttpResponse.error();
        })
    );

    render(<Wrapper />);

    await waitFor(
        () => {
            expect(
                screen.getByText(
                    'An error has occurred: AxiosError: Network Error'
                )
            ).toBeInTheDocument();
        },
        { timeout: 10000 }
    );
});
