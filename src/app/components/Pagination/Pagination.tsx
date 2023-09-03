import style from './Pagination.module.scss';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
    onPageChange: (pageNumber: number) => void;
    onItemsPerPageChange: (itemsPerPage: number) => void;
}

const Pagination = ({ currentPage, totalPages, itemsPerPage, onPageChange, onItemsPerPageChange }: PaginationProps) => {
    // Generate page numbers (array)

    const generatePageNumbers = () => {
        const pageNumbers = [];
        const range = 2; // Number of page numbers to display before and after the current page

        let start = Math.max(1, currentPage - range);
        let end = Math.min(totalPages, currentPage + range);

        if (start === 1) {
            end = Math.min(end + range - (currentPage - start), totalPages);
        }
        if (end === totalPages) {
            start = Math.max(start - (range - (end - currentPage)), 1);
        }

        if (currentPage >= totalPages - range) {
            start = Math.max(totalPages - 2 * range, 1);
        }

        for (let i = start; i <= end; i++) {
            pageNumbers.push(i);
        }

        return pageNumbers;
    };

    const pageNumbers = generatePageNumbers();

    const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedItemsPerPage = parseInt(event.target.value);
        onItemsPerPageChange(selectedItemsPerPage);
    };

    return (
        <div className={style.paginationContainer}>
            <div className={style.pagination}>
                <button disabled={currentPage === 1} onClick={() => onPageChange(1)}>
                    First
                </button>
                <button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
                    Previous
                </button>
                {pageNumbers.map((pageNumber) => (
                    <button
                        key={pageNumber}
                        className={pageNumber === currentPage ? style.active : ''}
                        onClick={() => onPageChange(pageNumber)}
                    >
                        {pageNumber}
                    </button>
                ))}
                <button disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
                    Next
                </button>
                <button disabled={currentPage === totalPages} onClick={() => onPageChange(totalPages)}>
                    Last
                </button>
            </div>
            <div className={style.selectLimit}>
                <span>Items per page:</span>
                <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
                    <option value={15}>15</option>
                    <option value={30}>30</option>
                    <option value={50}>50</option>
                </select>
            </div>
        </div>
    );
};

export default Pagination;
