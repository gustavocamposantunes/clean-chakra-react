import { MemoryRouter, Routes, Route } from 'react-router-dom';

import type { Meta, StoryObj } from '@storybook/react';

import { LoginTemplate } from '@/presentation/components/templates';
import Context from '@/presentation/contexts/form/form-context';

const meta = {
  title: 'templates/login-template',
  component: LoginTemplate,
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
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<Story />} />
        </Routes>
      </MemoryRouter>
    )
  ]
} satisfies Meta<typeof LoginTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  decorators: [
    (Story) => (
      <Context.Provider value={{ state: { isLoading: false, mainError: "", email: "", password: "" }}}>
        {Story()}
      </Context.Provider>
    )
  ]
};

export const WithError: Story = {
  args: {},
  decorators: [
    (Story) => (
      <Context.Provider value={{ state: { isLoading: true, mainError: "Ocorreu um erro", email: "", password: "" }}}>
        {Story()}
      </Context.Provider>
    )
  ]
};

