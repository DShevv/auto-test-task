import { Button } from "../Button";
import styles from "./Pagination.module.scss";
import clsx from "clsx";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  visiblePages?: number;
  className?: string;
}

const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
  visiblePages = 5,
  className,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  return (
    <div className={clsx(styles.container, className)}>
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={styles.controlButton}
      >
        Previous
      </Button>
      <div className={styles.pages}>
        {pages
          .slice(
            Math.max(0, currentPage - Math.floor(visiblePages / 2)),
            Math.min(totalPages, currentPage + Math.floor(visiblePages / 2))
          )
          .map((page) => (
            <button
              key={page}
              className={styles.pageButton}
              onClick={() => onPageChange(page)}
              disabled={currentPage === page}
            >
              {page}
            </button>
          ))}
      </div>
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={styles.controlButton}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
