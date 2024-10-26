import { render, screen } from '@testing-library/react';

import Loader from '../../components/Loader';

test('Displays the loader', () => {
    render(<Loader />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
});
