import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { render } from "@testing-library/react";
import { ReactNode } from "react";

const customRender = (ui: ReactNode, options = {}) =>
  render(ui, { wrapper: ({ children }) => <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>, ...options });

export * from "@testing-library/react";
export { customRender as render };
