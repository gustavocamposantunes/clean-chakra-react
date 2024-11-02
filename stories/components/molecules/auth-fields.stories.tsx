import { Flex } from '@chakra-ui/react';

import type { Meta, StoryObj } from '@storybook/react';

import { AuthFields } from '@/presentation/components/molecules';
import Context from '@/presentation/contexts/form/form-context';

const meta = {
  title: 'molecules/auth-fields',
  component: AuthFields,
  parameters: {
    layout: 'centered',
    backgrounds: {
        default: 'custom-background', // Define um fundo personalizado
        values: [
            { name: 'custom-background', value: '#f0f0f0' },
        ],
    },
  },
  decorators: [(Story) => (
    <Flex w="800px" justify="center" direction="column" spaceY={2}>
      <Story />
    </Flex>
  )],
  tags: ['autodocs'],
} satisfies Meta<typeof AuthFields>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  decorators: [
    (Story) => (
      <Context.Provider value={{ state: { isLoading: false }, errorState: { email: "", password: "", main: "Ocorreu um erro" }}}>
        {Story()}
      </Context.Provider>
    )
  ]
};

