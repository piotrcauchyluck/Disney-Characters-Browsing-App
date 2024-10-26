import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

import {
    createNextPageParam,
    getInitialPageParam,
    retrieveCharacters,
    retrieveSingleCharacter,
} from '../../services/characters';
import { detailsJackSparrow, noData, searchJackSparrow } from '../mockedData';

const searchURL = 'https://api.disneyapi.dev/character?name=jack%20sparrow';
const detailsURL = 'https://api.disneyapi.dev/character/6322';
const server = setupServer(
    ...[
        http.get(searchURL, () => {
            return HttpResponse.json(searchJackSparrow);
        }),
        http.get(detailsURL, () => {
            return HttpResponse.json(detailsJackSparrow);
        }),
    ]
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('getInitialPageParam', () => {
    test('Returns proper value', () => {
        expect(getInitialPageParam('Jack')).toBe(
            'https://api.disneyapi.dev/character?name=Jack'
        );
        expect(getInitialPageParam('Jack Sparrow')).toBe(
            'https://api.disneyapi.dev/character?name=Jack%20Sparrow'
        );
    });
});

describe('createNextPageParam', () => {
    test('Returns proper value', () => {
        expect(
            createNextPageParam(
                'http://api.disneyapi.dev/character?page=2&pageSize=50',
                'Jack'
            )
        ).toBe(
            'http://api.disneyapi.dev/character?page=2&pageSize=50&name=Jack'
        );
        expect(
            createNextPageParam(
                'http://api.disneyapi.dev/character?page=2&pageSize=50',
                'Jack Sparrow'
            )
        ).toBe(
            'http://api.disneyapi.dev/character?page=2&pageSize=50&name=Jack%20Sparrow'
        );
    });
});

describe('retrieveCharacters', () => {
    test('Returns proper value', async () => {
        expect(
            await retrieveCharacters({ pageParam: searchURL })
        ).toStrictEqual(searchJackSparrow);
        expect(await retrieveCharacters({ pageParam: '' })).toStrictEqual(
            noData
        );
    });
});

describe('retrieveSingleCharacter', () => {
    test('Returns proper value', async () => {
        expect(await retrieveSingleCharacter('6322')).toStrictEqual(
            detailsJackSparrow
        );
    });
});
