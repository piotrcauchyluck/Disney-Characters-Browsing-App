import { screen } from '@testing-library/react';

import { searchJackSparrow } from '../mockedData';
import { renderWithRouter } from '../test-utils';

import ListItem from '../../components/ListItem';

test('Displays the loader for newly fetching data chunk', () => {
    renderWithRouter(
        <ListItem
            index={searchJackSparrow.data.length}
            style={{}}
            data={searchJackSparrow.data}
            hasNextPage
        />
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
});

test('Displays the name', () => {
    renderWithRouter(
        <ListItem
            index={1}
            style={{}}
            data={searchJackSparrow.data}
            hasNextPage={false}
        />
    );

    expect(
        screen.getByText(searchJackSparrow.data[1].name)
    ).toBeInTheDocument();
});
