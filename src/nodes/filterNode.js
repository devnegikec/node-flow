// filterNode.js - A node for filtering data based on conditions

import { createNode } from './BaseNode';

const filterNodeConfig = {
    title: 'Filter',
    nodeType: 'filter',
    description: 'Filter data based on conditions',
    wide: true,
    inputs: [
        { id: 'input' }
    ],
    outputs: [
        { id: 'passed' },
        { id: 'failed' }
    ],
    fields: [
        {
            name: 'filterField',
            type: 'text',
            label: 'Field to Filter',
            placeholder: 'e.g., age',
            defaultValue: 'field'
        },
        {
            name: 'condition',
            type: 'select',
            label: 'Condition',
            defaultValue: 'equals',
            options: [
                { value: 'equals', label: 'Equals' },
                { value: 'contains', label: 'Contains' },
                { value: 'greaterThan', label: 'Greater Than' },
                { value: 'lessThan', label: 'Less Than' }
            ]
        },
        {
            name: 'value',
            type: 'text',
            label: 'Value',
            placeholder: 'Comparison value',
            defaultValue: ''
        }
    ]
};

export const FilterNode = createNode(filterNodeConfig);
