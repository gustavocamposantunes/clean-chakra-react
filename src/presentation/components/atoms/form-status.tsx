import { Heading, Stack, Spinner } from "@chakra-ui/react"

export const FormStatus = () => (
  <Stack direction="column">
    <Spinner color="red.500" size="xl" />
    <Heading color="red.500">Erro</Heading>
  </Stack>
)