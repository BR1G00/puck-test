import { ComponentConfig, DropZone, FieldLabel } from "@measured/puck";
import GradientColorPicker from "../lib/custom-fields/GradientColorPicker";
import PuckSpacingControls from "../lib/custom-fields/SpacingControls";

export type ContainerProps = {
  backgroundColor?: string;
  padding?: string[];
  borderRadius?: string[];
  border?: string[];
  borderColor?: string;
  boxed?: boolean;
  boxedWidth?: number;
  id?: string;
};

export const Container: ComponentConfig<ContainerProps> = {
  label: "Container",
  resolveFields: ({ props }, { changed, lastFields }) => {
    if (!changed.id) {
      return lastFields;
    }

    return {
      boxed: {
        type: "radio",
        label: "Boxed",
        options: [
          { label: "Si", value: true },
          { label: "No", value: false },
        ],
      },
      boxedWidth: {
        type: "number",
        label: "Boxed Width",
      },
      backgroundColor: {
        type: "custom",
        label: "Colore dello sfondo",
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
      padding: {
        type: "custom",
        label: "Padding",
        render: ({ field, onChange, value }) => {
          return (
            <FieldLabel label={field.label || ""}>
              <PuckSpacingControls
                label={field.label}
                value={value}
                onChange={(values) => {
                  onChange(values);
                }}
              />
            </FieldLabel>
          );
        },
      },
      borderRadius: {
        type: "custom",
        label: "Border Radius",
        render: ({ field, onChange, value }) => {
          return (
            <FieldLabel label={field.label || ""}>
              <PuckSpacingControls
                label={field.label}
                value={value}
                onChange={(values) => {
                  onChange(values);
                }}
              />
            </FieldLabel>
          );
        },
      },
      border: {
        type: "custom",
        label: "Border",
        render: ({ field, onChange, value }) => {
          return (
            <FieldLabel label={field.label || ""}>
              <PuckSpacingControls
                label={field.label}
                value={value}
                onChange={(values) => {
                  onChange(values);
                }}
              />
            </FieldLabel>
          );
        },
      },
      borderColor: {
        type: "custom",
        label: "Colore del bordo",
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
    };
  },
  defaultProps: {
    boxed: false,
    padding: ["24", "24", "24", "24"],
  },
  render: ({
    backgroundColor,
    padding,
    borderRadius,
    border,
    borderColor,
    boxed,
    boxedWidth,
    editMode,
  }) => {
    return (
      <div
        className={`${boxed ? "mx-auto" : "w-full"} max-w-full`}
        style={{
          width: boxed ? `${boxedWidth || 1280}px` : "100%",
          backgroundColor,
          padding: Array.isArray(padding) ? padding?.join("px ") + "px" : "",
          borderRadius: Array.isArray(borderRadius)
            ? borderRadius.join("px ") + "px"
            : "",
          borderWidth: Array.isArray(border) ? border?.join("px ") + "px" : "",
          borderStyle: "solid",
          borderColor: borderColor,
        }}
      >
        <DropZone zone="card" />
      </div>
    );
  },
};
