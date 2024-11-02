import { fn } from '@storybook/test';

import type { Meta, StoryObj } from '@storybook/react';

import { LoginHeader } from '@/presentation/components/atoms';

const meta = {
  title: 'atoms/login-header',
  component: LoginHeader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof LoginHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

