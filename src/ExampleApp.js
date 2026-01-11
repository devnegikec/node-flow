import React, { useState, useCallback, useEffect } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  Handle, 
  Position, 
  useNodesState, 
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';

// --- Custom Input Node ---
const InputNode = ({ id }) => (
  <div style={{ 
    padding: '10px', 
    borderRadius: '8px', 
    border: '1px solid #9191c1', 
    background: '#eeefff', 
    minWidth: '150px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
  }}>
    <div style={{ fontSize: '10px', color: '#666', marginBottom: '4px' }}>Input Node</div>
    <div style={{ fontWeight: 'bold', color: '#333' }}>{id}</div>
    <Handle type="source" position={Position.Right} style={{ background: '#555', width: '8px', height: '8px' }} />
  </div>
);

// --- Custom Text Node ---
const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data.text || "");

  // Regex to find variables like {{input_0}}
  const variableRegex = /\{\{(.*?)\}\}/g;
  const matches = [...new Set([...text.matchAll(variableRegex)].map(m => m[1]))];

  useEffect(() => {
    // Notify parent to connect found variables to this node's single handle
    data.onVariablesChange(id, matches);
  }, [matches.join(','), id]);

  return (
    <div style={{ 
      padding: '15px', 
      borderRadius: '8px', 
      border: '1px solid #777', 
      background: '#fff', 
      minWidth: '220px',
      position: 'relative'
    }}>
      <div style={{ fontSize: '10px', color: '#888', marginBottom: '8px' }}>Text Node</div>
      
      {/* SINGLE Shared Handle on the Left */}
      <Handle 
        type="target" 
        position={Position.Left} 
        id="single-target" 
        style={{ background: '#555', width: '10px', height: '10px' }} 
      />

      <textarea 
        value={text} 
        onChange={(e) => setText(e.target.value)}
        placeholder="Type {{input_0}} here..."
        style={{ 
          width: '100%', 
          minHeight: '60px', 
          fontSize: '13px', 
          border: '1px solid #ddd',
          borderRadius: '4px',
          padding: '5px'
        }}
      />
      
      <Handle type="source" position={Position.Right} style={{ background: '#555' }} />
    </div>
  );
};

// --- Main Flow Component ---
const nodeTypes = { customInput: InputNode, customText: TextNode };

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [inputCount, setInputCount] = useState(0);

  const handleVariablesChange = useCallback((textNodeId, variables) => {
    setEdges((prevEdges) => {
      let newEdges = [...prevEdges];
      
      variables.forEach((varName) => {
        // Find if a node with the ID inside {{ }} exists
        const sourceNode = nodes.find(n => n.id === varName);
        
        // Check if an edge already exists between this source and this text node
        const edgeExists = newEdges.find(e => e.source === varName && e.target === textNodeId);

        if (sourceNode && !edgeExists) {
          newEdges.push({
            id: `edge-${varName}-${textNodeId}`,
            source: varName,
            target: textNodeId,
            targetHandle: 'single-target', // All connect to the same handle
            animated: true,
            style: { stroke: '#7b42ff', strokeWidth: 2, strokeDasharray: '5,5' }
          });
        }
      });
      return newEdges;
    });
  }, [nodes]);

  const addInputNode = () => {
    const id = `input_${inputCount}`;
    setNodes((nds) => nds.concat({
      id,
      type: 'customInput',
      position: { x: 50, y: nodes.length * 80 + 50 },
      data: { label: id },
    }));
    setInputCount((c) => c + 1);
  };

  const addTextNode = () => {
    const id = `text_${nodes.length}`;
    setNodes((nds) => nds.concat({
      id,
      type: 'customText',
      position: { x: 350, y: 100 },
      data: { onVariablesChange: handleVariablesChange },
    }));
  };

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#f0f2f5' }}>
      <div style={{ position: 'absolute', zIndex: 10, padding: '15px', display: 'flex', gap: '10px' }}>
        <button onClick={addInputNode} style={btnStyle}>+ Input Node</button>
        <button onClick={addTextNode} style={btnStyle}>+ Text Node</button>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background color="#ccc" gap={20} />
        <Controls />
      </ReactFlow>
    </div>
  );
}

const btnStyle = {
  padding: '8px 16px',
  cursor: 'pointer',
  background: '#fff',
  border: '1px solid #ccc',
  borderRadius: '4px',
  fontWeight: 'bold'
};