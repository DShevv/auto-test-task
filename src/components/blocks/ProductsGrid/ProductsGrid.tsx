import type { SortOptionT } from "../../../api/types";
import styles from "./ProductsGrid.module.scss";
import { useProducts } from "../../../api/hooks";
import { filterProductsBySearch, sortProducts } from "../../../utils";
import { useMemo } from "react";
import { PRODUCTS_PER_PAGE } from "../../../conf/consts";
import { ProductCard } from "../../product/ProductCard";
import { Pagination } from "../../ui/Pagination";
import { Button } from "../../ui/Button";

interface ProductsGridProps {
  search: string;
  category?: string;
  sort: SortOptionT;
  currentPage: number;
  onPageChange: (page: number) => void;
  resetFilters: () => void;
}

const ProductsGrid = ({
  search,
  category,
  sort = "title-asc",
  currentPage,
  onPageChange,
  resetFilters,
}: ProductsGridProps) => {
  const { data: products } = useProducts(category);

  const filteredProducts = useMemo(
    () => filterProductsBySearch(products, search),
    [products, search]
  );
  const sortedProducts = useMemo(
    () => sortProducts(filteredProducts, sort),
    [filteredProducts, sort]
  );

  const totalPages = Math.ceil(sortedProducts?.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = sortedProducts?.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    if (page < 1) onPageChange(1);
    else if (page > totalPages) onPageChange(totalPages);
    else onPageChange(page);
  };

  return (
    <div className={styles.container}>
      {paginatedProducts?.length > 0 ? (
        <section className={styles.grid}>
          {paginatedProducts?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      ) : (
        <section className={styles.empty}>
          <h2 className={styles.emptyTitle}>No products found</h2>
          <Button onClick={resetFilters}>Reset filters</Button>
        </section>
      )}
      <Pagination
        className={styles.pagination}
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ProductsGrid;
