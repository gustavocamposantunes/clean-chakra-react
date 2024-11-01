import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import React from "react";

import type { Preview } from "@storybook/react"

const preview: Preview = {
  parameters: {
    chakra: {
      theme: defaultSystem
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },  
  decorators: [
    (Story) => (
      <ChakraProvider value={defaultSystem}>
        <Story />
      </ChakraProvider>
    )
  ]
};

export default preview;
