import List from "./List";
import "./style.module.sass";
import SearchBox from "./SearchBox";
import {useEmployeesQuery} from "./hooks/useEmployeesQuery";
import Pagination from "./Pagination";
import {useEmployeesSearch} from "./hooks/useEmployeesSearch";
import SearchResult from "./SearchResult";
import {useCallback, useEffect} from "react";

const limit = 15;

const Home = () => {
    const [getEmployees, {data, error, loading, nextPage, prevPage, page}] =
        useEmployeesQuery({
            limit: 15,
            startPageNo: 0,
        });

    const [
        search,
        {
            data: searchResult,
            loading: searchResultLoading,
            searchKeyword,
            selectedID,
            setSelectedID,
        },
    ] = useEmployeesSearch();

    // query employees one time on load
    useEffect(() => {
        getEmployees({
            variables: {
                limit: 15,
                offset: 0,
                id: undefined,
            },
        });
    }, []);

    // query selected employee when search result is clicked
    // query when search keyword is cleared
    useEffect(() => {
        if (searchKeyword === "") {
            setSelectedID("");
        }
        if (selectedID) {
            getEmployees({
                variables: {
                    limit,
                    offset: searchKeyword === "" ? page * limit : 0,
                    id: searchKeyword === "" ? undefined : selectedID,
                },
            });
        }
    }, [searchKeyword, selectedID]);

    // set an employee id on search result clicked
    const onSearchResultClicked = useCallback((id: string) => {
        setSelectedID(id);
    }, []);

    return (
        <div className="d-flex flex-column align-items-center">
            <header>
                <h2>Employee directory</h2>
            </header>
            <section className="col-12 col-lg-6">
                <SearchBox search={search} searchKeyword={searchKeyword} />
                {searchKeyword && (
                    <SearchResult
                        list={searchResult?.searchEmployeeByFullName || []}
                        isNoResult={
                            !searchResultLoading &&
                            !!searchKeyword.length &&
                            !searchResult?.searchEmployeeByFullName.length
                        }
                        onSearchResultClick={onSearchResultClicked}
                    ></SearchResult>
                )}
                {(!searchKeyword || selectedID) && (
                    <List
                        list={data?.allEmployees || []}
                        error={error}
                        loading={loading}
                    ></List>
                )}
                {!searchKeyword && (
                    <>
                        <Pagination
                            prevPage={prevPage}
                            nextPage={nextPage}
                            atPage={page}
                            prevPageDisabled={page === 0}
                        ></Pagination>
                    </>
                )}
                <footer></footer>
            </section>
            <footer className="mt-4">A portfolio by Jason Cheng</footer>
        </div>
    );
};

export default Home;
