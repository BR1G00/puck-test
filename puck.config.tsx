import type { Config } from "@measured/puck";
import { Columns, ColumnsProps } from "./components/columns";
import { Container, ContainerProps } from "./components/container";
import { Flex, FlexProps } from "./components/flex";
import { Repeater, RepeaterProps } from "./components/repeater";
import { Text, TextProps } from "./components/text";

type Props = {
  HeadingBlock: { title: string };
  Container: ContainerProps;
  Text: TextProps;
  Flex: FlexProps;
  Columns: ColumnsProps;
  Repeater: RepeaterProps;
};

export const config: Config<Props> = {
  components: {
    HeadingBlock: {
      fields: {
        title: { type: "text" },
      },
      defaultProps: {
        title: "Heading",
      },
      render: ({ title }) => (
        <div style={{ padding: 64 }}>
          <h1>{title}</h1>
        </div>
      ),
    },
    Container: Container,
    Text: Text,
    Flex: Flex,
    Columns: Columns,
    Repeater: Repeater,
  },
};

export default config;
