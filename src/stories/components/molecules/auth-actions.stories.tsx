import type { Meta, StoryObj } from '@storybook/react';

import { AuthActions } from '@/presentation/components/molecules';

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
  args: {
    isLoading: true
  },
};

