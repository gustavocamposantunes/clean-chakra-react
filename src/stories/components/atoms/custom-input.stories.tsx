import { fn } from '@storybook/test';

import type { Meta, StoryObj } from '@storybook/react';

import { CustomInput } from '@/presentation/components/atoms';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'atoms/custom-input',
  component: CustomInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof CustomInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'Digite seu e-mail'
  },
};

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Digite sua senha'
  },
};

