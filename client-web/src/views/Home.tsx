import {gql} from "../generated";
import {useQuery} from "@apollo/client";

const GET_EMPLOYEES = gql(`#graphql
query GetEmployees {
    allEmployees {
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

const Home = () => {
    const {loading, error, data} = useQuery(GET_EMPLOYEES, {
        fetchPolicy: "cache-and-network",
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <ul>
            {data &&
                data.allEmployees.map((employee) => (
                    <li key={employee.id + employee.department.id}>
                        {employee.id} {employee.first_name} {employee.last_name}{" "}
                        {employee.department.dept_name}
                    </li>
                ))}
        </ul>
    );
};

export default Home;
