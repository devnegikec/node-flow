// llmNode.js - LLM node using BaseNode abstraction

import { createNode } from './BaseNode';

const llmNodeConfig = {
  title: 'LLM',
  nodeType: 'llm',
  description: 'This is a LLM.',
  inputs: [
    { id: 'system' },
    { id: 'prompt' }
  ],
  outputs: [
    { id: 'response' }
  ]
};

export const LLMNode = createNode(llmNodeConfig);
