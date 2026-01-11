import React from 'react';
import { Handle, Position } from 'reactflow';

const MyInputNode = ({ id }) => {
  return (
    <div style={{ 
      padding: '12px', 
      borderRadius: '8px', 
      border: '1px solid #d1d5db', 
      background: '#ffffff', 
      minWidth: '160px',
      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <span style={{ fontSize: '14px' }}>➡️</span>
        <span style={{ fontSize: '12px', fontWeight: '600', color: '#374151' }}>Input</span>
      </div>
      <div style={{ 
        background: '#f3f4f6', 
        padding: '4px 8px', 
        borderRadius: '4px', 
        fontSize: '13px', 
        fontFamily: 'monospace',
        color: '#1f2937' 
      }}>
        {id}
      </div>
      <Handle 
        type="source" 
        position={Position.Right} 
        style={{ background: '#6366f1', width: '8px', height: '8px' }} 
      />
    </div>
  );
};

export default MyInputNode;