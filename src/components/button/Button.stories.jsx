import Button from "./Button";

const Template = (args) => <Button {...args}></Button>;

export default {
  title: "Common/Button",
  component: Button
};

// export const HelloButton = () => <Button>Hello World !!</Button>;
export const HelloButton = Template.bind({});
HelloButton.args = {
  children: "default",
  color: "default",
  size: "base"
};

export const PrimaryButton = Template.bind({});
PrimaryButton.args = {
  children: "primary",
  color: "primary",
  size: "lg"
};
