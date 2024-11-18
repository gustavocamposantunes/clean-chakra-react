import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import { makeLogin } from "./factories/pages/login/login-factory"
import { makeSignUp } from "./factories/pages/signup/signup-factory"

import { Router } from "@/presentation/navigation"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider value={defaultSystem}>
      <Router 
        makeLogin={makeLogin}
        makeSignUp={makeSignUp}
      />
    </ChakraProvider>
  </StrictMode>,
)
