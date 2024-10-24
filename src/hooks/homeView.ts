import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

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
