import React, { useState, useCallback } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  useNodesState, 
  useEdgesState,
  addEdge
} from 'reactflow';
import 'reactflow/dist/style.css';

import MyInputNode from './nodes/MyInputNode';
import MyTextNode from './nodes/MyTextNode';

const nodeTypes = {
  customInput: MyInputNode,
  customText: MyTextNode,
};

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [inputCount, setInputCount] = useState(0);

  // Logic to auto-connect based on variable parsing
  const handleVariablesChange = useCallback((textNodeId, variables) => {
    setEdges((currentEdges) => {
      let updatedEdges = [...currentEdges];
      let needsUpdate = false;

      variables.forEach((varName) => {
        // Find if an Input node with that ID exists
        const sourceExists = nodes.some(n => n.id === varName);
        // Check if connection already exists
        const alreadyConnected = updatedEdges.some(
          (e) => e.source === varName && e.target === textNodeId
        );

        if (sourceExists && !alreadyConnected) {
          updatedEdges.push({
            id: `auto-${varName}-${textNodeId}`,
            source: varName,
            target: textNodeId,
            targetHandle: 'single-target',
            animated: true,
            style: { stroke: '#6366f1', strokeWidth: 2 }
          });
          needsUpdate = true;
        }
      });

      return needsUpdate ? updatedEdges : currentEdges;
    });
  }, [nodes]);

  const addInputNode = () => {
    const id = `input_${inputCount}`;
    const newNode = {
      id,
      type: 'customInput',
      position: { x: 100, y: nodes.length * 100 + 50 },
      data: { label: id },
    };
    setNodes((nds) => nds.concat(newNode));
    setInputCount((prev) => prev + 1);
  };

  const addTextNode = () => {
    const id = `text_${nodes.length}`;
    const newNode = {
      id,
      type: 'customText',
      position: { x: 450, y: 150 },
      data: { onVariablesChange: handleVariablesChange },
    };
    setNodes((nds) => nds.concat(newNode));
  };

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#f9fafb' }}>
      <div style={{ position: 'absolute', zIndex: 10, padding: '20px', display: 'flex', gap: '10px' }}>
        <button onClick={addInputNode} style={btnStyle}>Add Input Node</button>
        <button onClick={addTextNode} style={btnStyle}>Add Text Node</button>
      </div>
      
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onConnect={(params) => setEdges((eds) => addEdge(params, eds))}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background variant="dots" gap={12} size={1} />
        <Controls />
      </ReactFlow>
    </div>
  );
}

const btnStyle = {
  padding: '10px 20px',
  backgroundColor: '#6366f1',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: '600',
  boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)'
};

export default App;