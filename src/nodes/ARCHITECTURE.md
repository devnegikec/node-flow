# Node Abstraction Architecture

## File Structure
```
src/nodes/
├── BaseNode.js                 # Core abstraction (7.5KB)
├── README.md                   # Documentation (6.9KB)
├── index.js                    # Central exports
│
├── Original Nodes (maintained for backward compatibility)
│   ├── inputNode.js
│   ├── outputNode.js
│   ├── llmNode.js
│   └── textNode.js
│
├── New Nodes (using abstraction)
│   ├── filterNode.js           # Filter data with conditions
│   ├── transformNode.js        # Transform and modify data
│   ├── aggregatorNode.js       # Combine multiple inputs
│   ├── validatorNode.js        # Validate data against rules
│   └── delayNode.js            # Add execution delays
│
└── Examples
    └── inputNodeRefactored.js  # Refactoring example
```

## Component Hierarchy
```
BaseNode (Core Abstraction)
    │
    ├─── State Management (automatic)
    ├─── Handle Rendering (configurable)
    ├─── Field Rendering (multi-type support)
    └─── Styling System (customizable)
         │
         └─── createNode() Factory
              │
              ├─── FilterNode
              ├─── TransformNode
              ├─── AggregatorNode
              ├─── ValidatorNode
              └─── DelayNode
```

## Data Flow
```
Node Configuration Object
         │
         ▼
  createNode() Factory
         │
         ▼
    BaseNode Component
         │
         ├─── Initialize State from Config
         ├─── Render Input Handles
         ├─── Render Title & Description
         ├─── Render Form Fields
         └─── Render Output Handles
                │
                ▼
         Rendered Node Component
```

## Code Reduction Comparison
```
Traditional Approach:
  Each Node = ~40-50 lines
  5 Nodes = ~225 lines total
  Duplication: High
  Maintainability: Low

Abstraction Approach:
  BaseNode = ~250 lines (one time)
  Each Node = ~15-20 lines
  5 Nodes = ~100 lines total
  Total: ~350 lines
  Duplication: None
  Maintainability: High

For 10+ nodes:
  Traditional: 500+ lines
  Abstraction: ~400 lines + better UX
```

## Field Type Support Matrix
```
┌─────────────┬──────────────┬─────────────┬──────────────┐
│ Field Type  │ Validation   │ Styling     │ Use Cases    │
├─────────────┼──────────────┼─────────────┼──────────────┤
│ Text        │ ✓            │ ✓           │ Names, IDs   │
│ Number      │ ✓            │ ✓           │ Counts, Ages │
│ Email       │ ✓            │ ✓           │ Email inputs │
│ Textarea    │ ✓            │ ✓           │ Long text    │
│ Select      │ ✓            │ ✓           │ Options      │
│ Checkbox    │ ✓            │ ✓           │ Toggles      │
│ Slider      │ ✓            │ ✓           │ Ranges       │
└─────────────┴──────────────┴─────────────┴──────────────┘
```

## Benefits Summary

### ✅ Development Speed
- Create new nodes in minutes instead of hours
- Consistent API across all nodes
- Less code to write and test

### ✅ Maintainability
- Single source of truth for node behavior
- Apply styles globally or per-node
- Easy to add new features to all nodes

### ✅ Consistency
- Uniform UI/UX across all nodes
- Predictable behavior
- Accessible and responsive by default

### ✅ Flexibility
- Support for custom content rendering
- Extensible field system
- Override any style or behavior

### ✅ Scalability
- Add unlimited nodes without code duplication
- Field types are reusable
- Easy to extend with new capabilities
