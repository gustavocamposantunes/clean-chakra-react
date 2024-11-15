import { Flex, Link } from "@chakra-ui/react"
import React, { useContext } from "react"
import { useNavigate } from "react-router-dom"

import { CustomButton, FormStatus } from "../atoms"

import Context from "@/presentation/contexts/form/form-context"

interface IFormActions {
  onLogin?(): void
  buttonText: string
  linkText: string
  redirectTo: string
}

export const FormActions: React.FC<IFormActions> = ({ 
  onLogin,
  buttonText,
  linkText,
  redirectTo
}) => {
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
        {buttonText}
      </CustomButton>
      <Link onClick={() => navigate(redirectTo)} data-testid="signup">{linkText}</Link>
      <FormStatus />
    </Flex>
  )
}