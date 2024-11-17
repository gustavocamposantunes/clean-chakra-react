import { Flex, Link } from "@chakra-ui/react"
import React from "react"
import { useNavigate } from "react-router-dom"

import { CustomButton, FormStatus } from "../atoms"


interface IFormActions {
  onLogin?(): void
  submitButtonText: string
  submitButtonDisabled: boolean
  linkText: string
  redirectTo: string
  linkTestId?: string;
}

export const FormActions: React.FC<IFormActions> = ({ 
  onLogin,
  submitButtonText,
  submitButtonDisabled,
  linkText,
  redirectTo,
  linkTestId
}) => {
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
        disabled={submitButtonDisabled}
      >
        {submitButtonText}
      </CustomButton>
      <Link onClick={() => navigate(redirectTo)} data-testid={linkTestId}>{linkText}</Link>
      <FormStatus />
    </Flex>
  )
}