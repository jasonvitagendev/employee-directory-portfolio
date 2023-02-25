import {SearchEmployeeByFullNameQuery} from "../../generated/graphql";

interface Props {
    list: SearchEmployeeByFullNameQuery["searchEmployeeByFullName"];
    isNoResult: boolean;
}

const SearchResult = ({list, isNoResult}: Props) => {
    return (
        <div>
            {isNoResult && <div>No search results</div>}
            <ul>
                {list.map((item) => {
                    return (
                        <li key={item.id}>
                            <span>{item.id}</span>{" "}
                            {item.highlight.map((html) => (
                                <span
                                    dangerouslySetInnerHTML={{__html: html}}
                                ></span>
                            ))}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default SearchResult;
