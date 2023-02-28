import {useCallback, useState} from "react";
import {useLazyQuery} from "@apollo/client";
import {gql} from "../generated";

interface Options {
    limit: number;
    startPageNo: number;
    id?: string;
}

const GET_EMPLOYEES = gql(`#graphql
query GetEmployees($limit: Int, $offset: Int, $id: String) {
    allEmployees(limit: $limit, offset: $offset, id: $id) {
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

export const useEmployeesQuery = ({limit, startPageNo, id}: Options) => {
    const [page, setPage] = useState(startPageNo);
    const [getEmployees, {loading, error, data}] = useLazyQuery(GET_EMPLOYEES, {
        fetchPolicy: "no-cache",
        variables: {
            limit,
            offset: page * limit,
            id,
        },
    });

    const prevPage = useCallback(async () => {
        const newPage = page - 1;
        await getEmployees({
            variables: {
                limit,
                offset: newPage * limit,
                id: undefined,
            },
        });
        setPage(newPage);
    }, [page]);

    const nextPage = useCallback(async () => {
        const newPage = page + 1;
        await getEmployees({
            variables: {
                limit,
                offset: newPage * limit,
                id: undefined,
            },
        });
        setPage(newPage);
    }, [page]);

    return [
        getEmployees,
        {
            loading,
            error,
            data,
            page,
            prevPage,
            nextPage,
        },
    ] as const;
};
