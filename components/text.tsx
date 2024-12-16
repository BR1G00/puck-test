import { ComponentConfig, FieldLabel } from "@measured/puck";
import GradientColorPicker from "../lib/custom-fields/GradientColorPicker";
import { NotRenderedMessage } from "./NotRenderedMessage";

export type TextProps = {
  text: string;
  textAlign?: "left" | "center" | "right";
  fontSize?: number;
  fontWeight?: number;
  lineHeight?: number;
  textColor?: string;
  fontStyle?: string;
};

export const Text: ComponentConfig<TextProps> = {
  label: "Text",
  fields: {
    text: { label: "Testo", type: "textarea" },
    textColor: {
      type: "custom",
      label: "Colore del testo",
      render: ({ field, onChange, value }) => {
        return (
          <FieldLabel label={field.label || ""}>
            <GradientColorPicker
              colors={{}}
              value={value}
              isText={false}
              onChange={(color) => {
                onChange(color as string);
              }}
            />
          </FieldLabel>
        );
      },
    },
    fontWeight: {
      type: "select",
      label: "Peso del font",
      options: [
        { label: "100", value: 100 },
        { label: "200", value: 200 },
        { label: "300", value: 300 },
        { label: "400", value: 400 },
        { label: "500", value: 500 },
        { label: "600", value: 600 },
        { label: "700", value: 700 },
        { label: "800", value: 800 },
        { label: "900", value: 900 },
      ],
    },
    fontStyle: {
      type: "radio",
      label: "Stile del font",
      options: [
        { label: "Normale", value: "normal" },
        { label: "Corsivo", value: "italic" },
      ],
    },
    textAlign: {
      type: "radio",
      label: "Allineamento del testo",
      options: [
        { label: "Sinistra", value: "left" },
        { label: "Centro", value: "center" },
        { label: "Destra", value: "right" },
      ],
    },
    fontSize: {
      type: "number",
      label: "Dimensione del font",
      min: 0,
    },
    lineHeight: {
      type: "number",
      label: "Altezza della riga",
      min: 0,
    },
  },
  defaultProps: {
    text: "Text",
    fontWeight: 400,
    textAlign: "left",
    fontSize: 18,
    lineHeight: 26,
    textColor: "#0A2240",
    fontStyle: "normal",
  },
  render: ({
    textAlign,
    fontStyle,
    textColor,
    fontSize,
    fontWeight,
    lineHeight,
    text,
    editMode,
  }) => {
    if (!text) {
      return editMode ? <NotRenderedMessage /> : <></>;
    }

    return (
      <p
        style={{
          textAlign: textAlign,
          fontStyle: fontStyle,
          color: textColor,
          width: "100%",
          fontSize: fontSize ? `${fontSize}px` : undefined,
          fontWeight: fontWeight,
          lineHeight: lineHeight ? `${lineHeight}px` : undefined,
        }}
      >
        {text}
      </p>
    );
  },
};
