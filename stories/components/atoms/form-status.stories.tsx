import { fn } from '@storybook/test';

import type { Meta, StoryObj } from '@storybook/react';

import { FormStatus } from '@/presentation/components/atoms';
import Context from "@/presentation/contexts/form/form-context"

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'atoms/form-status',
  component: FormStatus,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: { onClick: fn() },
  
} satisfies Meta<typeof FormStatus>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  decorators: [
    (Story) => (
      <Context.Provider value={{ state: { isLoading: false }, errorState: { main: "Ocorreu um erro" } }}>
        {Story()}
      </Context.Provider>
    )
  ]
};

export const WithError: Story = {
  args: {},
  decorators: [
    (Story) => (
      <Context.Provider value={{ state: { isLoading: true }, errorState: { main: "Ocorreu um erro" } }}>
        {Story()}
      </Context.Provider>
    )
  ]
};

