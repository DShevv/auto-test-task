import { useEffect, useEffectEvent, useMemo, useState } from "react";
import type { SortOptionT } from "../../../api/types";
import styles from "./ProductsFilters.module.scss";
import { useDebounce } from "../../../hooks";
import { Button } from "../../ui/Button";
import Select, { type SelectOption } from "../../ui/Select/Select";
import { useCategories } from "../../../api/hooks";

interface ProductsFiltersProps {
  search: string;
  category?: string;
  sort: SortOptionT;
  onSearchChange: (search: string) => void;
  onCategoryChange: (category: string) => void;
  onSortChange: (sort: SortOptionT) => void;
}

const ProductsFilters = ({
  search,
  category,
  sort,
  onSearchChange,
  onCategoryChange,
  onSortChange,
}: ProductsFiltersProps) => {
  const [localSearch, setLocalSearch] = useState(search);
  const debouncedSearch = useDebounce(localSearch, 500);
  const { data: categories } = useCategories();

  const categoryOptions = useMemo(
    () => [
      { value: "", label: "All" },
      ...(categories ?? []).map((category) => ({
        value: category,
        label: category,
      })),
    ],
    [categories]
  );

  const handleSearchChange = useEffectEvent((value: string) => {
    onSearchChange(value);
  });

  useEffect(() => {
    handleSearchChange(debouncedSearch);
  }, [debouncedSearch]);

  useEffect(() => {
    setLocalSearch(search);
  }, [search]);

  const sortOptions: SelectOption[] = useMemo(
    () => [
      { value: "title-asc", label: "Product name (A-Z)" },
      { value: "title-desc", label: "Product name (Z-A)" },
      { value: "price-asc", label: "Price (Low to High)" },
      { value: "price-desc", label: "Price (High to Low)" },
    ],
    []
  );

  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <input
          name="search"
          type="text"
          placeholder="Search products..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          className={styles.searchInput}
        />

        <Button
          disabled={localSearch === ""}
          className={styles.clearButton}
          onClick={() => setLocalSearch("")}
          aria-label="Clear search"
        >
          Clear
        </Button>
      </div>
      <Select
        options={categoryOptions}
        value={category ?? ""}
        onChange={onCategoryChange}
        placeholder="Select category"
        ariaLabel="Select category"
      />
      <Select
        options={sortOptions}
        value={sort}
        onChange={(value) => onSortChange(value as SortOptionT)}
        placeholder="Select sort"
        ariaLabel="Select sort"
      />
    </div>
  );
};

export default ProductsFilters;
