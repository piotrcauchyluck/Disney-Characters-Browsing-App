import { render, screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

import { dataPageSizeThree } from './dummyData';

import App from '../App';

const server = setupServer(
    http.get(`https://api.disneyapi.dev/character?pageSize=3`, () => {
        return HttpResponse.json(dataPageSizeThree);
    })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('Displays all elements', () => {
    render(<App />);
    expect(screen.getByText('Home')).toBeInTheDocument();
});
