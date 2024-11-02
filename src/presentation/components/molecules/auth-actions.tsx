import { Flex, Link } from "@chakra-ui/react"
import React from "react"

import { CustomButton, FormStatus } from "../atoms"

interface IAuthActions {
  onLogin?(): void
}

export const AuthActions: React.FC<IAuthActions> = ({ onLogin }) => (
  <Flex 
    pt={3}
    direction="column" 
    align="center"
    spaceY={2}
  >
    <CustomButton 
      type="submit"
      onClick={onLogin}
      data-testid="submit-button"
      disabled
    >
      Entrar
    </CustomButton>
    <Link textAlign="center">Criar conta</Link>
    <FormStatus />
  </Flex>
)