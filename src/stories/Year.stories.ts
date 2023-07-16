import type { Meta, StoryObj } from "@storybook/react";

import Year from "./Year";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "Example/Year",
  component: Year,
  tags: ["autodocs"],
  argTypes: {
  },
} satisfies Meta<typeof Year>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
  },
};
