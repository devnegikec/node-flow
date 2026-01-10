// QUICK_START.js - Copy this template to create a new node quickly

import { createNode } from './BaseNode';

/**
 * QUICK START TEMPLATE
 * 
 * 1. Copy this file
 * 2. Rename to yourNodeName.js
 * 3. Modify the configuration below
 * 4. Export your node
 * 5. Add to index.js
 */

const templateNodeConfig = {
    // === REQUIRED ===
    title: 'Your Node Title',

    // === OPTIONAL BUT RECOMMENDED ===
    description: 'Brief description of what this node does',

    // === INPUTS (optional) ===
    // Define connection points on the left side
    inputs: [
        { id: 'input1', position: 'left' },
        // Add more inputs as needed
    ],

    // === OUTPUTS (optional) ===
    // Define connection points on the right side
    outputs: [
        { id: 'output1', position: 'right' },
        // Add more outputs as needed
    ],

    // === FIELDS (optional) ===
    // Define form fields inside the node
    fields: [
        // TEXT INPUT
        {
            name: 'textField',
            type: 'text',
            label: 'Text Field',
            placeholder: 'Enter text...',
            defaultValue: ''
        },

        // NUMBER INPUT
        {
            name: 'numberField',
            type: 'number',
            label: 'Number Field',
            defaultValue: 0
        },

        // DROPDOWN/SELECT
        {
            name: 'selectField',
            type: 'select',
            label: 'Select Option',
            defaultValue: 'option1',
            options: [
                { value: 'option1', label: 'Option 1' },
                { value: 'option2', label: 'Option 2' },
                { value: 'option3', label: 'Option 3' }
            ]
        },

        // TEXTAREA
        {
            name: 'textareaField',
            type: 'textarea',
            label: 'Text Area',
            placeholder: 'Enter longer text...',
            rows: 3,
            defaultValue: ''
        },

        // CHECKBOX
        {
            name: 'checkboxField',
            type: 'checkbox',
            label: 'Enable Feature',
            defaultValue: false
        },

        // SLIDER/RANGE
        {
            name: 'sliderField',
            type: 'slider',
            label: 'Slider Value',
            min: 0,
            max: 100,
            step: 1,
            defaultValue: 50
        },
    ],

    // === STYLING (optional) ===
    // Customize the appearance
    style: {
        width: 220,
        backgroundColor: '#ffffff',
        border: '2px solid #000000',
        borderRadius: '8px'
    },

    titleStyle: {
        color: '#333333',
        fontSize: '14px'
    },

    descriptionStyle: {
        color: '#666666',
        fontSize: '12px'
    }
};

// Export your node
export const TemplateNode = createNode(templateNodeConfig);

/* ============================================
   COLOR PALETTE SUGGESTIONS
   ============================================
   
   Blue Theme:
   - backgroundColor: '#e3f2fd'
   - border: '2px solid #2196f3'
   - titleStyle.color: '#0d47a1'
   
   Green Theme:
   - backgroundColor: '#e8f5e9'
   - border: '2px solid #4caf50'
   - titleStyle.color: '#2e7d32'
   
   Orange Theme:
   - backgroundColor: '#fff3e0'
   - border: '2px solid #ff9800'
   - titleStyle.color: '#e65100'
   
   Purple Theme:
   - backgroundColor: '#f3e5f5'
   - border: '2px solid #9c27b0'
   - titleStyle.color: '#4a148c'
   
   Pink Theme:
   - backgroundColor: '#fce4ec'
   - border: '2px solid #e91e63'
   - titleStyle.color: '#880e4f'
   
   Red Theme:
   - backgroundColor: '#ffebee'
   - border: '2px solid #f44336'
   - titleStyle.color: '#b71c1c'
   
   Teal Theme:
   - backgroundColor: '#e0f2f1'
   - border: '2px solid #009688'
   - titleStyle.color: '#004d40'
   
============================================ */

/* ============================================
   COMMON PATTERNS
   ============================================

   SIMPLE INPUT/OUTPUT NODE:
   {
     title: 'Node Name',
     inputs: [{ id: 'input' }],
     outputs: [{ id: 'output' }],
     fields: [...]
   }

   MULTIPLE INPUTS:
   {
     inputs: [
       { id: 'input1' },
       { id: 'input2' },
       { id: 'input3' }
     ]
   }

   MULTIPLE OUTPUTS (e.g., for branching):
   {
     outputs: [
       { id: 'success' },
       { id: 'failure' }
     ]
   }

   CONDITIONAL FIELDS (show field based on another):
   Add custom logic in customContent function

   VALIDATION:
   Add validation in customContent or handle in parent

============================================ */

/* ============================================
   STEP-BY-STEP CREATION GUIDE
   ============================================

   1. Define Purpose
      - What does this node do?
      - What inputs does it need?
      - What outputs does it produce?

   2. Configure Inputs/Outputs
      - Add to inputs array for left connections
      - Add to outputs array for right connections
      - Give each a unique id

   3. Add Fields
      - What data does the user need to provide?
      - Choose appropriate field types
      - Set sensible defaults

   4. Style It
      - Pick a color theme
      - Adjust dimensions if needed
      - Make it visually distinct

   5. Export and Register
      - Export the node component
      - Add to index.js
      - Register with ReactFlow

============================================ */
