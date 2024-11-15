import { MemoryRouter, Routes, Route } from 'react-router-dom';

import type { Meta, StoryObj } from '@storybook/react';

import { FormActions } from '@/presentation/components/molecules';
import Context from "@/presentation/contexts/form/form-context"

const meta = {
  title: 'molecules/form-actions',
  component: FormActions,
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
  args: {
    submitButtonText: 'Entrar',
    linkText: 'Criar conta'
  }
} satisfies Meta<typeof FormActions>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  decorators: [
    (Story) => (
      <Context.Provider value={{ state: { isLoading: false, mainError: "" }}}>
        <Story />
      </Context.Provider>
    )
  ],
};

export const Disabled: Story = {
  args: {
    submitButtonDisabled: true
  },
  decorators: [
    (Story) => (
      <Context.Provider value={{ state: { isLoading: false, mainError: "" }}}>
        <Story />
      </Context.Provider>
    )
  ],
};

export const WithError: Story = {
  args: {},
  decorators: [
    (Story) => (
      <Context.Provider value={{ state: { isLoading: false, mainError: "Ocorreu um erro", emailError: "emailError", passwordError: "passwordError" }}}>
        <Story />
      </Context.Provider>
    )
  ],
};

export const WithLoading: Story = {
  args: {},
  decorators: [
    (Story) => (
      <Context.Provider value={{ state: { isLoading: true, mainError: "" }}}>
        <Story />
      </Context.Provider>
    )
  ],
};

