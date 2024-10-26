import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const useSearchInput = (): [
    string,
    React.Dispatch<React.SetStateAction<string>>,
] => {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('q') || '';
    const [searchInput, setSearchInput] = useState(searchQuery);

    useEffect(() => {
        setSearchInput(searchQuery);
    }, [searchQuery]);

    return [searchInput, setSearchInput];
};

export const useCustomNavigation = (input: string) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (input) {
            navigate({
                pathname: '/search',
                search: new URLSearchParams({
                    q: input,
                }).toString(),
            });
        } else {
            navigate({
                pathname: '/',
            });
        }
    }, [input, navigate]);
};
