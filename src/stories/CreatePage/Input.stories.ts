import type { Meta, StoryObj } from "@storybook/react";

import Input from "./Input";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "Example/CreatePage/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
  },
};
