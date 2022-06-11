import CommentInput from '../components/Comment/CommentInput';

//👇 This default export determines where your story goes in the story list
export default {
    title: 'Components/CommentInput',
    component: CommentInput,
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => <CommentInput {...args} />;

export const InputComment = Template.bind({});
InputComment.args = {};