"use client";

import { SetStateAction, useState } from "react";
import ColorPicker, { useColorPicker } from "react-best-gradient-color-picker";

export interface GradientColorPickerProps {
  colors: Record<string, string>;
  label?: string | undefined;
  onChange: (color: SetStateAction<string>) => void;
  value: string | undefined;
  isText?: boolean;
  width?: number;
}

export function GradientColorPicker(props: GradientColorPickerProps) {
  const [color, setColor] = useState(props.value || "rgba(255, 255, 255, 1)");

  const { getGradientObject } = useColorPicker(color, setColor);
  const gradientObject = getGradientObject();

  const customColors = Object.values(props.colors);

  const combinedColors = gradientObject?.isGradient
    ? [...customColors]
    : customColors;

  const colors = new Set(combinedColors) as Set<string>;

  const handleChange = (newColor: string) => {
    setColor(newColor);

    if (props.onChange) {
      props.onChange(newColor);
    }
  };

  return (
    <div className="overflow-auto">
      <ColorPicker
        presets={[...colors]}
        value={color}
        onChange={handleChange}
        hideGradientStop
        hideEyeDrop
        hideAdvancedSliders
        hideColorGuide
        hideInputType
        hideControls={props.isText}
        hideOpacity={props.isText}
        height={100}
        width={props.width || 286}
      />
    </div>
  );
}

export default GradientColorPicker;
