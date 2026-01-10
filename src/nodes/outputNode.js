// outputNode.js - Output node using BaseNode abstraction

import { createNode } from './BaseNode';

const outputNodeConfig = {
  title: 'Output',
  nodeType: 'output',
  inputs: [
    { id: 'value' }
  ],
  fields: [
    {
      name: 'outputName',
      type: 'text',
      label: 'Name:',
      defaultValue: 'output_'
    },
    {
      name: 'outputType',
      type: 'select',
      label: 'Type:',
      defaultValue: 'Text',
      options: [
        { value: 'Text', label: 'Text' },
        { value: 'File', label: 'Image' }
      ]
    }
  ]
};

export const OutputNode = createNode(outputNodeConfig);
