import React, { useMemo } from 'react';
import ReactFlow, { Background, Controls } from 'reactflow';
import type { Node, Edge } from 'reactflow';
import 'reactflow/dist/style.css';
import styled from 'styled-components';

const VisualizerContainer = styled.div`
  height: 240px;
  background: rgba(35, 39, 42, 0.95);
  border-radius: 8px;
  border: 1px solid rgba(57, 204, 204, 0.2);
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  width: 100%;

  @media (max-width: 768px) {
    height: 200px;
  }

  @media (max-width: 480px) {
    height: 180px;
  }
  
  /* Hide ReactFlow attribution */
  .react-flow__attribution {
    display: none !important;
  }
  
  .react-flow__node-default {
    background: var(--light-surface);
    border: 2px solid var(--pipeline-cyan);
    border-radius: 8px;
    color: var(--primary-text);
    font-family: 'JetBrains Mono', monospace;
    font-weight: 500;
    font-size: 14px;
    text-align: center;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    padding: 12px 20px;
    min-width: 80px;

    @media (max-width: 768px) {
      font-size: 12px;
      padding: 8px 12px;
      min-width: 60px;
    }

    @media (max-width: 480px) {
      font-size: 10px;
      padding: 6px 8px;
      min-width: 50px;
    }
  }
  
  .react-flow__node-default.success {
    border-color: var(--warning-yellow);
  }
  
  .react-flow__node-default.error {
    border-color: var(--error-red);
  }
  
  .react-flow__node-default.warning {
    border-color: var(--warning-yellow);
  }
  
  .react-flow__node-default.tool {
    background: var(--dark-background);
    border: 1.5px solid var(--secondary-text);
    border-radius: 6px;
    color: var(--secondary-text);
    font-family: 'Inter', sans-serif;
    font-weight: 400;
    font-size: 12px;
    text-align: center;
    box-shadow: 0 1px 4px rgba(0,0,0,0.1);
    padding: 8px 12px;
    min-width: 60px;

    @media (max-width: 768px) {
      font-size: 10px;
      padding: 6px 8px;
      min-width: 45px;
    }

    @media (max-width: 480px) {
      font-size: 8px;
      padding: 4px 6px;
      min-width: 35px;
    }
  }

  .react-flow__controls {
    @media (max-width: 480px) {
      display: none;
    }
  }
`;

// Define stable nodeTypes and edgeTypes outside component to prevent recreation
const nodeTypes = {};
const edgeTypes = {};

