import type { Meta, StoryObj } from "@storybook/react";

import WelcomePage from "./WelcomePage";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "Example/WelcomePage",
  component: WelcomePage,
  tags: ["autodocs"],
  argTypes: {
  },
} satisfies Meta<typeof WelcomePage>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
  },
};
