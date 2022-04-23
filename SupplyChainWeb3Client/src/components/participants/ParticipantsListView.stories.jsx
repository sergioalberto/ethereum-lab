import React from 'react';

import { ParticipantsListView } from './ParticipantsListView';

export default {
    title: 'Components/ParticipantsListView',
    component: ParticipantsListView,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {},
};

const manyParticipants = [
    {
        participantID: "1",
        participantAddress: "0xb3c8CbBAA2BC5D37540770Eb6b446078dD208aC5",
        userName: "Sergio",
        participantType: "Manufacturer"
    }, {
        participantID: "2",
        participantAddress: "0xb2c8CbBAA2BC5D37540770Eb6b446078dD208aC7",
        userName: "Alberto",
        participantType: "Supplier"
    }, {
        participantID: "3",
        participantAddress: "0xb5c8CbBAA2BC5D37540770Eb6b446078dD208aC9",
        userName: "Wen",
        participantType: "Consumer"
    }
];

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <ParticipantsListView {...args} />;

export const EmptyParticipants = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
EmptyParticipants.args = {
    data: [],
};

export const SeveralParticipants = Template.bind({});
SeveralParticipants.args = {
    data: manyParticipants,
};
