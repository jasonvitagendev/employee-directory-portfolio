import List from "./List";
import styles from "./style.module.sass";
import SearchBox from "./SearchBox";
import {useEmployeesQuery} from "./hooks/useEmployeesQuery";
import Pagination from "./Pagination";
import {useEmployeesSearch} from "./hooks/useEmployeesSearch";
import SearchResult from "./SearchResult";

const Home = () => {
    const {data, error, loading, nextPage, prevPage, page} = useEmployeesQuery({
        limit: 15,
        startPageNo: 0,
    });

    const [
        search,
        {data: searchResult, loading: searchResultLoading, searchKeyword},
    ] = useEmployeesSearch();

    return (
        <div className={styles.bg}>
            <header></header>
            <SearchBox search={search} />
            <SearchResult
                list={searchResult?.searchEmployeeByFullName || []}
                isNoResult={
                    !searchResultLoading &&
                    !!searchKeyword.length &&
                    !searchResult?.searchEmployeeByFullName.length
                }
            ></SearchResult>
            <List
                list={data?.allEmployees || []}
                error={error}
                loading={loading}
            ></List>
            <Pagination
                prevPage={prevPage}
                nextPage={nextPage}
                atPage={page}
                prevPageDisabled={page === 0}
            ></Pagination>
            <footer></footer>
        </div>
    );
};

export default Home;
