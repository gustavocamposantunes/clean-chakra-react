import { Heading, Stack, Spinner } from "@chakra-ui/react"
import { useContext } from "react"

import Context from "@/presentation/contexts/form/form-context"

export const FormStatus = () => {
  const { state } = useContext(Context)
  return (
    <Stack direction="column" align="center" data-testid="error-wrap">
      {state.isLoading && <Spinner data-testid="spinner" color="red.700" size="xl" />}
      {state.mainError && <Heading data-testid="main-error" color="red.700">{state.mainError}</Heading>}
    </Stack>
  )
}