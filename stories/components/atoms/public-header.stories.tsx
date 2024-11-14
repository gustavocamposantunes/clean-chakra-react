import { fn } from '@storybook/test';

import type { Meta, StoryObj } from '@storybook/react';

import { PublicHeader } from '@/presentation/components/atoms';

const meta = {
  title: 'atoms/login-header',
  component: PublicHeader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof PublicHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

