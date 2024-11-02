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
      <Context.Provider value={{ state: { isLoading: false }, errorState: { main: "" }}}>
        {Story()}
      </Context.Provider>
    )
  ]
};

export const WithError: Story = {
  args: {},
  decorators: [
    (Story) => (
      <Context.Provider value={{ state: { isLoading: false, mainError: "Ocorreu um erro" }}}>
        {Story()}
      </Context.Provider>
    )
  ]
};

export const WithLoading: Story = {
  args: {},
  decorators: [
    (Story) => (
      <Context.Provider value={{ state: { isLoading: true, mainError: "Ocorreu um erro" }}}>
        {Story()}
      </Context.Provider>
    )
  ]
};

