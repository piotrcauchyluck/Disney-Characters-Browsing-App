import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import { renderWithRouter } from '../test-utils';

import Input from '../../components/Input';

test('Displays input component', () => {
    renderWithRouter(<Input>{() => <div></div>}</Input>);

    expect(screen.getByLabelText('Character name')).toBeInTheDocument();
});

test('Renders proper children', () => {
    const exampleText = 'Test';
    renderWithRouter(<Input>{() => <div>{exampleText}</div>}</Input>);

    expect(screen.getByText(exampleText)).toBeInTheDocument();
});

test('Changes the value properly', async () => {
    const newValue = 'Hello';
    renderWithRouter(<Input>{() => <div></div>}</Input>);
    const inputElement = screen.getByLabelText('Character name');

    userEvent.type(inputElement, newValue);

    await waitFor(() => {
        expect(inputElement).toHaveValue(newValue);
    });
});

test('Does not redirect after pressing [Enter]', async () => {
    const newValue = 'Hello';
    renderWithRouter(<Input>{() => <div></div>}</Input>);
    const inputElement = screen.getByLabelText('Character name');

    userEvent.type(inputElement, `${newValue}{enter}`);

    await waitFor(() => {
        expect(inputElement).toHaveValue(newValue);
    });
});

test('Reads the URL address correctly', () => {
    const input = 'test';
    render(
        <MemoryRouter initialEntries={[`/search?q=${input}`]}>
            <Routes>
                <Route
                    path="/search"
                    element={<Input>{() => <div></div>}</Input>}
                />
            </Routes>
        </MemoryRouter>
    );

    expect(screen.getByLabelText('Character name')).toHaveValue(input);
});
