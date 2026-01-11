// textNode.js - Custom Text node with dynamic sizing and variable handles

import { useState, useEffect, useRef } from 'react';
import { Handle, Position } from 'reactflow';
import './nodeStyles.css';

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || '{{input}}');
  const [nodeSize, setNodeSize] = useState({ width: 200, height: 'auto' });
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);

  // Extract variables from text (e.g., {{input}}, {{variable_name}})
  useEffect(() => {
    // Regex to match {{ variable }} pattern
    // Captures valid JS identifiers surrounded by double curly braces
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;

    const matches = [...text.matchAll(regex)];
    const foundVariables = matches.map(match => match[1].trim());

    // Remove duplicates to avoid multiple handles for same variable
    const uniqueVariables = [...new Set(foundVariables)];

    setVariables(uniqueVariables);
  }, [text]);

  // Adjust node size based on content
  useEffect(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;

      // Reset height to auto to get the correct scrollHeight
      textarea.style.height = 'auto';

      // Calculate width based on longest line
      const lines = text.split('\n');
      const longestLineLength = Math.max(...lines.map(line => line.length), 0);

      // Base width is 200, max is 600. simple heuristic: 8px per char
      const newWidth = Math.max(200, Math.min(600, longestLineLength * 8 + 40));

      // Calculate height
      const newHeight = textarea.scrollHeight + 10; // buffer

      setNodeSize({
        width: newWidth,
        height: 'auto' // Container grows automatically, but we set style width
      });

      // Apply height to textarea
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [text]);

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    if (data?.onChange) {
      data.onChange(newText);
    }
    // Also update data directly if onChange isn't provided (fallback)
    data.text = newText;
  };

  return (
    <div
      className="node-base node-text"
      style={{
        width: `${nodeSize.width}px`,
        minHeight: '100px',
        transition: 'width 0.2s ease'
      }}
    >
      {/* Dynamic Handles for Variables */}
      {variables.map((variable, index) => {
        // Calculate vertical position: distributed evenly
        // If 1 var: 50%
        // If 2 vars: 33%, 66%
        // etc.
        const top = ((index + 1) * 100) / (variables.length + 1);

        return (
          <Handle
            key={`${id}-${variable}`}
            type="target"
            position={Position.Left}
            id={`${id}-${variable}`}
            style={{ top: `${top}%` }}
            title={`Variable: ${variable}`}
            className="node-handle-input"
          />
        );
      })}

      <div className="node-title node-title-text">
        Text
      </div>

      <div className="node-field">
        <label className="node-label">
          Text:
        </label>
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleTextChange}
          className="node-textarea"
          rows={1}
          style={{
            minHeight: '40px',
            overflow: 'hidden',
            resize: 'none',
            fontFamily: 'monospace' // Better for code/variables
          }}
          placeholder="Type something like {{input}}..."
        />
      </div>

      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
      />
    </div>
  );
};
