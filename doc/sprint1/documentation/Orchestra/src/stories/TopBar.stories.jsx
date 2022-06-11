import TopBar from '../components/TopBar/TopBar';

export default {
    title: 'Components/TopBar',
    component: TopBar,
};

const Template = (args) => <TopBar {...args} />;

export const Top = Template.bind({});
Top.args = {};