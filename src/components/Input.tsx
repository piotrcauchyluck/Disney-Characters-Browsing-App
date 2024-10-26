import { type ChangeEvent, type KeyboardEvent, type ReactNode } from 'react';

import { useDebouncedValue } from '../hooks/common';
import { useCustomNavigation, useSearchInput } from '../hooks/homeView';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

interface ChildrenProp {
    children(input: string): ReactNode;
}
type InputProps = ChildrenProp & Record<string, unknown>;

const Input = (props: InputProps) => {
    const { children, ...restProps } = props;

    const [searchInput, setSearchInput] = useSearchInput();
    const debouncedSearchInput = useDebouncedValue(searchInput, 1000);

    useCustomNavigation(debouncedSearchInput);

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setSearchInput(value);
    };

    return (
        <>
            <Box component="form" noValidate autoComplete="off">
                <TextField
                    id="search"
                    type="text"
                    label="Character name"
                    variant="outlined"
                    fullWidth
                    size="small"
                    value={searchInput}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    {...restProps}
                />
            </Box>
            {children(debouncedSearchInput)}
        </>
    );
};

export default Input;
