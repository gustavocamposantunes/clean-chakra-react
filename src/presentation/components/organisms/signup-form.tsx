import { Flex, Heading } from "@chakra-ui/react"
import React, { ReactNode } from "react"

import { SignupFields } from "../molecules"

interface ISignupForm {
  onSubmit?(event: React.FormEvent<HTMLDivElement>): void
  actions: ReactNode
}

export const SignupForm: React.FC<ISignupForm> = ({ 
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
    <Heading as="h2" color="gray.700" textAlign="center" textTransform="uppercase">SignUp</Heading>
    <SignupFields />
    {actions}
  </Flex>
)