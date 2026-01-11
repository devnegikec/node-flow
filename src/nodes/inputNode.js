// inputNode.js - Input node using BaseNode abstraction

import { createNode } from './BaseNode';

const inputNodeConfig = {
  title: 'Input',
  nodeType: 'input',
  outputs: [
    { id: 'value' }
  ],
  fields: [
    {
      name: 'inputName',
      type: 'text',
      label: 'Name:',
    },
    {
      name: 'inputType',
      type: 'select',
      label: 'Type:',
      defaultValue: 'Text',
      options: [
        { value: 'Text', label: 'Text' },
        { value: 'File', label: 'File' }
      ]
    }
  ]
};

export const InputNode = createNode(inputNodeConfig);
