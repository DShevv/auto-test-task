import { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import styles from "./Select.module.scss";
import { ArrowDownIcon } from "../../../assets/icons";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
}

const Select = ({
  options,
  value,
  onChange,
  placeholder = "Select option",
  disabled = false,
  className,
  ariaLabel,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const nativeSelectRef = useRef<HTMLSelectElement>(null);

  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);

    if (nativeSelectRef.current) {
      nativeSelectRef.current.value = optionValue;
    }
  };

  const handleNativeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    switch (e.key) {
      case "Enter":
      case " ":
        e.preventDefault();
        setIsOpen(!isOpen);
        break;
      case "Escape":
        setIsOpen(false);
        break;
      case "ArrowDown":
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          const currentIndex = options.findIndex((opt) => opt.value === value);
          if (currentIndex < options.length - 1) {
            onChange(options[currentIndex + 1].value);
          }
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        if (isOpen) {
          const currentIndex = options.findIndex((opt) => opt.value === value);
          if (currentIndex > 0) {
            onChange(options[currentIndex - 1].value);
          }
        }
        break;
    }
  };

  return (
    <div
      ref={selectRef}
      className={clsx(styles.selectWrapper, className, {
        [styles.disabled]: disabled,
        [styles.open]: isOpen,
      })}
    >
      <select
        ref={nativeSelectRef}
        value={value}
        onChange={handleNativeChange}
        disabled={disabled}
        aria-label={ariaLabel}
        className={styles.nativeSelect}
        tabIndex={-1}
      >
        {!value && placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <div
        className={styles.selectTrigger}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-disabled={disabled}
      >
        <span className={styles.selectValue}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span
          className={clsx(styles.selectArrow, {
            [styles.selectArrowOpen]: isOpen,
          })}
        >
          <ArrowDownIcon />
        </span>
      </div>

      {isOpen && (
        <div className={styles.selectDropdown} role="listbox">
          {options.map((option) => (
            <div
              key={option.value}
              className={clsx(styles.selectOption, {
                [styles.selected]: option.value === value,
              })}
              onClick={() => handleOptionClick(option.value)}
              role="option"
              aria-selected={option.value === value}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
