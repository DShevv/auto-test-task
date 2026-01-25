import { Link, NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
import clsx from "clsx";
import { ThemeToggle } from "../../ui/ThemeToggle";
import { CartBadge } from "../../ui/CartBadge";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          AutoTestTask
        </Link>

        <nav className={styles.nav}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              clsx(styles.navLink, { [styles.active]: isActive })
            }
          >
            Catalog
          </NavLink>
        </nav>

        <div className={styles.controls}>
          <ThemeToggle />
          <CartBadge />
        </div>
      </div>
    </header>
  );
};

export default Header;
