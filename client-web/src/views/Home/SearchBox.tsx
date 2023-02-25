import React, {useCallback} from "react";

interface Props {
    search: (searchTerm: string, limit?: number) => Promise<void>;
}

const SearchBox = ({search}: Props) => {
    const onSearchInputChange = useCallback(
        async (event: React.ChangeEvent<HTMLInputElement>) => {
            await search(event.target.value, 5);
        },
        []
    );

    return (
        <div>
            <input
                type="text"
                placeholder="search by name"
                onChange={onSearchInputChange}
            />
        </div>
    );
};

export default SearchBox;
