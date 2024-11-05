import { Flex } from "@chakra-ui/react"
import React, { useContext } from "react"
import { Link } from "react-router-dom"

import { CustomButton, FormStatus } from "../atoms"

import Context from "@/presentation/contexts/form/form-context"

interface IAuthActions {
  onLogin?(): void
}

export const AuthActions: React.FC<IAuthActions> = ({ onLogin }) => {
  const { state } = useContext(Context)
  return (
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
        disabled={!!state.emailError || !!state.passwordError}
      >
        Entrar
      </CustomButton>
      <Link to="/signup" data-testid="signup">Criar conta</Link>
      <FormStatus />
    </Flex>
  )
}