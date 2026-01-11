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
        
        // 1. Filter out edges that are no longer in the text
        const remainingEdges = edges.filter(edge => {
            if (edge.target === textNodeId && edge.id.startsWith('auto-')) {
                const varName = edge.source; 
                return variableNames.includes(varName);
            }
            return true;
        });

        const newEdges = [...remainingEdges];
        let hasChanges = edges.length !== remainingEdges.length;

        // 2. Add new edges
        variableNames.forEach((varName) => {
            const sourceNode = nodes.find(n => n.id === varName);
            const edgeExists = newEdges.some(e => e.target === textNodeId && e.source === varName);

            if (sourceNode && !edgeExists) {
                newEdges.push({
                    id: `auto-${varName}-${textNodeId}`,
                    source: varName,
                    target: textNodeId,
                    // Handle IDs following BaseNode pattern
                    sourceHandle: `${varName}-value`, 
                    targetHandle: `${textNodeId}-variable-input`,
                    
                    // CONSISTENT STYLE START
                    type: 'smoothstep', 
                    animated: true,
                    markerEnd: {
                        type: 'arrowclosed', // Standard ReactFlow marker to match your onConnect
                        height: '20px', 
                        width: '20px',
                    },
                    style: { 
                        strokeWidth: 1 
                    },
                    // CONSISTENT STYLE END
                });
                hasChanges = true;
            }
        });

        if (hasChanges) {
            set({ edges: newEdges });
        }
    },
  }));
