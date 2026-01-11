import React, { useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';

const MyTextNode = ({ id, data }) => {
  const [text, setText] = useState(data.text || "");

  // Detect variables like {{input_0}}
  useEffect(() => {
    const variableRegex = /\{\{(.*?)\}\}/g;
    const matches = [...new Set([...text.matchAll(variableRegex)].map(m => m[1]))];
    
    // Pass the detected variables back to the main App
    if (data.onVariablesChange) {
      data.onVariablesChange(id, matches);
    }
  }, [text, id, data]);

  return (
    <div style={{ 
      padding: '15px', 
      borderRadius: '8px', 
      border: '1px solid #6366f1', 
      background: '#ffffff', 
      minWidth: '240px',
      boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
    }}>
      <div style={{ fontSize: '12px', fontWeight: '600', color: '#6366f1', marginBottom: '10px' }}>
        Text Node
      </div>
      
      {/* SINGLE Shared Target Handle on the Left */}
      <Handle 
        type="target" 
        position={Position.Left} 
        id="single-target" 
        style={{ background: '#6366f1', width: '10px', height: '10px' }} 
      />

      <textarea 
        value={text} 
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text with {{input_0}}..."
        style={{ 
          width: '100%', 
          minHeight: '80px', 
          fontSize: '13px', 
          border: '1px solid #e5e7eb',
          borderRadius: '6px',
          padding: '8px',
          outline: 'none',
          resize: 'vertical'
        }}
      />
      
      <Handle 
        type="source" 
        position={Position.Right} 
        style={{ background: '#9ca3af' }} 
      />
    </div>
  );
};

export default MyTextNode;