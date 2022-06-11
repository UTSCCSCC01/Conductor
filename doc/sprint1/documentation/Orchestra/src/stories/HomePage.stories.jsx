import React from 'react';

import HomePage from '../pages/HomePage/HomePage';

export default {
  /*
   * Example 
   */
  title: 'Pages/HomePage',
  component: HomePage,
};

const Template = (args) => <HomePage {...args} />;

export const Home = Template.bind({});
Home.args = {
  login: true,
};