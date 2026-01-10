// BaseNode.js - Flexible abstraction for creating nodes with CSS utility classes

import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import './nodeStyles.css';

/**
 * BaseNode - A flexible, reusable component for creating nodes with various configurations
 * 
 * @param {string} id - Unique node identifier
 * @param {object} data - Node data passed from ReactFlow
 * @param {object} config - Node configuration object with the following properties:
 *   - title: Node title (required)
 *   - nodeType: Type of node for styling (e.g., 'input', 'output', 'filter')
 *   - description: Optional description text
 *   - inputs: Array of input handle configurations
 *   - outputs: Array of output handle configurations
 *   - fields: Array of form field configurations
 *   - className: Additional CSS classes
 *   - defaultValues: Default values for fields
 */
export const BaseNode = ({ id, data, config }) => {
  // Initialize state for all fields
  const [fieldValues, setFieldValues] = useState(() => {
    const initialState = {};
    if (config.fields) {
      config.fields.forEach(field => {
        const defaultValue = data?.[field.name] || config.defaultValues?.[field.name] || field.defaultValue || '';
        initialState[field.name] = defaultValue;
      });
    }
    return initialState;
  });

  // Handle field value changes
  const handleFieldChange = (fieldName, value) => {
    setFieldValues(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  // Build CSS classes
  const nodeType = config.nodeType || 'base';
  const nodeClasses = [
    config.wide ? 'node-base-wide' : 'node-base',
    `node-${nodeType}`,
    config.className
  ].filter(Boolean).join(' ');

  const titleClasses = [
    'node-title',
    `node-title-${nodeType}`
  ].join(' ');

  // Render input handles
  const renderInputHandles = () => {
    if (!config.inputs || config.inputs.length === 0) return null;

    return config.inputs.map((input, index) => {
      const position = config.inputs.length > 1
        ? { top: `${((index + 1) * 100) / (config.inputs.length + 1)}%` }
        : {};

      return (
        <Handle
          key={`input-${input.id}`}
          type="target"
          position={input.position || Position.Left}
          id={`${id}-${input.id}`}
          style={position}
          className={input.className}
        />
      );
    });
  };

  // Render output handles
  const renderOutputHandles = () => {
    if (!config.outputs || config.outputs.length === 0) return null;

    return config.outputs.map((output, index) => {
      const position = config.outputs.length > 1
        ? { top: `${((index + 1) * 100) / (config.outputs.length + 1)}%` }
        : {};

      return (
        <Handle
          key={`output-${output.id}`}
          type="source"
          position={output.position || Position.Right}
          id={`${id}-${output.id}`}
          style={position}
          className={output.className}
        />
      );
    });
  };

  // Render form fields
  const renderFields = () => {
    if (!config.fields || config.fields.length === 0) return null;

    return config.fields.map(field => {
      // Render different field types
      switch (field.type) {
        case 'text':
        case 'number':
        case 'email':
          return (
            <div key={field.name} className="node-field">
              {field.label && <label className="node-label">{field.label}</label>}
              <input
                type={field.type}
                value={fieldValues[field.name]}
                onChange={(e) => handleFieldChange(field.name, e.target.value)}
                placeholder={field.placeholder}
                className={`node-input-base node-input-${field.type}`}
              />
            </div>
          );

        case 'textarea':
          return (
            <div key={field.name} className="node-field">
              {field.label && <label className="node-label">{field.label}</label>}
              <textarea
                value={fieldValues[field.name]}
                onChange={(e) => handleFieldChange(field.name, e.target.value)}
                placeholder={field.placeholder}
                rows={field.rows || 3}
                className="node-textarea"
              />
            </div>
          );

        case 'select':
          return (
            <div key={field.name} className="node-field">
              {field.label && <label className="node-label">{field.label}</label>}
              <select
                value={fieldValues[field.name]}
                onChange={(e) => handleFieldChange(field.name, e.target.value)}
                className="node-select"
              >
                {field.options.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          );

        case 'checkbox':
          return (
            <div key={field.name} className="node-field node-field-inline">
              <input
                type="checkbox"
                checked={fieldValues[field.name]}
                onChange={(e) => handleFieldChange(field.name, e.target.checked)}
                className="node-checkbox"
              />
              {field.label && <label className="node-label node-label-inline">{field.label}</label>}
            </div>
          );

        case 'slider':
          return (
            <div key={field.name} className="node-field">
              {field.label && (
                <label className="node-label">
                  {field.label}: {fieldValues[field.name]}
                </label>
              )}
              <input
                type="range"
                min={field.min || 0}
                max={field.max || 100}
                step={field.step || 1}
                value={fieldValues[field.name]}
                onChange={(e) => handleFieldChange(field.name, e.target.value)}
                className="node-slider"
              />
            </div>
          );

        default:
          return null;
      }
    });
  };

  return (
    <div className={nodeClasses}>
      {renderInputHandles()}

      {config.title && (
        <div className={titleClasses}>
          {config.title}
        </div>
      )}

      {config.description && (
        <div className="node-description">
          {config.description}
        </div>
      )}

      {renderFields()}

      {config.customContent && config.customContent(fieldValues, handleFieldChange)}

      {renderOutputHandles()}
    </div>
  );
};

/**
 * createNode - Factory function to create a node component from a configuration
 * 
 * @param {object} config - Node configuration
 * @returns {React.Component} - Configured node component
 */
export const createNode = (config) => {
  return ({ id, data }) => <BaseNode id={id} data={data} config={config} />;
};
