import { Flex, Link } from "@chakra-ui/react"
import React from "react"

import { CustomButton, CustomSpinner } from "../atoms"

interface IAuthActions {
  onLogin?(): void
  isLoading: boolean
}

export const AuthActions: React.FC<IAuthActions> = ({ onLogin, isLoading }) => (
  <Flex 
    pt={3}
    direction="column" 
    align="center"
    spaceY={2}
  >
    <CustomButton 
      type="submit"
      onClick={onLogin}
    >
      Entrar
    </CustomButton>
    <Link textAlign="center">Criar conta</Link>
    {isLoading && <CustomSpinner />}
  </Flex>
)