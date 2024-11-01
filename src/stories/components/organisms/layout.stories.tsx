import type { Meta, StoryObj } from '@storybook/react';

import { Layout, AuthForm } from '@/presentation/components/organisms';

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
  tags: ['autodocs'],
} satisfies Meta<typeof Layout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: <AuthForm />
  },
};

