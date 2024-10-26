import { screen } from '@testing-library/react';

import { dataJackSparrow } from '../mockedData';
import { renderWithRouter } from '../test-utils';

import ListItem from '../../components/ListItem';

test('Displays the loader for newly fetching data chunk', () => {
    renderWithRouter(
        <ListItem
            index={dataJackSparrow.data.length}
            style={{}}
            data={dataJackSparrow.data}
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
            data={dataJackSparrow.data}
            hasNextPage={false}
        />
    );

    expect(screen.getByText(dataJackSparrow.data[1].name)).toBeInTheDocument();
});
