import { Flex } from '@chakra-ui/react';

import type { Meta, StoryObj } from '@storybook/react';

import { AuthForm } from '@/presentation/components/organisms';

const meta = {
  title: 'organism/auth-form',
  component: AuthForm,
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
  decorators: [(Story) => (
    <Flex w="800px" justify="center">
      <Story />
    </Flex>
  )]
} satisfies Meta<typeof AuthForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

