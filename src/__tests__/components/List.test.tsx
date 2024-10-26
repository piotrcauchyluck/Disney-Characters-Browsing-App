import { screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

import { searchJackSparrow, noData } from '../mockedData';
import { renderWithRouter } from '../test-utils';

import List from '../../components/List';

const server = setupServer(
    http.get(`https://api.disneyapi.dev/character?name=jack%20sparrow`, () => {
        return HttpResponse.json(searchJackSparrow);
    })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const input = 'Jack Sparrow';

test('Displays loader', () => {
    renderWithRouter(<List input={input} />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
});

test('Displays list item with provided name', async () => {
    renderWithRouter(<List input={input} />);

    expect(await screen.findByText(input)).toBeInTheDocument();
});

test('Displays summary text', async () => {
    const summaryText = 'Loaded 1/1 pages';
    renderWithRouter(<List input={input} />);

    expect(await screen.findByText(summaryText)).toBeInTheDocument();
});

test('Displays correct number of list items', async () => {
    renderWithRouter(<List input={input} />);

    expect(await screen.findAllByRole('listitem')).toHaveLength(
        searchJackSparrow.data.length
    );
});

test('Displays no data message', async () => {
    server.use(
        http.get(
            'https://api.disneyapi.dev/character?name=jack%20sparrow',
            () => {
                return HttpResponse.json(noData);
            }
        )
    );

    renderWithRouter(<List input={input} />);

    expect(await screen.findByText('No items found')).toBeInTheDocument();
});

test('Displays error message', async () => {
    server.use(
        http.get(
            'https://api.disneyapi.dev/character?name=jack%20sparrow',
            () => {
                return HttpResponse.error();
            }
        )
    );
    renderWithRouter(<List input={input} />);

    await waitFor(
        () => {
            expect(
                screen.getByText('An error occurred. Try again')
            ).toBeInTheDocument();
        },
        { timeout: 10000 }
    );
});
