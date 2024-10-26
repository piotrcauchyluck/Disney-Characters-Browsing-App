import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import NoMatch from '../../../views/noMatch/NoMatch';

const examplePathname = '/someRandomText';

const Wrapper = () => (
    <MemoryRouter initialEntries={[examplePathname]}>
        <Routes>
            <Route path="*" element={<NoMatch />} />
        </Routes>
    </MemoryRouter>
);

test('Displays proper message', () => {
    render(<Wrapper />);
    expect(
        screen.getByText(`Sorry, "${examplePathname}" page does not exist`)
    ).toBeInTheDocument();
});
