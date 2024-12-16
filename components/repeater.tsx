import { ComponentConfig, Field, Fields } from "@measured/puck";
import axios, { AxiosResponse } from "axios";

export type RepeaterProps = {
  id?: string;
  entityName?: { collection: string };
  search?: string;
  filter?: Record<string, Record<string, string>>;
  entities?: any[];
  template: any;
  limit?: number;
  offset?: number;
  columns?: number;
  gap?: number;
  pagination?: boolean;
  limitPerPage?: number;
  totalPages?: number;
  currentPage?: number;
  currentUrl?: string;
  paginationGap?: number;
  enableFilters?: boolean;
};

export const Repeater: ComponentConfig<RepeaterProps> = {
  label: "Repeater",
  resolveFields: async ({ props }, { changed, lastFields }) => {
    if (!changed.id && !changed.entityName && !changed.pagination) {
      return lastFields;
    }

    const collection = props.entityName?.collection;

    return {
      entityName: {
        label: "Entità",
        type: "external" as const,
        fetchList: async () => {
          try {
            const { data } = await axios.get(
              `https://jsonplaceholder.typicode.com/posts`
            );
            return data;
          } catch (error: any) {
            console.error(error);
          }
        },
        showSearch: true,
        getItemSummary: (item) => item.title,
      },
      template: {
        label: "Template",
        type: "external" as const,
        fetchList: async () => {
          try {
            const { data } = await axios.get(
              `https://jsonplaceholder.typicode.com/albums`
            );
            return data;
          } catch (error) {
            console.error(error);
            return [];
          }
        },
        getItemSummary: (item) => item.title,
      },
      enableFilters: {
        label: "Abilita filtri",
        type: "radio",
        options: [
          { label: "Si", value: true },
          { label: "No", value: false },
        ],
      },
      pagination: {
        label: "Paginazione",
        type: "radio",
        options: [
          { label: "Si", value: true },
          { label: "No", value: false },
        ],
      },
      limit: !props.pagination
        ? {
            label: "Numero massimo di elementi (-1 per tutti)",
            type: "number",
            min: -1,
          }
        : ({} as Field),
      limitPerPage: props.pagination
        ? {
            label: "Numero massimo di elementi per pagina",
            type: "number",
            min: 1,
          }
        : ({} as Field),
      offset: !props.pagination
        ? {
            label: "Offset",
            type: "number",
            min: 0,
          }
        : ({} as Fields),
      paginationGap: props.pagination
        ? {
            label: "Distanza tra elenco e paginazione",
            type: "number",
            min: 0,
          }
        : ({} as Fields),
      columns: {
        label: "Numero di colonne",
        type: "number",
        min: 1,
      },
      gap: {
        label: "Distanza tra elementi",
        type: "number",
        min: 0,
      },
      search: (collection
        ? {
            label: "Ricerca",
            type: "text" as const,
          }
        : undefined) as any,
      entities: undefined as any,
    } as Fields<RepeaterProps>;
  },
  defaultProps: {
    entities: [],
    template: undefined,
    entityName: undefined,
    search: undefined,
    filter: {},
    limit: 20,
    offset: 0,
    gap: 24,
    columns: 2,
    pagination: false,
    limitPerPage: 1,
    currentPage: 1,
    paginationGap: 20,
    enableFilters: false,
  },
  resolveData: async (data) => {
    try {
      let entitiesRes: AxiosResponse | null = null;
      entitiesRes = await axios.get(
        `https://jsonplaceholder.typicode.com/posts`
      );

      let templateRes: AxiosResponse | null = null;
      templateRes = await axios.get(
        `https://jsonplaceholder.typicode.com/albums`
      );

      return {
        props: {
          entities: entitiesRes?.data.data,
          template: templateRes?.data.data,
        },
      };
    } catch (error) {
      console.error(error);
      return { props: { entities: [] } };
    }
  },
  render: ({}) => {
    return <div>I should be a repeater</div>;
  },
};
