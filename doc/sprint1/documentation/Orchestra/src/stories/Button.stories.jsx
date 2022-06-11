import React from 'react';
import BlueButton from '../components/Button/BlueButton';
import PurpleButton from '../components/Button/PurpleButton';

export default {
  title: 'Components/Button',
  component: BlueButton,
};

const Template1 = (args) => <BlueButton {...args} />;
const Template2 = (args) => <PurpleButton {...args} />;

export const Blue = Template1.bind({});
export const Purple = Template2.bind({});

Blue.args = {
  text: "Submit",
};

Purple.args = {
  text: "< Back to the list",
};