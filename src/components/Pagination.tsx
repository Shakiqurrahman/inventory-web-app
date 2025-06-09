type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex items-center justify-center gap-4 flex-wrap">
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-5 py-1.5 bg-blue-500/15 text-blue-500 font-semibold dark:bg-white/30 dark:text-white  rounded disabled:opacity-50 text-sm"
      >
        Prev
      </button>

      <span className="text-gray-600 dark:text-white text-sm">
        Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
      </span>

      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-5 py-1.5 bg-blue-500/15 text-blue-500 font-semibold  rounded disabled:opacity-50 text-sm"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
