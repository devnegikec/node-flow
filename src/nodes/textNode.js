// textNode.js
import { useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from '../store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({
    syncEdges: state.syncEdgesWithVariables,
});

export const TextNode = ({ id, data }) => {
    const { syncEdges } = useStore(selector, shallow);
    const [text, setText] = useState(data?.text || '{{input_1}}');

    useEffect(() => {
        // Regex to find variables inside {{ }}
        const variableRegex = /\{\{(.*?)\}\}/g;
        const matches = [...new Set([...text.matchAll(variableRegex)].map(m => m[1]))];
        
        // Sync edges in the global store
        syncEdges(id, matches);
    }, [text, id, syncEdges]);

    return (
        <div className="node-base node-text">
            {/* Single Target Handle for all variable connections */}
            <Handle
                type="target"
                position={Position.Left}
                id="variable-input"
                className="node-handle-logic"
                style={{ background: '#6366f1' }}
            />

            <div className="node-title node-title-text">Text</div>
            
            <div className="node-field">
                <label className="node-label">Content:</label>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="node-textarea"
                    placeholder="Use {{node_id}} to link"
                    rows={4}
                    style={{ width: '100%', boxSizing: 'border-box' }}
                />
            </div>

            <Handle
                type="source"
                position={Position.Right}
                id="output"
                className="node-handle-output"
            />
        </div>
    );
};