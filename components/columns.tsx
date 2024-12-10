import { ComponentConfig, DropZone, Field } from "@measured/puck";
import { CSSProperties } from "react";

const mobileGridClasses = [
  { label: "1", value: "grid-cols-1" },
  { label: "2", value: "grid-cols-2" },
  { label: "3", value: "grid-cols-3" },
  { label: "4", value: "grid-cols-4" },
  { label: "5", value: "grid-cols-5" },
  { label: "6", value: "grid-cols-6" },
  { label: "7", value: "grid-cols-7" },
  { label: "8", value: "grid-cols-8" },
  { label: "9", value: "grid-cols-9" },
  { label: "10", value: "grid-cols-10" },
  { label: "11", value: "grid-cols-11" },
  { label: "12", value: "grid-cols-12" },
];

const desktopGridClasses = [
  { label: "1", value: "md:grid-cols-1" },
  { label: "2", value: "md:grid-cols-2" },
  { label: "3", value: "md:grid-cols-3" },
  { label: "4", value: "md:grid-cols-4" },
  { label: "5", value: "md:grid-cols-5" },
  { label: "6", value: "md:grid-cols-6" },
  { label: "7", value: "md:grid-cols-7" },
  { label: "8", value: "md:grid-cols-8" },
  { label: "9", value: "md:grid-cols-9" },
  { label: "10", value: "md:grid-cols-10" },
  { label: "11", value: "md:grid-cols-11" },
  { label: "12", value: "md:grid-cols-12" },
];

const desktopSpanClasses = [
  { label: "1", value: "md:col-span-1" },
  { label: "2", value: "md:col-span-2" },
  { label: "3", value: "md:col-span-3" },
  { label: "4", value: "md:col-span-4" },
  { label: "5", value: "md:col-span-5" },
  { label: "6", value: "md:col-span-6" },
  { label: "7", value: "md:col-span-7" },
  { label: "8", value: "md:col-span-8" },
  { label: "9", value: "md:col-span-9" },
  { label: "10", value: "md:col-span-10" },
  { label: "11", value: "md:col-span-11" },
  { label: "12", value: "md:col-span-12" },
];

const mobileSpanClasses = [
  { label: "1", value: "col-span-1" },
  { label: "2", value: "col-span-2" },
  { label: "3", value: "col-span-3" },
  { label: "4", value: "col-span-4" },
  { label: "5", value: "col-span-5" },
  { label: "6", value: "col-span-6" },
  { label: "7", value: "col-span-7" },
  { label: "8", value: "col-span-8" },
  { label: "9", value: "col-span-9" },
  { label: "10", value: "col-span-10" },
  { label: "11", value: "col-span-11" },
  { label: "12", value: "col-span-12" },
];

const alignItemsOptions = [
  { label: "Normal", value: "normal" },
  { label: "Start", value: "start" },
  { label: "Center", value: "center" },
  { label: "End", value: "end" },
];

type AlignItems = "normal" | "start" | "center" | "end";

export type ColumnsProps = {
  distribution: "auto" | "manual";
  columns: {
    span?: string;
    mobileSpan?: string;
    alignment?: AlignItems;
  }[];
  gap?: number;
  desktopColumns: string;
  mobileColumns?: string;
  id?: string;
};

const getColumnStyle = (alignment: AlignItems = "normal"): CSSProperties => ({
  display: "flex",
  flexDirection: "column",
  alignItems: alignment,
});

export const Columns: ComponentConfig<ColumnsProps> = {
  label: "Colonne",
  resolveFields: ({ props }, { changed, lastFields }) => {
    if (!changed.id && !changed.distribution) {
      return lastFields;
    }

    return {
      distribution: {
        type: "radio",
        label: "Distribuzione",
        options: [
          {
            value: "auto",
            label: "Auto",
          },
          {
            value: "manual",
            label: "Manuale",
          },
        ],
      },
      desktopColumns:
        props.distribution === "auto"
          ? {
              label: "Colonne desktop",
              type: "select",
              options: desktopGridClasses,
            }
          : ({} as Field),
      mobileColumns:
        props.distribution === "auto"
          ? {
              label: "Colonne mobile",
              type: "select",
              options: mobileGridClasses,
            }
          : ({} as Field),
      gap: {
        label: "Distanza",
        type: "number",
        min: 0,
      },
      columns: {
        type: "array",
        label: "Colonne",
        getItemSummary: (_, id) => `Colonna ${(id ?? 0) + 1}`,
        arrayFields:
          props.distribution === "auto"
            ? {
                alignment: {
                  label: "Allineamento",
                  type: "select",
                  options: alignItemsOptions,
                },
              }
            : {
                span: {
                  label: "Span (1-12)",
                  type: "select",
                  options: desktopSpanClasses,
                },
                mobileSpan: {
                  label: "Mobile Span (1-12)",
                  type: "select",
                  options: mobileSpanClasses,
                },
                alignment: {
                  label: "Allineamento",
                  type: "select",
                  options: alignItemsOptions,
                },
              },
        defaultItemProps: {
          span: "md:col-span-6",
          mobileSpan: "col-span-12",
          alignment: "normal",
        },
      },
    };
  },
  defaultProps: {
    distribution: "auto",
    columns: [
      {
        span: "md:col-span-6",
        mobileSpan: "col-span-12",
        alignment: "normal",
      },
      {
        span: "md:col-span-6",
        mobileSpan: "col-span-12",
        alignment: "normal",
      },
    ],
    gap: 24,
    desktopColumns: "md:grid-cols-2",
    mobileColumns: "grid-cols-1",
  },
  render: ({ columns, distribution, gap, desktopColumns, mobileColumns }) => {
    return (
      <div
        className={`grid ${
          distribution == "auto"
            ? mobileColumns + " " + desktopColumns
            : "grid-cols-12"
        }`}
        style={{
          gap: `${gap ?? 0}px`,
        }}
      >
        {columns.map(({ span, alignment, mobileSpan }, idx) => (
          <div
            key={idx}
            className={`${
              distribution === "manual"
                ? `${mobileSpan || ""} ${span || ""}`
                : ""
            }`}
            style={{
              ...getColumnStyle(alignment),
            }}
          >
            <DropZone
              zone={`column-${idx}`}
              disallow={["Hero", "Logos", "Stats"]}
              style={getColumnStyle(alignment)}
            />
          </div>
        ))}
      </div>
    );
  },
};
