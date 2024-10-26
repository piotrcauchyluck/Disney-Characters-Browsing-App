import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

import { detailsJackSparrow } from './mockedData';
import { mappedNames } from '../utils/mappedData';
import { routesConfig } from '../routes';

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

const Wrapper = ({ pathname }: { pathname: string }) => {
    const router = createMemoryRouter(routesConfig, {
        initialEntries: [pathname],
    });

    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    );
};

test('Displays default Home page', () => {
    render(<Wrapper pathname="/" />);

    expect(screen.getByAltText('Disney logo')).toBeInTheDocument();
    expect(
        screen.getByText('Find Your favourite Disney character')
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Character name')).toBeInTheDocument();
});

test('Displays Home page with search params', () => {
    render(<Wrapper pathname="/search?q=test" />);

    expect(screen.getByAltText('Disney logo')).toBeInTheDocument();
    expect(
        screen.getByText('Find Your favourite Disney character')
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Character name')).toBeInTheDocument();
});

test('Displays Details page', async () => {
    render(<Wrapper pathname="/details/6322" />);

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

test('Displays NoMatch page', () => {
    const examplePathname = '/example';
    render(<Wrapper pathname={examplePathname} />);

    expect(
        screen.getByText(`Sorry, "${examplePathname}" page does not exist`)
    ).toBeInTheDocument();
});
