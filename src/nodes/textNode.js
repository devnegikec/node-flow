// textNode.js - Text node using BaseNode abstraction

import { createNode } from './BaseNode';

const textNodeConfig = {
  title: 'Text',
  nodeType: 'text',
  outputs: [
    { id: 'output' }
  ],
  fields: [
    {
      name: 'text',
      type: 'text',
      label: 'Text:',
      defaultValue: '{{input}}'
    }
  ]
};

export const TextNode = createNode(textNodeConfig);
