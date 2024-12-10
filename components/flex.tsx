import { ComponentConfig, DropZone } from "@measured/puck";

export type FlexProps = {
  flexDirection: "row" | "column" | "row-reverse" | "column-reverse";
  justifyContent:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around";
  alignItems: "flex-start" | "center" | "flex-end" | "stretch";
  gap: number;
};

export const Flex: ComponentConfig<FlexProps> = {
  label: "Flex",
  fields: {
    flexDirection: {
      label: "Direzione",
      type: "select",
      options: [
        { value: "row", label: "Orizzontale" },
        { value: "column", label: "Verticale" },
        { value: "row-reverse", label: "Orizzontale inverso" },
        { value: "column-reverse", label: "Verticale inverso" },
      ],
    },
    justifyContent: {
      label: "Allineamento orizzontale",
      type: "select",
      options: [
        { value: "flex-start", label: "Inizio" },
        { value: "center", label: "Centro" },
        { value: "flex-end", label: "Fine" },
        { value: "space-between", label: "Spaziato" },
        { value: "space-around", label: "Spaziato uniformemente" },
      ],
    },
    alignItems: {
      label: "Allineamento verticale",
      type: "select",
      options: [
        { value: "flex-start", label: "Inizio" },
        { value: "center", label: "Centro" },
        { value: "flex-end", label: "Fine" },
        { value: "stretch", label: "Esteso" },
      ],
    },
    gap: {
      label: "Spazio tra gli elementi",
      type: "number",
      min: 0,
    },
  },
  defaultProps: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 16,
  },
  render: ({ flexDirection, justifyContent, alignItems, gap }) => {
    const style = {
      display: "flex",
      flexDirection: flexDirection,
      justifyContent: justifyContent,
      alignItems: alignItems,
      gap: gap,
    };

    return (
      <div style={style}>
        <DropZone zone={`item`} style={style} />
      </div>
    );
  },
};
