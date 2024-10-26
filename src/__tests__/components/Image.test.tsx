import { fireEvent, render, screen } from '@testing-library/react';

import { sampleCharacter } from '../mockedData';

import Image from '../../components/Image';

test('Displays the hidden image when loading, after being loaded makes it visible', async () => {
    const exampleAltText = 'Test';
    render(<Image alt={exampleAltText} src={sampleCharacter.imageUrl} />);
    const imageElement = screen.getByAltText(exampleAltText);

    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveStyle({
        display: 'none',
    });

    fireEvent.load(imageElement);

    expect(imageElement).toHaveStyle({
        display: 'block',
    });
});

test('Displays the loader and hides it when picture is loaded', async () => {
    const exampleAltText = 'Test';
    render(<Image alt={exampleAltText} src={sampleCharacter.imageUrl} />);
    const imageElement = screen.getByAltText(exampleAltText);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();

    fireEvent.load(imageElement);

    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
});
