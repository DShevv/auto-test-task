import { Suspense, useState } from "react";
import ProductsGrid from "../../components/blocks/ProductsGrid/ProductsGrid";
import styles from "./CatalogPage.module.scss";
import ProductsFilters from "../../components/blocks/ProductsFilters/ProductsFilters";
import type { SortOptionT } from "../../api/types";
import { ProductGridSkeleton } from "../../components/blocks/ProductsGrid";

const CatalogPage = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState<SortOptionT>("title-asc" as SortOptionT);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearchChange = (newSearch: string) => {
    setSearch(newSearch);
    setCurrentPage(1);
  };

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    setCurrentPage(1);
  };

  const handleSortChange = (newSort: SortOptionT) => {
    setSort(newSort);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSearch("");
    setCategory("");
    setSort("title-asc" as SortOptionT);
    setCurrentPage(1);
  };

  return (
    <div className={styles.container}>
      <ProductsFilters
        search={search}
        category={category}
        sort={sort}
        onSearchChange={handleSearchChange}
        onCategoryChange={handleCategoryChange}
        onSortChange={handleSortChange}
      />
      <Suspense fallback={<ProductGridSkeleton />}>
        <ProductsGrid
          search={search}
          category={category}
          sort={sort}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          resetFilters={resetFilters}
        />
      </Suspense>
    </div>
  );
};

export default CatalogPage;
