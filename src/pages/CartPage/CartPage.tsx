import styles from "./CartPage.module.scss";
import { selectCartItems, selectCartTotal, useAppSelector } from "../../store";
import { CartItem } from "@/components/cart/CartItem/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";
import { Link } from "react-router-dom";

const CartPage = () => {
  const cartItems = useAppSelector(selectCartItems);
  const cartTotal = useAppSelector(selectCartTotal);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Cart</h1>

      {cartItems.length > 0 ? (
        <div className={styles.wrapper}>
          <div className={styles.cartItems}>
            {cartItems.map((item) => (
              <CartItem key={item.product.id} item={item} />
            ))}
          </div>

          <CartSummary cartTotal={cartTotal} />
        </div>
      ) : (
        <div className={styles.emptyCart}>
          <h2 className={styles.emptyCartTitle}>Your cart is empty</h2>
          <p className={styles.emptyCartDescription}>
            Add products to your cart to see them here.
          </p>
          <Link className={styles.continueShoppingButton} to="/">
            Continue Shopping
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;
