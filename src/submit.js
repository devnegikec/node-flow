import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({
    nodes: state.nodes,
    edges: state.edges,
});

export const SubmitButton = () => {
    const { nodes, edges } = useStore(selector, shallow);

    const handleSubmit = async () => {
        // Log the current state for debugging
        console.log('Current Pipeline State:', { nodes, edges });

        try {
            // Replace with your actual backend URL
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes, edges }),
            });

            if (response.ok) {
                const result = await response.json();
                // Typically you'd show an alert with the info returned from the backend
                alert(`Pipeline Submitted! \nNodes: ${nodes.length} \nEdges: ${edges.length}`);
            } else {
                alert('Failed to submit pipeline.');
            }
        } catch (error) {
            console.error('Error submitting pipeline:', error);
            alert('Error connecting to the server.');
        }
    };

    return (
        <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            padding: '20px',
            borderTop: '1px solid #e5e7eb'
        }}>
            <button 
                type="button" 
                onClick={handleSubmit}
                style={buttonStyle}
            >
                Submit Pipeline
            </button>
        </div>
    );
};

const buttonStyle = {
    padding: '10px 24px',
    backgroundColor: '#6366f1',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '14px',
    transition: 'background-color 0.2s',
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
};