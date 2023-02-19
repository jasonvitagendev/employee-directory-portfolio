import {useState} from "react";
import {useQuery} from "@apollo/client";
import {gql} from "../../generated";

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

const List = () => {
    const [limit] = useState(20);
    const [page, setPage] = useState(0);
    const {loading, error, data, fetchMore} = useQuery(GET_EMPLOYEES, {
        fetchPolicy: "no-cache",
        variables: {
            limit,
            offset: page * limit,
        },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <ul>
                {data &&
                    data.allEmployees.map((employee) => {
                        return (
                            // there is an apollo client bug, there are discrepancies between API data and useQuery data when cache is used
                            // switching fetchPolicy to 'no-cache' will overcome this issue, however API will be called twice, https://github.com/apollographql/apollo-client/issues/10540
                            <li key={employee.id + employee.department.id}>
                                {employee.id} {employee.first_name}{" "}
                                {employee.last_name}{" "}
                                {employee.department.dept_name}
                            </li>
                        );
                    })}
            </ul>
            <button
                onClick={async () => {
                    const newPage = page - 1;
                    await fetchMore({
                        variables: {
                            offset: newPage * limit,
                        },
                    });
                    setPage(newPage);
                }}
                disabled={page == 0}
            >
                prev
            </button>
            <p>Page: {page + 1}</p>
            <button
                onClick={async () => {
                    const newPage = page + 1;
                    await fetchMore({
                        variables: {
                            offset: newPage * limit,
                        },
                    });
                    setPage(newPage);
                }}
            >
                next
            </button>
        </div>
    );
};

export default List;
