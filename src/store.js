// store.js

import { create } from "zustand";
import {
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    MarkerType,
  } from 'reactflow';

export const useStore = create((set, get) => ({
    nodes: [],
    edges: [],
    getNodeID: (type) => {
      const newIDs = {...get().nodeIDs};
      if (newIDs[type] === undefined) {
          newIDs[type] = 0;
      }
      const count = newIDs[type];
      newIDs[type] += 1;
      set({nodeIDs: newIDs});
      
      // Mapping internal types to the naming convention in your prompt
      if (type === 'customInput') return `input_${count}`;
      return `${type}_${count}`;
    },
    addNode: (node) => {
        set({
            nodes: [...get().nodes, node]
        });
    },
    onNodesChange: (changes) => {
      set({
        nodes: applyNodeChanges(changes, get().nodes),
      });
    },
    onEdgesChange: (changes) => {
      set({
        edges: applyEdgeChanges(changes, get().edges),
      });
    },
    onConnect: (connection) => {
      set({
        edges: addEdge({...connection, type: 'smoothstep', animated: true, markerEnd: {type: MarkerType.Arrow, height: '20px', width: '20px'}}, get().edges),
      });
    },
    updateNodeField: (nodeId, fieldName, fieldValue) => {
      set({
        nodes: get().nodes.map((node) => {
          if (node.id === nodeId) {
            node.data = { ...node.data, [fieldName]: fieldValue };
          }
  
          return node;
        }),
      });
    },
    syncEdgesWithVariables: (textNodeId, variableNames) => {
        const { nodes, edges } = get();
        
        // 1. Filter out edges that were auto-created for this node but are no longer in the text
        const remainingEdges = edges.filter(edge => {
            if (edge.target === textNodeId && edge.id.startsWith('auto-')) {
                const varName = edge.source; // In our logic, source ID = variable name
                return variableNames.includes(varName);
            }
            return true;
        });

        const newEdges = [...remainingEdges];
        let hasChanges = edges.length !== remainingEdges.length;

        // 2. Add new edges for variables that don't have one yet
        variableNames.forEach((varName) => {
            const sourceNodeExists = nodes.some(n => n.id === varName);
            const edgeExists = newEdges.some(e => e.target === textNodeId && e.source === varName);

            if (sourceNodeExists && !edgeExists) {
                newEdges.push({
                    id: `auto-${varName}-${textNodeId}`,
                    source: varName,
                    target: textNodeId,
                    targetHandle: 'variable-input', // This must match the Handle ID in TextNode
                    type: 'smoothstep',
                    animated: true,
                    style: { stroke: '#6366f1', strokeWidth: 2, strokeDasharray: '5,5' }
                });
                hasChanges = true;
            }
        });

        if (hasChanges) {
            set({ edges: newEdges });
        }
    },
  }));
