import {GetEmployeesQuery} from "../../generated/graphql";
import {ApolloError} from "@apollo/client";

interface Props {
    list: GetEmployeesQuery["allEmployees"];
    loading?: boolean;
    error?: ApolloError | undefined;
}

const List = ({list, loading, error}: Props) => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <ul>
                {list.map((item) => {
                    return (
                        // there is an apollo client bug, there are discrepancies between API data and useQuery data when cache is used
                        // switching fetchPolicy to 'no-cache' will overcome this issue, however API will be called twice, https://github.com/apollographql/apollo-client/issues/10540
                        <li key={item.id || "" + item.department.id}>
                            {item.id} {item.first_name} {item.last_name}{" "}
                            {item.department.dept_name}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default List;
