import type { Meta, StoryObj } from "@storybook/react";

import Collapsible from "./Collapsible";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "Example/CreatePage/Collapsible",
  component: Collapsible,
  tags: ["autodocs"],
  argTypes: {
  },
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    title: "Collapsible example",
    children: <div>Collapsible content</div>,
  },
};
