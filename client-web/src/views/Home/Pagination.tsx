import cx from "classnames";

interface Props {
    prevPage: () => void;
    nextPage: () => void;
    prevPageDisabled: boolean;
    nextPageDisabled?: boolean;
    atPage: number;
}

const Pagination = ({
    prevPage,
    nextPage,
    prevPageDisabled,
    nextPageDisabled,
    atPage,
}: Props) => {
    return (
        <nav
            aria-label="Employee directory pagination"
            className="d-flex flex-column align-items-center"
        >
            <div className="mt-4">Page {atPage + 1}</div>
            <ul className="pagination justify-content-center">
                <li
                    className={cx("page-item", {
                        disabled: prevPageDisabled,
                    })}
                >
                    <a className="page-link" href="#" onClick={prevPage}>
                        Previous
                    </a>
                </li>

                <li
                    className={cx("page-item", {
                        disabled: nextPageDisabled,
                    })}
                >
                    <a className="page-link" href="#" onClick={nextPage}>
                        Next
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
