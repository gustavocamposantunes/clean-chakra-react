import { Flex } from '@chakra-ui/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';


import type { Meta, StoryObj } from '@storybook/react';

import { FormActions } from '@/presentation/components/molecules';
import { Layout, AuthForm } from '@/presentation/components/organisms';
import Context from '@/presentation/contexts/form/form-context';

const meta = {
  title: 'organism/layout',
  component: Layout,
  parameters: {
    layout: 'centered',
    backgrounds: {
        default: 'custom-background', // Define um fundo personalizado
        values: [
            { name: 'custom-background', value: '#f0f0f0' },
        ],
    },
  },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<Story />} />
        </Routes>
      </MemoryRouter>
    )
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof Layout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: <></>
  },
  decorators: [
    (Story) => (
      <Context.Provider value={{ isLoading: false, errorMessage: "" }}>
        {Story()}
      </Context.Provider>
    )
  ]
};

export const WithForm: Story = {
  args: {
    children: (
      <Flex w="100%" justify="center" mt="8">
        <AuthForm actions={(
          <FormActions 
            submitButtonText="Entrar"
            linkText="Criar conta"
            redirectTo="/signup"
          />
        )}/>
      </Flex>
    )
  },
  decorators: [
    (Story) => (
      <Context.Provider value={{ state: { isLoading: false }, errorState: { main: "", email: "", password: "" }}}>
        {Story()}
      </Context.Provider>
    )
  ]
};

