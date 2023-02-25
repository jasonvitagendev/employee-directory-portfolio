import {gql} from "../../../generated";
import {useLazyQuery} from "@apollo/client";
import {useCallback, useState} from "react";

const SEARCH_EMPLOYEES_BY_NAME = gql(`#graphql
    query SearchEmployeeByFullName($fullName: String, $limit: Int = 5) {
        searchEmployeeByFullName(full_name: $fullName, limit: $limit) {
            id
            full_name
            highlight
        }
    }`);

export const useEmployeesSearch = () => {
    const [search, {loading, error, data}] = useLazyQuery(
        SEARCH_EMPLOYEES_BY_NAME
    );

    const [searchKeyword, setSearchKeyword] = useState("");

    const searchEmployees = useCallback(
        async (searchTerm: string, limit?: number) => {
            setSearchKeyword(searchTerm);
            await search({
                variables: {
                    fullName: searchTerm,
                    limit: limit || 5,
                },
            });
        },
        []
    );

    return [searchEmployees, {loading, error, data, searchKeyword}] as const;
};
