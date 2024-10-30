import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider value={defaultSystem}>
      <p>
        Chackra UI - Clean React
      </p>
    </ChakraProvider>
  </StrictMode>,
)
