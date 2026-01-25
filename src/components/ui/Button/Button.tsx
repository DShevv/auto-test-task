import clsx from "clsx";
import styles from "./Button.module.scss";

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  variant?: "primary" | "inline";
  type?: "button" | "submit" | "reset";
  title?: string;
  ariaLabel?: string;
}

const Button = ({
  children,
  onClick,
  disabled,
  className,
  type,
  title,
  ariaLabel,
  variant = "primary",
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(styles.button, className, {
        [styles.inline]: variant === "inline",
      })}
      type={type}
      title={title}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

export default Button;
