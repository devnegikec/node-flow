// transformNode.js - A node for transforming data

import { createNode } from './BaseNode';

const transformNodeConfig = {
    title: 'Transform',
    nodeType: 'transform',
    description: 'Transform and modify data',
    wide: true,
    inputs: [
        { id: 'input' }
    ],
    outputs: [
        { id: 'output' }
    ],
    fields: [
        {
            name: 'operation',
            type: 'select',
            label: 'Operation',
            defaultValue: 'uppercase',
            options: [
                { value: 'uppercase', label: 'Uppercase' },
                { value: 'lowercase', label: 'Lowercase' },
                { value: 'reverse', label: 'Reverse' },
                { value: 'trim', label: 'Trim' },
                { value: 'custom', label: 'Custom' }
            ]
        },
        {
            name: 'customTransform',
            type: 'textarea',
            label: 'Custom Transformation',
            placeholder: 'Enter custom JS expression',
            rows: 2,
            defaultValue: ''
        }
    ]
};

export const TransformNode = createNode(transformNodeConfig);
