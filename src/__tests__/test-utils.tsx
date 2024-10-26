import React, { PropsWithChildren } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export function renderWithRouter(
    ui: React.ReactElement,
    renderOptions: RenderOptions = {}
) {
    const queryClient = new QueryClient();

    const Wrapper = ({ children }: PropsWithChildren) => (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={children} />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );

    return {
        ...render(ui, { wrapper: Wrapper, ...renderOptions }),
    };
}
