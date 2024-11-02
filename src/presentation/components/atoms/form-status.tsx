import { Heading, Stack, Spinner } from "@chakra-ui/react"
import { useContext } from "react"

import Context from "@/presentation/contexts/form/form-context"

export const FormStatus = () => {
  const { state, errorState } = useContext(Context)
  return (
    <Stack direction="column" align="center" data-testid="error-wrap">
      {state.isLoading && <Spinner color="red.700" size="xl" />}
      {errorState.main && <Heading color="red.700">{errorState.main}</Heading>}
    </Stack>
  )
}