import React from 'react';

import BotDetailPage from '../pages/BotDetailPage/BotDetailPage';

export default {
  /*
   * Example 
   */
  title: 'Pages/BotDetailPage',
  component: BotDetailPage,
};

const Template = (args) => <BotDetailPage {...args} />;

export const BotDetail = Template.bind({});
BotDetail.args = {};