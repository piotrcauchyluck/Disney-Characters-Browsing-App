import { render, screen } from '@testing-library/react';

import Message from '../../components/Message';

test('Displays the correct text', () => {
    const exampleText = 'Test';
    render(<Message text={exampleText} />);

    expect(screen.getByText(exampleText)).toBeInTheDocument();
});
