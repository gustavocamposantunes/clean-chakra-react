import { Heading, Stack, Spinner } from "@chakra-ui/react"
import { useContext } from "react"

import Context from "@/presentation/contexts/form/form-context"

export const FormStatus = () => {
  const { isLoading, errorMessage } = useContext(Context)
  return (
    <Stack direction="column" align="center" data-testid="error-wrap">
      {isLoading && <Spinner color="red.500" size="xl" />}
      {errorMessage && <Heading color="red.500">{errorMessage}</Heading>}
    </Stack>
  )
}