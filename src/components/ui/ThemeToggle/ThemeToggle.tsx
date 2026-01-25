import { toggleTheme } from "../../../store/slices/themeSlice";
import { selectTheme, useAppDispatch, useAppSelector } from "../../../store";
import styles from "./ThemeToggle.module.scss";
import { DarkModeIcon } from "../../../assets/icons";

const ThemeToggle = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <button
      onClick={handleToggleTheme}
      className={styles.themeToggle}
      aria-label={
        theme === "dark"
          ? "Переключить на светлую тему"
          : "Переключить на темную тему"
      }
      title={
        theme === "dark"
          ? "Переключить на светлую тему"
          : "Переключить на темную тему"
      }
    >
      <DarkModeIcon />
    </button>
  );
};

export default ThemeToggle;
