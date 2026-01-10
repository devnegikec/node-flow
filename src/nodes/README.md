# Node Abstraction System

## Overview

This directory contains a flexible node abstraction system that significantly reduces code duplication and makes it easy to create new nodes for the ReactFlow-based application.

## Architecture

### BaseNode.js
The core abstraction that provides:
- **Configurable Inputs/Outputs**: Easily define multiple connection points
- **Dynamic Field Types**: Support for text, textarea, select, checkbox, slider, number, and email fields
- **Customizable Styling**: Override default styles at the node or field level
- **Automatic State Management**: Built-in state handling for all form fields
- **Positioned Handles**: Automatic positioning of multiple handles

### createNode Factory Function
A convenient factory function that creates a node component from a configuration object.

## Creating New Nodes

### Simple Example
```javascript
import { createNode } from './BaseNode';

const myNodeConfig = {
  title: 'My Custom Node',
  description: 'Does something awesome',
  inputs: [
    { id: 'input', position: 'left' }
  ],
  outputs: [
    { id: 'output', position: 'right' }
  ],
  fields: [
    {
      name: 'myField',
      type: 'text',
      label: 'My Field',
      defaultValue: 'Hello'
    }
  ]
};

export const MyNode = createNode(myNodeConfig);
```

### Configuration Options

#### Node Configuration Object
- **title** (string, required): The node's display title
- **description** (string, optional): Subtitle or description text
- **inputs** (array, optional): Array of input handle configurations
- **outputs** (array, optional): Array of output handle configurations
- **fields** (array, optional): Array of form field configurations
- **style** (object, optional): Custom CSS styles for the node container
- **titleStyle** (object, optional): Custom CSS styles for the title
- **descriptionStyle** (object, optional): Custom CSS styles for the description
- **defaultValues** (object, optional): Default values for fields
- **customContent** (function, optional): Custom render function for additional content

#### Input/Output Handle Configuration
```javascript
{
  id: 'unique-id',           // Required: unique identifier
  position: Position.Left,   // Optional: Left, Right, Top, Bottom
  style: {}                 // Optional: custom CSS styles
}
```

#### Field Configuration
All fields support:
- **name** (string, required): Field identifier
- **type** (string, required): Field type (see below)
- **label** (string, optional): Display label
- **defaultValue** (any, optional): Default value
- **containerStyle** (object, optional): Container CSS styles
- **labelStyle** (object, optional): Label CSS styles
- **inputStyle** (object, optional): Input CSS styles

##### Field Types

**Text/Number/Email**
```javascript
{
  name: 'fieldName',
  type: 'text', // or 'number', 'email'
  label: 'Field Label',
  placeholder: 'Enter text...',
  defaultValue: ''
}
```

**Textarea**
```javascript
{
  name: 'description',
  type: 'textarea',
  label: 'Description',
  placeholder: 'Enter description...',
  rows: 3,
  defaultValue: ''
}
```

**Select/Dropdown**
```javascript
{
  name: 'choice',
  type: 'select',
  label: 'Choose Option',
  defaultValue: 'option1',
  options: [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' }
  ]
}
```

**Checkbox**
```javascript
{
  name: 'enabled',
  type: 'checkbox',
  label: 'Enable Feature',
  defaultValue: false
}
```

**Slider/Range**
```javascript
{
  name: 'amount',
  type: 'slider',
  label: 'Amount',
  min: 0,
  max: 100,
  step: 1,
  defaultValue: 50
}
```

## Example Nodes

### 1. FilterNode
- **Purpose**: Filter data based on conditions
- **Features**: 
  - Multiple outputs (passed/failed)
  - Select field for conditions
  - Custom orange styling
- **Demonstrates**: Multiple outputs, select fields, custom colors

### 2. TransformNode
- **Purpose**: Transform and modify data
- **Features**:
  - Textarea for custom transformations
  - Predefined operations
  - Green styling
- **Demonstrates**: Textarea fields, operation selection

### 3. AggregatorNode
- **Purpose**: Combine multiple data sources
- **Features**:
  - Three input handles
  - Checkbox for null handling
  - Blue styling
- **Demonstrates**: Multiple inputs, checkbox fields

### 4. ValidatorNode
- **Purpose**: Validate data against rules
- **Features**:
  - Number inputs for length validation
  - Regex pattern support
  - Multiple outputs
  - Pink styling
- **Demonstrates**: Number fields, complex validation config

### 5. DelayNode
- **Purpose**: Add time delays to execution
- **Features**:
  - Slider for delay amount
  - Time unit selection
  - Purple styling
- **Demonstrates**: Slider field, timing controls

## Benefits of This Abstraction

### Before
- Each node required 30-50 lines of boilerplate code
- Styling was duplicated across all nodes
- Adding new field types meant updating all nodes
- No consistent UI/UX across nodes

### After
- New nodes defined in 10-20 lines of configuration
- Centralized styling with easy customization
- New field types available to all nodes immediately
- Consistent, polished UI across all nodes

### Example: Creating a New Node

**Before (Traditional Approach)**:
```javascript
// ~50 lines of boilerplate code with useState, handlers, JSX structure, etc.
```

**After (Using Abstraction)**:
```javascript
// ~15 lines of configuration
const config = {
  title: 'My Node',
  inputs: [{ id: 'in' }],
  outputs: [{ id: 'out' }],
  fields: [{ name: 'field1', type: 'text', label: 'Field 1' }]
};
export const MyNode = createNode(config);
```

## Future Enhancements

Possible extensions to the abstraction:
1. **Node Templates**: Pre-configured node types for common patterns
2. **Validation Rules**: Built-in field validation
3. **Conditional Fields**: Show/hide fields based on other field values
4. **Custom Renders**: More flexibility in custom content rendering
5. **Themes**: Predefined color schemes for different node categories
6. **Icons**: Support for node icons
7. **Drag Handles**: Custom drag handle positioning
8. **Resize Support**: Make nodes resizable
9. **Export/Import**: Save and load node configurations
10. **Visual Builder**: UI tool to build node configurations

## Migrating Existing Nodes

Existing nodes (InputNode, OutputNode, LLMNode, TextNode) can continue to work as-is. To migrate them to use the abstraction:

1. Extract the node configuration
2. Convert state management to field definitions
3. Replace JSX with configuration
4. Apply using `createNode()`

Example migration is shown in the comparison above.

## Usage in Application

```javascript
// In your ReactFlow component
import { FilterNode, TransformNode, AggregatorNode } from './nodes';

const nodeTypes = {
  filter: FilterNode,
  transform: TransformNode,
  aggregator: AggregatorNode,
  // ... other nodes
};

// Use in ReactFlow
<ReactFlow nodeTypes={nodeTypes} ... />
```
