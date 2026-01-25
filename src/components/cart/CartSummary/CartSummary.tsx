import styles from "./CartSummary.module.scss";
import { Button } from "@/components/ui/Button";
import { Link } from "react-router-dom";
import { formatPrice } from "../../../utils";
import { clearCart, useAppDispatch } from "../../../store";

interface CartSummaryProps {
  cartTotal: number;
}

export const CartSummary = ({ cartTotal }: CartSummaryProps) => {
  const dispatch = useAppDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className={styles.cartSummary}>
      <h2 className={styles.summaryTitle}>Summary</h2>
      <div className={styles.summaryItems}>
        <div className={styles.summaryItem}>
          <span className={styles.summaryItemLabel}>Total</span>
          <span className={styles.summaryItemValue}>
            ${formatPrice(cartTotal)}
          </span>
        </div>
      </div>
      <div className={styles.controls}>
        <Button className={styles.checkoutButton} onClick={() => {}}>
          Checkout
        </Button>

        <Link className={styles.continueShoppingButton} to="/">
          Continue Shopping
        </Link>

        <Button
          variant="inline"
          className={styles.clearCartButton}
          onClick={handleClearCart}
        >
          Clear Cart
        </Button>
      </div>
    </div>
  );
};

