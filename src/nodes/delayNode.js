// delayNode.js - A node for adding delays/timeouts in the flow

import { createNode } from './BaseNode';

const delayNodeConfig = {
    title: 'Delay',
    nodeType: 'delay',
    description: 'Add a time delay to execution',
    wide: true,
    inputs: [
        { id: 'trigger' }
    ],
    outputs: [
        { id: 'delayed' }
    ],
    fields: [
        {
            name: 'delayAmount',
            type: 'slider',
            label: 'Delay (seconds)',
            min: 0,
            max: 60,
            step: 1,
            defaultValue: 5
        },
        {
            name: 'unit',
            type: 'select',
            label: 'Time Unit',
            defaultValue: 'seconds',
            options: [
                { value: 'milliseconds', label: 'Milliseconds' },
                { value: 'seconds', label: 'Seconds' },
                { value: 'minutes', label: 'Minutes' }
            ]
        },
        {
            name: 'passThrough',
            type: 'checkbox',
            label: 'Pass Through Data',
            defaultValue: true
        },
        {
            name: 'errorOnTimeout',
            type: 'checkbox',
            label: 'Error on Timeout',
            defaultValue: false
        }
    ]
};

export const DelayNode = createNode(delayNodeConfig);
