// aggregatorNode.js - A node for combining multiple inputs

import { createNode } from './BaseNode';

const aggregatorNodeConfig = {
    title: 'Aggregator',
    nodeType: 'aggregator',
    description: 'Combine multiple data sources',
    wide: true,
    inputs: [
        { id: 'input1' },
        { id: 'input2' },
        { id: 'input3' }
    ],
    outputs: [
        { id: 'combined' }
    ],
    fields: [
        {
            name: 'aggregationType',
            type: 'select',
            label: 'Aggregation Type',
            defaultValue: 'merge',
            options: [
                { value: 'merge', label: 'Merge Objects' },
                { value: 'concat', label: 'Concatenate Arrays' },
                { value: 'sum', label: 'Sum Values' },
                { value: 'average', label: 'Average Values' }
            ]
        },
        {
            name: 'separator',
            type: 'text',
            label: 'Separator (for concat)',
            placeholder: ', ',
            defaultValue: ','
        },
        {
            name: 'ignoreNull',
            type: 'checkbox',
            label: 'Ignore Null Values',
            defaultValue: true
        }
    ]
};

export const AggregatorNode = createNode(aggregatorNodeConfig);
