import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Select, { type SelectOption } from "./Select";

const mockOptions: SelectOption[] = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

describe("Select Component", () => {
  let mockOnChange: (value: string) => void;

  beforeEach(() => {
    mockOnChange = vi.fn();
  });

  describe("Rendering", () => {
    it("должен отрендерить компонент с placeholder", () => {
      render(
        <Select
          options={mockOptions}
          value=""
          onChange={mockOnChange}
          placeholder="Выберите опцию"
        />
      );

      const trigger = screen.getByRole("button");
      expect(trigger).toHaveTextContent("Выберите опцию");
    });

    it("должен отрендерить компонент с выбранным значением", () => {
      render(
        <Select options={mockOptions} value="option2" onChange={mockOnChange} />
      );

      const trigger = screen.getByRole("button");
      expect(trigger).toHaveTextContent("Option 2");
    });

    it("должен отрендерить все опции в нативном select", () => {
      render(<Select options={mockOptions} value="" onChange={mockOnChange} />);

      const nativeSelect = screen.getByRole("combobox");
      const options = nativeSelect.querySelectorAll("option");

      expect(options).toHaveLength(mockOptions.length + 1);
    });

    it("должен применить кастомный className", () => {
      const { container } = render(
        <Select
          options={mockOptions}
          value=""
          onChange={mockOnChange}
          className="custom-class"
        />
      );

      const selectWrapper = container.firstChild;
      expect(selectWrapper).toHaveClass("custom-class");
    });

    it("должен установить aria-label", () => {
      render(
        <Select
          options={mockOptions}
          value=""
          onChange={mockOnChange}
          ariaLabel="Test select"
        />
      );

      const nativeSelect = screen.getByRole("combobox");
      expect(nativeSelect).toHaveAttribute("aria-label", "Test select");
    });
  });

  describe("Взаимодействие с мышью", () => {
    it("должен открывать dropdown при клике на trigger", async () => {
      render(<Select options={mockOptions} value="" onChange={mockOnChange} />);

      const trigger = screen.getByRole("button");
      fireEvent.click(trigger);

      await waitFor(() => {
        expect(screen.getByRole("listbox")).toBeInTheDocument();
      });

      const listbox = screen.getByRole("listbox");
      const dropdownOptions = listbox.querySelectorAll('[role="option"]');
      expect(dropdownOptions).toHaveLength(mockOptions.length);
    });

    it("должен закрывать dropdown при повторном клике на trigger", async () => {
      render(<Select options={mockOptions} value="" onChange={mockOnChange} />);

      const trigger = screen.getByRole("button");

      fireEvent.click(trigger);
      await waitFor(() => {
        expect(screen.getByRole("listbox")).toBeInTheDocument();
      });

      fireEvent.click(trigger);
      await waitFor(() => {
        expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
      });
    });

    it("должен выбирать опцию при клике на неё", async () => {
      render(<Select options={mockOptions} value="" onChange={mockOnChange} />);

      const trigger = screen.getByRole("button");
      fireEvent.click(trigger);

      await waitFor(() => {
        expect(screen.getByRole("listbox")).toBeInTheDocument();
      });

      const listbox = screen.getByRole("listbox");
      const dropdownOptions = listbox.querySelectorAll('[role="option"]');
      fireEvent.click(dropdownOptions[1]);

      expect(mockOnChange).toHaveBeenCalledWith("option2");

      await waitFor(() => {
        expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
      });
    });

    it("должен закрывать dropdown при клике вне компонента", async () => {
      render(
        <div>
          <Select options={mockOptions} value="" onChange={mockOnChange} />
          <div data-testid="outside">Outside</div>
        </div>
      );

      const trigger = screen.getByRole("button");
      fireEvent.click(trigger);

      await waitFor(() => {
        expect(screen.getByRole("listbox")).toBeInTheDocument();
      });

      const outside = screen.getByTestId("outside");
      fireEvent.mouseDown(outside);

      await waitFor(() => {
        expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
      });
    });
  });

  describe("Взаимодействие с клавиатурой", () => {
    it("должен открывать dropdown при нажатии Enter", async () => {
      render(<Select options={mockOptions} value="" onChange={mockOnChange} />);

      const trigger = screen.getByRole("button");
      trigger.focus();
      fireEvent.keyDown(trigger, { key: "Enter" });

      await waitFor(() => {
        expect(screen.getByRole("listbox")).toBeInTheDocument();
      });
    });

    it("должен открывать dropdown при нажатии пробела", async () => {
      render(<Select options={mockOptions} value="" onChange={mockOnChange} />);

      const trigger = screen.getByRole("button");
      trigger.focus();
      fireEvent.keyDown(trigger, { key: " " });

      await waitFor(() => {
        expect(screen.getByRole("listbox")).toBeInTheDocument();
      });
    });

    it("должен закрывать dropdown при нажатии Escape", async () => {
      render(<Select options={mockOptions} value="" onChange={mockOnChange} />);

      const trigger = screen.getByRole("button");
      fireEvent.click(trigger);

      await waitFor(() => {
        expect(screen.getByRole("listbox")).toBeInTheDocument();
      });

      fireEvent.keyDown(trigger, { key: "Escape" });

      await waitFor(() => {
        expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
      });
    });

    it("должен открывать dropdown при нажатии ArrowDown", async () => {
      render(<Select options={mockOptions} value="" onChange={mockOnChange} />);

      const trigger = screen.getByRole("button");
      trigger.focus();
      fireEvent.keyDown(trigger, { key: "ArrowDown" });

      await waitFor(() => {
        expect(screen.getByRole("listbox")).toBeInTheDocument();
      });
    });

    it("должен переходить к следующей опции при нажатии ArrowDown когда dropdown открыт", async () => {
      render(
        <Select options={mockOptions} value="option1" onChange={mockOnChange} />
      );

      const trigger = screen.getByRole("button");
      fireEvent.click(trigger);

      await waitFor(() => {
        expect(screen.getByRole("listbox")).toBeInTheDocument();
      });

      fireEvent.keyDown(trigger, { key: "ArrowDown" });

      expect(mockOnChange).toHaveBeenCalledWith("option2");
    });

    it("должен переходить к предыдущей опции при нажатии ArrowUp", async () => {
      render(
        <Select options={mockOptions} value="option2" onChange={mockOnChange} />
      );

      const trigger = screen.getByRole("button");
      fireEvent.click(trigger);

      await waitFor(() => {
        expect(screen.getByRole("listbox")).toBeInTheDocument();
      });

      fireEvent.keyDown(trigger, { key: "ArrowUp" });

      expect(mockOnChange).toHaveBeenCalledWith("option1");
    });

    it("не должен переходить за границы массива опций при ArrowDown", async () => {
      render(
        <Select options={mockOptions} value="option3" onChange={mockOnChange} />
      );

      const trigger = screen.getByRole("button");
      fireEvent.click(trigger);

      await waitFor(() => {
        expect(screen.getByRole("listbox")).toBeInTheDocument();
      });

      fireEvent.keyDown(trigger, { key: "ArrowDown" });

      expect(mockOnChange).not.toHaveBeenCalled();
    });

    it("не должен переходить за границы массива опций при ArrowUp", async () => {
      render(
        <Select options={mockOptions} value="option1" onChange={mockOnChange} />
      );

      const trigger = screen.getByRole("button");
      fireEvent.click(trigger);

      await waitFor(() => {
        expect(screen.getByRole("listbox")).toBeInTheDocument();
      });

      fireEvent.keyDown(trigger, { key: "ArrowUp" });

      expect(mockOnChange).not.toHaveBeenCalled();
    });
  });
});
