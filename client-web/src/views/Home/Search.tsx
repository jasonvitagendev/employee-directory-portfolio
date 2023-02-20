import React, {useCallback} from "react";
import {useLazyQuery} from "@apollo/client";
import {gql} from "../../generated";

const SEARCH_EMPLOYEES_BY_NAME = gql(`#graphql
query SearchEmployeeByFullName($fullName: String, $limit: Int = 5) {
    searchEmployeeByFullName(full_name: $fullName, limit: $limit) {
        id
        full_name
        highlight
    }
}
`);

const SearchBox = () => {
    const [search, {loading, error, data}] = useLazyQuery(
        SEARCH_EMPLOYEES_BY_NAME
    );

    const onSearchInputChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            console.log(event.target.value);
            search({
                variables: {
                    fullName: event.target.value,
                    limit: 5,
                },
            });
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
