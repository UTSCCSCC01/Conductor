import NavBarOne from '../components/NavBar/NavBarOne';
import NavBarTwo from '../components/NavBar/NavBarTwo';

//👇 This default export determines where your story goes in the story list
export default {
    title: 'Components/NavBar',
    component: NavBarTwo,
};

//👇 We create a “template” of how args map to rendering
const Template1 = (args) => <NavBarTwo {...args} />;
const Template2 = (args) => <NavBarOne {...args} />;

export const LoggedIn = Template1.bind({});
LoggedIn.args = {};

export const LoggedOut = Template2.bind({});
LoggedOut.args = {};