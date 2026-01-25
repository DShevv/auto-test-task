import type { CartItemT } from "../../../api/types";
import { useAppDispatch, updateQuantity, deleteFromCart } from "../../../store";
import { Button } from "../../ui/Button";
import styles from "./CartItem.module.scss";
import { formatPrice } from "../../../utils";

interface CartItemProps {
  item: CartItemT;
}

export function CartItem({ item }: CartItemProps) {
  const dispatch = useAppDispatch();
  const { product, quantity } = item;

  const handleQuantityChange = (newQuantity: number) => {
    dispatch(updateQuantity({ id: product.id, quantity: newQuantity }));
  };

  const handleRemove = () => {
    dispatch(deleteFromCart(product));
  };

  return (
    <div className={styles.item}>
      <div className={styles.imageContainer}>
        <img src={product.image} alt={product.title} />
      </div>

      <div className={styles.details}>
        <div className={styles.caption}>
          <div className={styles.title}>{product.title}</div>
          <div className={styles.category}>{product.category}</div>
        </div>
        <div className={styles.price}>${product.price}</div>
      </div>

      <div className={styles.actions}>
        <div className={styles.quantity}>
          <Button
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
            className={styles.quantityButton}
          >
            −
          </Button>
          <span className={styles.quantityValue}>{quantity}</span>
          <Button
            onClick={() => handleQuantityChange(quantity + 1)}
            aria-label="Increase quantity"
            className={styles.quantityButton}
          >
            +
          </Button>
        </div>

        <p className={styles.subtotal}>
          ${formatPrice(product.price * quantity)}
        </p>

        <Button
          onClick={handleRemove}
          aria-label={`Remove ${product.title} from cart`}
          variant="inline"
          className={styles.removeButton}
        >
          Remove
        </Button>
      </div>
    </div>
  );
}
