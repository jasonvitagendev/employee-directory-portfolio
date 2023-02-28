import {GetEmployeesQuery} from "../../generated/graphql";
import {ApolloError} from "@apollo/client";

interface Props {
    list: GetEmployeesQuery["allEmployees"];
    loading?: boolean;
    error?: ApolloError | undefined;
    setShowModal: (show: boolean) => void;
}

const List = ({list, loading, error, setShowModal}: Props) => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="col">
            <h3>Listing</h3>
            <table className="table table-sm table-striped">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Department</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((item) => {
                        return (
                            <tr key={item.id || "" + item.department.id}>
                                <td>{item.id}</td>
                                <td>
                                    {item.first_name} {item.last_name}
                                </td>
                                <td>{item.department.dept_name}</td>
                                <td>
                                    <div
                                        className="btn-group btn-group-sm"
                                        role="group"
                                        aria-label="Call buttons"
                                    >
                                        <button
                                            type="button"
                                            onClick={() => setShowModal(true)}
                                        >
                                            Call
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default List;