const PipelineVisualizer: React.FC = () => {
  // Create responsive node positions
  const { nodes, edges } = useMemo(() => {
    const getResponsiveNodes = (): Node[] => {
      // Check if mobile
      const isMobile = window.innerWidth <= 768;
      const isSmallMobile = window.innerWidth <= 480;
      
      if (isSmallMobile) {
        // Compact mobile layout - simplified vertical layout
        return [
          { id: '1', position: { x: 20, y: 20 }, data: { label: 'Source' }, className: 'success' },
          { id: '2', position: { x: 120, y: 20 }, data: { label: 'Build' }, className: 'success' },
          { id: '3', position: { x: 220, y: 20 }, data: { label: 'Test' }, className: 'success' },
          { id: '4', position: { x: 20, y: 80 }, data: { label: 'Deploy' }, className: 'success' },
          { id: '5', position: { x: 120, y: 80 }, data: { label: 'Monitor' }, className: 'success' },
          // Key tools only
          { id: '1a', position: { x: 20, y: 120 }, data: { label: 'Git' }, className: 'tool' },
          { id: '2a', position: { x: 120, y: 120 }, data: { label: 'Jenkins' }, className: 'tool' },
          { id: '4a', position: { x: 20, y: 150 }, data: { label: 'K8s' }, className: 'tool' },
          { id: '5a', position: { x: 120, y: 150 }, data: { label: 'Grafana' }, className: 'tool' },
        ];
      } else if (isMobile) {
        // Tablet layout - condensed but more complete
        return [
          { id: '1', position: { x: 30, y: 30 }, data: { label: 'Source' }, className: 'success' },
          { id: '2', position: { x: 150, y: 30 }, data: { label: 'Build' }, className: 'success' },
          { id: '3', position: { x: 270, y: 30 }, data: { label: 'Test' }, className: 'success' },
          { id: '4', position: { x: 390, y: 30 }, data: { label: 'Deploy' }, className: 'success' },
          { id: '5', position: { x: 510, y: 30 }, data: { label: 'Monitor' }, className: 'success' },
          // Tools
          { id: '1a', position: { x: 30, y: 100 }, data: { label: 'Git' }, className: 'tool' },
          { id: '2a', position: { x: 150, y: 100 }, data: { label: 'Jenkins' }, className: 'tool' },
          { id: '3a', position: { x: 270, y: 100 }, data: { label: 'Selenium' }, className: 'tool' },
          { id: '4a', position: { x: 390, y: 100 }, data: { label: 'K8s' }, className: 'tool' },
          { id: '5a', position: { x: 510, y: 100 }, data: { label: 'Grafana' }, className: 'tool' },
        ];
      }
      
      // Desktop layout (original)
      return [
        { id: '1', position: { x: 50, y: 50 }, data: { label: 'Source' }, className: 'success' },
        { id: '2', position: { x: 250, y: 50 }, data: { label: 'Build' }, className: 'success' },
        { id: '3', position: { x: 450, y: 50 }, data: { label: 'Test' }, className: 'success' },
        { id: '4', position: { x: 650, y: 50 }, data: { label: 'Artifact' }, className: 'success' },
        { id: '5', position: { x: 850, y: 50 }, data: { label: 'Deploy' }, className: 'success' },
        { id: '6', position: { x: 1050, y: 50 }, data: { label: 'Monitor' }, className: 'success' },
        // Tools
        { id: '1a', position: { x: 50, y: 120 }, data: { label: 'Git' }, className: 'tool' },
        { id: '1b', position: { x: 50, y: 160 }, data: { label: 'GitHub' }, className: 'tool' },
        { id: '2a', position: { x: 250, y: 120 }, data: { label: 'GitHub Actions' }, className: 'tool' },
        { id: '2b', position: { x: 250, y: 160 }, data: { label: 'Jenkins' }, className: 'tool' },
        { id: '3a', position: { x: 450, y: 120 }, data: { label: 'Jenkins' }, className: 'tool' },
        { id: '3b', position: { x: 450, y: 160 }, data: { label: 'Selenium' }, className: 'tool' },
        { id: '4a', position: { x: 650, y: 120 }, data: { label: 'Docker Hub' }, className: 'tool' },
        { id: '4b', position: { x: 650, y: 160 }, data: { label: 'Harbor' }, className: 'tool' },
        { id: '5a', position: { x: 850, y: 120 }, data: { label: 'Kubernetes' }, className: 'tool' },
        { id: '5b', position: { x: 850, y: 160 }, data: { label: 'Terraform' }, className: 'tool' },
        { id: '6a', position: { x: 1050, y: 120 }, data: { label: 'Prometheus' }, className: 'tool' },
        { id: '6b', position: { x: 1050, y: 160 }, data: { label: 'ELK Stack' }, className: 'tool' },
      ];
    };

    const getResponsiveEdges = (): Edge[] => {
      const isMobile = window.innerWidth <= 768;
      const isSmallMobile = window.innerWidth <= 480;
      
      if (isSmallMobile) {
        return [
          { id: 'e1-2', source: '1', target: '2' },
          { id: 'e2-3', source: '2', target: '3' },
          { id: 'e3-4', source: '3', target: '4' },
          { id: 'e4-5', source: '4', target: '5' },
          { id: 'e1-1a', source: '1', target: '1a', type: 'straight' },
          { id: 'e2-2a', source: '2', target: '2a', type: 'straight' },
          { id: 'e4-4a', source: '4', target: '4a', type: 'straight' },
          { id: 'e5-5a', source: '5', target: '5a', type: 'straight' },
        ];
      } else if (isMobile) {
        return [
          { id: 'e1-2', source: '1', target: '2' },
          { id: 'e2-3', source: '2', target: '3' },
          { id: 'e3-4', source: '3', target: '4' },
          { id: 'e4-5', source: '4', target: '5' },
          { id: 'e1-1a', source: '1', target: '1a', type: 'straight' },
          { id: 'e2-2a', source: '2', target: '2a', type: 'straight' },
          { id: 'e3-3a', source: '3', target: '3a', type: 'straight' },
          { id: 'e4-4a', source: '4', target: '4a', type: 'straight' },
          { id: 'e5-5a', source: '5', target: '5a', type: 'straight' },
        ];
      }
      
      // Desktop edges (original)
      return [
        { id: 'e1-2', source: '1', target: '2' },
        { id: 'e2-3', source: '2', target: '3' },
        { id: 'e3-4', source: '3', target: '4' },
        { id: 'e4-5', source: '4', target: '5' },
        { id: 'e5-6', source: '5', target: '6' },
        { id: 'e1-1a', source: '1', target: '1a', type: 'straight' },
        { id: 'e1-1b', source: '1', target: '1b', type: 'straight' },
        { id: 'e2-2a', source: '2', target: '2a', type: 'straight' },
        { id: 'e2-2b', source: '2', target: '2b', type: 'straight' },
        { id: 'e3-3a', source: '3', target: '3a', type: 'straight' },
        { id: 'e3-3b', source: '3', target: '3b', type: 'straight' },
        { id: 'e4-4a', source: '4', target: '4a', type: 'straight' },
        { id: 'e4-4b', source: '4', target: '4b', type: 'straight' },
        { id: 'e5-5a', source: '5', target: '5a', type: 'straight' },
        { id: 'e5-5b', source: '5', target: '5b', type: 'straight' },
        { id: 'e6-6a', source: '6', target: '6a', type: 'straight' },
        { id: 'e6-6b', source: '6', target: '6b', type: 'straight' },
      ];
    };

    return {
      nodes: getResponsiveNodes(),
      edges: getResponsiveEdges(),
    };
  }, []);

  return (
    <VisualizerContainer>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        panOnDrag={true}
        preventScrolling={true}
        translateExtent={[[-300, -150], [1500, 400]]}
        minZoom={0.3}
        maxZoom={1.5}
      >
        <Background />
        <Controls showZoom={false} showFitView={true} showInteractive={false} />
      </ReactFlow>
    </VisualizerContainer>
  );
};

export default PipelineVisualizer; 