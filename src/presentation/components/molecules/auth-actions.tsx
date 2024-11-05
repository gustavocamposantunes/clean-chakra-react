import { Flex, Link } from "@chakra-ui/react"
import React, { useContext } from "react"
import { useNavigate } from "react-router-dom"

import { CustomButton, FormStatus } from "../atoms"

import Context from "@/presentation/contexts/form/form-context"

interface IAuthActions {
  onLogin?(): void
}

export const AuthActions: React.FC<IAuthActions> = ({ onLogin }) => {
  const { state } = useContext(Context)
  const navigate = useNavigate()
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
      <Link onClick={() => navigate("/signup")} href="/signup" data-testid="signup">Criar conta</Link>
      <FormStatus />
    </Flex>
  )
}