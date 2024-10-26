import { render, screen } from '@testing-library/react';

import { sampleCharacter } from '../mockedData';
import { mappedNames } from '../../utils/mappedData';

import Character from '../../components/Character';

test('Displays all elements', () => {
    render(<Character data={sampleCharacter} />);

    Object.values(mappedNames).forEach((name) => {
        expect(screen.getByText(name)).toBeInTheDocument();
    });
    expect(screen.getByAltText(sampleCharacter.name)).toBeInTheDocument();
    expect(screen.getByText(sampleCharacter.name)).toBeInTheDocument();
});
