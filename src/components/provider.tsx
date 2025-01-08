"use client";

import {
  Button,
  Container,
  createTheme,
  MantineProvider,
  rem,
  TextInput,
} from "@mantine/core";

const CONTAINER_SIZES: Record<string, string> = {
  xxs: rem(300),
  xs: rem(400),
  sm: rem(500),
  md: rem(600),
  lg: rem(700),
  xl: rem(800),
  xxl: rem(900),
};

const theme = createTheme({
  components: {
    Button: Button.extend({
      vars: (theme, props) => {
        if (props.size === "xxl") {
          return {
            root: {
              "--button-height": rem(60),
              "--button-padding-x": rem(30),
              "--button-fz": rem(24),
            },
          };
        }
        if (props.size === "xxs") {
          return {
            root: {
              "--button-height": rem(24),
              "--button-padding-x": rem(10),
              "--button-fz": rem(10),
            },
          };
        }
        return { root: {} };
      },
    }),
    Container: Container.extend({
      vars: (_, { size, fluid }) => ({
        root: {
          "--container-size": fluid
            ? "100%"
            : size !== undefined && size in CONTAINER_SIZES
            ? CONTAINER_SIZES[size]
            : rem(size),
        },
      }),
    }),
    TextInput: TextInput.extend({
      defaultProps: {
        inputWrapperOrder: ["label", "input", "description", "error"],
      },
    }),
  },
});

export interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return <MantineProvider theme={theme}>{children}</MantineProvider>;
}
