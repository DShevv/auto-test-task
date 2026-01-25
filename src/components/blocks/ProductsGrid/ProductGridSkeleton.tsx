import styles from "./ProductsGrid.module.scss";
import { Skeleton } from "../../ui/Skeleton";

const ProductGridSkeleton = () => {
  return (
    <div className={styles.container}>
      <section className={styles.grid}>
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} />
        ))}
      </section>
    </div>
  );
};

export default ProductGridSkeleton;
