import { Flex } from "@chakra-ui/react"
import { ReactNode } from "react"

import { CustomFooter } from "../atoms"

interface ILayout {
  children: ReactNode
}

export const Layout: React.FC<ILayout> = ({ children }) => (
  <Flex bg="orange.500" w="100vw" h="100vh" justify="space-between" align="center" direction="column">
    {children}
    <CustomFooter />
  </Flex>
)