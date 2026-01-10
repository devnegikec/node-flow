# Quick Reference Guide

## 🚀 Creating a New Node - 3 Steps

### Step 1: Define Configuration
```javascript
import { createNode } from './BaseNode';

const myNodeConfig = {
  // Required
  title: 'My Node Name',
  
  // Styling (pick a nodeType from available types)
  nodeType: 'input', // 'input' | 'output' | 'text' | 'llm' | 'filter' | 'transform' | 'aggregator' | 'validator' | 'delay'
  
  // Optional: Make node wider (220px instead of 200px)
  wide: true,
  
  // Optional: Description
  description: 'What this node does',
  
  // Define inputs
  inputs: [
    { id: 'input1' },
    { id: 'input2' }
  ],
  
  // Define outputs
  outputs: [
    { id: 'output1' },
    { id: 'output2' }
  ],
  
  // Define fields
  fields: [
    {
      name: 'fieldName',
      type: 'text', // 'text' | 'number' | 'email' | 'textarea' | 'select' | 'checkbox' | 'slider'
      label: 'Field Label',
      defaultValue: 'default value'
    }
  ]
};
```

### Step 2: Export Node
```javascript
export const MyNode = createNode(myNodeConfig);
```

### Step 3: Register in index.js
```javascript
export { MyNode } from './myNode';
```

---

## 📋 Field Types Reference

### Text Input
```javascript
{
  name: 'fieldName',
  type: 'text',
  label: 'Label',
  placeholder: 'Placeholder text',
  defaultValue: ''
}
```

### Number Input
```javascript
{
  name: 'count',
  type: 'number',
  label: 'Count',
  defaultValue: 0
}
```

### Email Input
```javascript
{
  name: 'email',
  type: 'email',
  label: 'Email Address',
  defaultValue: ''
}
```

### Textarea
```javascript
{
  name: 'description',
  type: 'textarea',
  label: 'Description',
  rows: 3,
  placeholder: 'Enter text...',
  defaultValue: ''
}
```

### Select/Dropdown
```javascript
{
  name: 'option',
  type: 'select',
  label: 'Choose Option',
  defaultValue: 'option1',
  options: [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ]
}
```

### Checkbox
```javascript
{
  name: 'enabled',
  type: 'checkbox',
  label: 'Enable Feature',
  defaultValue: false
}
```

### Slider
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

---

## 🎨 Available Node Types (Styling)

| nodeType | Color Theme | Border | Use For |
|----------|-------------|--------|---------|
| `input` | Light Blue | Blue | Input/Source nodes |
| `output` | Light Pink | Pink | Output/Sink nodes |
| `text` | Light Purple | Purple | Text processing |
| `llm` | Light Orange | Orange | AI/LLM operations |
| `filter` | Light Orange | Orange | Filtering operations |
| `transform` | Light Green | Green | Data transformation |
| `aggregator` | Light Blue | Blue | Data aggregation |
| `validator` | Light Pink | Pink | Data validation |
| `delay` | Light Purple | Purple | Timing operations |

---

## 🔧 Common Patterns

### Pattern 1: Simple Input/Output Node
```javascript
const simpleConfig = {
  title: 'Process',
  nodeType: 'transform',
  inputs: [{ id: 'input' }],
  outputs: [{ id: 'output' }],
  fields: [
    { name: 'setting', type: 'text', label: 'Setting' }
  ]
};
```

### Pattern 2: Multiple Inputs
```javascript
const multiInputConfig = {
  title: 'Merge',
  nodeType: 'aggregator',
  inputs: [
    { id: 'input1' },
    { id: 'input2' },
    { id: 'input3' }
  ],
  outputs: [{ id: 'merged' }]
};
```

### Pattern 3: Branching (Multiple Outputs)
```javascript
const branchConfig = {
  title: 'Branch',
  nodeType: 'filter',
  inputs: [{ id: 'input' }],
  outputs: [
    { id: 'true' },
    { id: 'false' }
  ],
  fields: [
    {
      name: 'condition',
      type: 'select',
      label: 'Condition',
      options: [
        { value: 'equals', label: 'Equals' },
        { value: 'contains', label: 'Contains' }
      ]
    }
  ]
};
```

### Pattern 4: Complex Configuration
```javascript
const complexConfig = {
  title: 'Advanced',
  nodeType: 'validator',
  wide: true,
  description: 'Advanced validation',
  inputs: [{ id: 'data' }],
  outputs: [{ id: 'valid' }, { id: 'invalid' }],
  fields: [
    {
      name: 'type',
      type: 'select',
      label: 'Validation Type',
      options: [/* ... */]
    },
    {
      name: 'pattern',
      type: 'text',
      label: 'Pattern'
    },
    {
      name: 'min',
      type: 'number',
      label: 'Min Value'
    },
    {
      name: 'strict',
      type: 'checkbox',
      label: 'Strict Mode'
    }
  ]
};
```

---

## 📁 File Locations

```
src/nodes/
├── BaseNode.js          ← Core abstraction
├── nodeStyles.css       ← Design system
├── index.js             ← Add exports here
├── yourNode.js          ← Create new nodes here
└── [other nodes]
```

---

## ✅ Checklist for New Node

- [ ] Create new file in `src/nodes/`
- [ ] Import `createNode` from `./BaseNode`
- [ ] Define config object with:
  - [ ] `title`
  - [ ] `nodeType` (for styling)
  - [ ] `inputs` array
  - [ ] `outputs` array
  - [ ] `fields` array
- [ ] Export node: `export const MyNode = createNode(config)`
- [ ] Add to `index.js`: `export { MyNode } from './myNode'`
- [ ] Test in application

---

## 🐛 Troubleshooting

### Node doesn't appear
✅ Check that you exported it in `index.js`

### Styling looks wrong
✅ Verify `nodeType` is set correctly  
✅ Check if node type exists in `nodeStyles.css`

### Field not showing
✅ Check field `type` is valid  
✅ Verify field is in `fields` array

### State not updating
✅ Ensure field has unique `name`  
✅ Check `defaultValue` is set

---

## 💡 Pro Tips

1. **Copy QUICK_START.js** as a template for new nodes
2. **Use `wide: true`** for nodes with many fields
3. **Add descriptions** to help users understand the node
4. **Group related fields** using meaningful labels
5. **Set sensible defaults** for better UX
6. **Use semantic nodeTypes** for consistent theming

---

## 📚 Documentation Files

- **README.md** - Complete API documentation
- **ARCHITECTURE.md** - System design overview
- **COMPARISON.md** - Before/after code comparison
- **SUMMARY.md** - Metrics and final results
- **CATALOG.md** - Complete node listing
- **QUICK_START.js** - Template for new nodes
- **This file** - Quick reference guide

---

## 🎯 Time to Create a New Node

- **Read documentation**: 5 minutes
- **Copy template**: 30 seconds
- **Modify config**: 3-7 minutes
- **Test**: 2 minutes

**Total: ~10 minutes for a fully functional node!**

(Compare to 30-60 minutes with old approach)
