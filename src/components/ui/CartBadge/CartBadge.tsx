import { selectCartItemsCount, useAppSelector } from "../../../store";
import styles from "./CartBadge.module.scss";
import { CartIcon } from "../../../assets/icons";
import { Link } from "react-router-dom";

const CartBadge = () => {
  const cartItemsCount = useAppSelector(selectCartItemsCount);

  return (
    <Link
      to="/cart"
      className={styles.container}
      aria-label="Cart"
      title="Cart"
    >
      <CartIcon />
      {cartItemsCount > 0 && (
        <span className={styles.itemsCount}>{cartItemsCount}</span>
      )}
    </Link>
  );
};

export default CartBadge;
