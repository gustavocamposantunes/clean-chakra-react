import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import { Router } from "@/presentation/navigation"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider value={defaultSystem}>
      <Router />
    </ChakraProvider>
  </StrictMode>,
)
