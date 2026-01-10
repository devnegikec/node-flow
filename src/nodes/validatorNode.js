// validatorNode.js - A node for data validation

import { createNode } from './BaseNode';

const validatorNodeConfig = {
    title: 'Validator',
    nodeType: 'validator',
    description: 'Validate data against rules',
    wide: true,
    inputs: [
        { id: 'data' }
    ],
    outputs: [
        { id: 'valid' },
        { id: 'invalid' }
    ],
    fields: [
        {
            name: 'validationType',
            type: 'select',
            label: 'Validation Type',
            defaultValue: 'required',
            options: [
                { value: 'required', label: 'Required Field' },
                { value: 'email', label: 'Email Format' },
                { value: 'number', label: 'Numeric Only' },
                { value: 'regex', label: 'Custom Regex' },
                { value: 'length', label: 'Length Check' }
            ]
        },
        {
            name: 'pattern',
            type: 'text',
            label: 'Regex Pattern',
            placeholder: '^[A-Za-z]+$',
            defaultValue: ''
        },
        {
            name: 'minLength',
            type: 'number',
            label: 'Min Length',
            defaultValue: 0
        },
        {
            name: 'maxLength',
            type: 'number',
            label: 'Max Length',
            defaultValue: 100
        },
        {
            name: 'strictMode',
            type: 'checkbox',
            label: 'Strict Mode',
            defaultValue: false
        }
    ]
};

export const ValidatorNode = createNode(validatorNodeConfig);
