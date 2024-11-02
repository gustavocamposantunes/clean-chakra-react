import { Heading, Stack, Spinner } from "@chakra-ui/react"
import { useContext } from "react"

import Context from "@/presentation/contexts/form/form-context"

export const FormStatus = () => {
  const { isLoading, mainError } = useContext(Context)
  return (
    <Stack direction="column" align="center" data-testid="error-wrap">
      {isLoading && <Spinner color="red.700" size="xl" />}
      {mainError && <Heading color="red.700">{mainError}</Heading>}
    </Stack>
  )
}