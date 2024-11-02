import type { Meta, StoryObj } from '@storybook/react';

import { AuthActions } from '@/presentation/components/molecules';
import Context from "@/presentation/contexts/form/form-context"

const meta = {
  title: 'molecules/auth-actions',
  component: AuthActions,
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
} satisfies Meta<typeof AuthActions>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  decorators: [
    (Story) => (
      <Context.Provider value={{ isLoading: false, errorMessage: "" }}>
        <Story />
      </Context.Provider>
    )
  ],
};

export const Loading: Story = {
  args: {},
  decorators: [
    (Story) => (
      <Context.Provider value={{ isLoading: true, errorMessage: "Loading..." }}>
        <Story />
      </Context.Provider>
    )
  ],
};

