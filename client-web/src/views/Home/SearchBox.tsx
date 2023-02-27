import React, {useCallback} from "react";

interface Props {
    search: (searchTerm: string, limit?: number) => Promise<void>;
    searchKeyword: string;
}

const SearchBox = ({search, searchKeyword}: Props) => {
    const onSearchInputChange = useCallback(
        async (event: React.ChangeEvent<HTMLInputElement>) => {
            await search(event.target.value, 5);
        },
        []
    );

    const clear = useCallback(() => {
        search("");
    }, []);

    return (
        <div>
            <div className="col input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by name"
                    aria-label="Search employee input"
                    aria-describedby="search-employee-input"
                    onChange={onSearchInputChange}
                    value={searchKeyword}
                />
                <button
                    className="input-group-text"
                    id="basic-addon2"
                    onClick={clear}
                >
                    Clear
                </button>
            </div>
        </div>
    );
};

export default SearchBox;
