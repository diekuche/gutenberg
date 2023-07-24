import type { Meta, StoryObj } from "@storybook/react";

import InputTokenAmount from "./InputTokenAmount";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "Example/InputTokenAmount",
  component: InputTokenAmount,
  tags: ["autodocs"],
  argTypes: {
  },
} satisfies Meta<typeof InputTokenAmount>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    decimals: 6,
    maxAmount: "100",
    value: "10",
  },
};
