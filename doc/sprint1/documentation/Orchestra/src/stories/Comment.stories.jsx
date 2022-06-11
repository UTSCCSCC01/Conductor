import Comment from '../components/Comment/Comment';

export default {
    title: 'Components/Comment',
    component: Comment,
};

const Template = (args) => <Comment {...args} />;

export const UserComment = Template.bind({});
UserComment.args = {
    comment: "Comment 1",
    isDeveloper: false,
};