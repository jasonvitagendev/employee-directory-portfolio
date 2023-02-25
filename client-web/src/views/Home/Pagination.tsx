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
        <div>
            <button onClick={prevPage} disabled={prevPageDisabled}>
                prev
            </button>
            <p>Page: {atPage + 1}</p>
            <button onClick={nextPage} disabled={nextPageDisabled}>
                next
            </button>
        </div>
    );
};

export default Pagination;
