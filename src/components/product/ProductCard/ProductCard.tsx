import styles from "./ProductCard.module.scss";
import type { ProductT } from "../../../api/types";
import { addToCart, useAppDispatch, useAppSelector } from "../../../store";
import clsx from "clsx";
import { useMemo } from "react";
import { Button } from "../../ui/Button";
import { toast } from "sonner";

interface ProductCardProps {
  product: ProductT;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useAppDispatch();
  const isInCart = useAppSelector((state) =>
    state.cart.items.some((item) => item.product.id === product.id)
  );
  const isAvailable = useMemo(
    () => product.rating.rate > 3,
    [product.rating.rate]
  );

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success("Product added to cart");
  };

  return (
    <div
      className={clsx(styles.container, { [styles.isAvailable]: isAvailable })}
    >
      <div className={styles.availability}>
        {isAvailable ? "Available" : "Not available"}
      </div>
      <img src={product.image} alt={product.title} className={styles.image} />
      <h3 className={styles.title} title={product.title}>
        {product.title}
      </h3>
      <p className={styles.description}>{product.description}</p>
      <div className={styles.controls}>
        <p className={styles.price}>${product.price}</p>
        <Button
          className={clsx(styles.button, { [styles.inCart]: isInCart })}
          onClick={handleAddToCart}
          disabled={!isAvailable}
          title={!isAvailable ? "Product is not available" : undefined}
        >
          {isInCart ? "Add more" : "Add to Cart"}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
