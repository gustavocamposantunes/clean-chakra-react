import { Flex, Heading } from "@chakra-ui/react"
import React, { ReactNode } from "react"

import { AuthFields } from "../molecules"

interface IAuthForm {
  onSubmit?(event: React.FormEvent<HTMLDivElement>): void
  actions: ReactNode
}

export const AuthForm: React.FC<IAuthForm> = ({ 
  onSubmit,
  actions
}) => (
  <Flex 
    as="form"
    data-testid="form"
    direction="column"
    spaceY={4}
    lg={{
      width: "30%"
    }}
    md={{
      width: "50%"
    }}
    sm={{
      width: "100%"
    }}
    shadow="lg" 
    bg="orange.100"
    borderRadius="md"
    padding={4}
    onSubmit={onSubmit}
  >
    <Heading as="h2" color="gray.700" textAlign="center" textTransform="uppercase">Login</Heading>
    <AuthFields />
    {actions}
  </Flex>
)