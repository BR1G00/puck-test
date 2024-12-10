"use client";

import { ChangeEvent, KeyboardEvent, memo, useState } from "react";

export interface PuckSpacingControlsProps {
  label: string | undefined;
  onChange: (value: string[]) => void;
  value: string[] | undefined;
}

const PuckSpacingControls = memo((props: PuckSpacingControlsProps) => {
  const [values, setValues] = useState(
    Array.isArray(props.value)
      ? props.value?.map((v) => v || "0")
      : ["0", "0", "0", "0"]
  );
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [lock, setLock] = useState(false);

  const handleChange =
    (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
      let newValue = event.target.value.replace(/[^\d]/g, "");

      if (newValue === "" && focusedIndex === index) {
        newValue = "";
      } else {
        newValue = newValue || "0";
      }

      updateValue(index, newValue);
    };

  const handleKeyDown =
    (index: number) => (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        event.preventDefault();
        const currentValue = parseInt(values[index] ?? "") || 0;
        const newValue =
          event.key === "ArrowUp"
            ? currentValue + 1
            : Math.max(0, currentValue - 1);
        updateValue(index, newValue.toString());
      }
    };

  const handleFocus = (index: number) => () => {
    setFocusedIndex(index);
    if (values[index] === "0") {
      updateValue(index, "");
    }
  };

  const handleBlur = (index: number) => () => {
    setFocusedIndex(null);
    if (values[index] === "") {
      updateValue(index, "0");
    }
  };

  const updateValue = (index: number, newValue: string) => {
    const newValues = [...values];
    newValues[index] = newValue;
    if (lock) {
      setValues(newValues.map(() => newValue));
      if (props.onChange) {
        props.onChange(newValues.map(() => newValue));
      }
    } else {
      setValues(newValues);
      if (props.onChange) {
        props.onChange(newValues);
      }
    }
  };

  return (
    <div className="relative">
      <button
        className="absolute -top-8 right-0 z-10 p-1"
        onClick={() => setLock(!lock)}
      >
        {lock ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
            />
          </svg>
        )}
      </button>
      <div className="grid grid-cols-2 gap-2">
        {[0, 1, 2, 3].map((index) => (
          <div key={index} className="w-full relative">
            <input
              name={`spacing-${index}`}
              value={values[index]}
              className="border border-gray-600 pr-8"
              onChange={handleChange(index)}
              onKeyDown={handleKeyDown(index)}
              onFocus={handleFocus(index)}
              onBlur={handleBlur(index)}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
            />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
              px
            </span>
          </div>
        ))}
      </div>
    </div>
  );
});

PuckSpacingControls.displayName = "PuckSpacingControls";

export default PuckSpacingControls;
