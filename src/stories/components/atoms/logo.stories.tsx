import { fn } from '@storybook/test';

import type { Meta, StoryObj } from '@storybook/react';

import { Logo } from '@/presentation/components/atoms';

const meta = {
  title: 'atoms/logo',
  component: Logo,
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
  argTypes: {
    backgroundColor: { default: 'color' },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

