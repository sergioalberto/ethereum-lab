import React from 'react';

import { AddParticipantView } from './AddParticipantView';

export default {
    title: 'Components/AddParticipantView',
    component: AddParticipantView,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {},
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <AddParticipantView {...args} />;

export const AddParticipant = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
AddParticipant.args = {};
