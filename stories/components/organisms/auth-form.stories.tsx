import { Flex } from '@chakra-ui/react';

import type { Meta, StoryObj } from '@storybook/react';

import { AuthForm } from '@/presentation/components/organisms';
import Context from '@/presentation/contexts/form/form-context';

const meta = {
  title: 'organism/auth-form',
  component: AuthForm,
  parameters: {
    layout: 'centered',
    backgrounds: {
        default: 'custom-background', // Define um fundo personalizado
        values: [
            { name: 'custom-background', value: '#f0f0f0' },
        ],
    },
  },
  tags: ['autodocs'],
  decorators: [(Story) => (
    <Flex w="100vw" justify="center">
      <Story />
    </Flex>
  )]
} satisfies Meta<typeof AuthForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  decorators: [
    (Story) => (
      <Context.Provider value={{ isLoading: false, errorMessage: "" }}>
        {Story()}
      </Context.Provider>
    )
  ]
};

export const WithError: Story = {
  args: {},
  decorators: [
    (Story) => (
      <Context.Provider value={{ isLoading: true, errorMessage: "Ocorreu um erro" }}>
        {Story()}
      </Context.Provider>
    )
  ]
};

