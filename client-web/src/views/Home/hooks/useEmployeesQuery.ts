import {useCallback, useState} from "react";
import {useQuery} from "@apollo/client";
import {gql} from "../../../generated";

interface Options {
    limit: number;
    startPageNo: number;
}

const GET_EMPLOYEES = gql(`#graphql
    query GetEmployees($limit: Int, $offset: Int) {
        allEmployees(limit: $limit, offset: $offset) {
            id
            first_name
            last_name
            birth_date
            department {
                id
                dept_name
            }
        }
    }`);

export const useEmployeesQuery = ({limit, startPageNo}: Options) => {
    const [page, setPage] = useState(startPageNo);
    const {loading, error, data, fetchMore} = useQuery(GET_EMPLOYEES, {
        fetchPolicy: "no-cache",
        variables: {
            limit,
            offset: page * limit,
        },
    });

    const prevPage = useCallback(async () => {
        const newPage = page - 1;
        await fetchMore({
            variables: {
                offset: newPage * limit,
            },
        });
        setPage(newPage);
    }, [page]);

    const nextPage = useCallback(async () => {
        const newPage = page + 1;
        await fetchMore({
            variables: {
                offset: newPage * limit,
            },
        });
        setPage(newPage);
    }, [page]);

    return {
        loading,
        error,
        data,
        fetchMore,
        page,
        prevPage,
        nextPage,
    };
};
