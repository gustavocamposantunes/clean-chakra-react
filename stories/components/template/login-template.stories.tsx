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
} satisfies Meta<typeof LoginTemplate>;

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

