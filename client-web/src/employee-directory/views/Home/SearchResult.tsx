import {SearchEmployeeByFullNameQuery} from "../../generated/graphql";

interface Props {
    list: SearchEmployeeByFullNameQuery["searchEmployeeByFullName"];
    isNoResult: boolean;
    onSearchResultClick: (id: string) => void;
}

const SearchResult = ({list, isNoResult, onSearchResultClick}: Props) => {
    return (
        <div className="mb-4" style={{height: "220px"}}>
            {isNoResult && <div>No search results</div>}
            {!!list.length && (
                <div className="mb-5">
                    <h3>Search results</h3>
                    <table className="table table-sm table-hover">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map((item, index) => {
                                return (
                                    <tr
                                        key={item.id + index}
                                        onClick={() => {
                                            onSearchResultClick(item.id);
                                        }}
                                    >
                                        <td>
                                            <span>{item.id}</span>
                                        </td>
                                        <td>
                                            {item.highlight.map((html) => (
                                                <span
                                                    dangerouslySetInnerHTML={{
                                                        __html: html,
                                                    }}
                                                ></span>
                                            ))}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default SearchResult;
