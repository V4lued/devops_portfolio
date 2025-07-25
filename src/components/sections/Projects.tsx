import React, { useCallback } from 'react';
import styled from 'styled-components';
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  BackgroundVariant,
} from 'reactflow';
import type { Node, Edge, Connection } from 'reactflow';
import { FaGithub } from 'react-icons/fa';
import 'reactflow/dist/style.css';

const ProjectsSection = styled.section`
  padding: 4rem 2rem;
`;

const ProjectContainer = styled.div`
  background: rgba(35, 39, 42, 0.95);
  border-radius: 20px;
  padding: 3rem 2.5rem;
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);
  border: 1px solid rgba(57, 204, 204, 0.2);
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(255, 153, 0, 0.20);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, transparent, var(--pipeline-cyan), transparent);
    border-radius: 20px 20px 0 0;
  }
`;

const ProjectHeader = styled.div`
  margin-bottom: 2rem;
`;

const ProjectTitle = styled.h3`
  color: var(--pipeline-cyan);
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const ProjectDescription = styled.p`
  color: var(--primary-text);
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 3rem;
  margin-bottom: 3rem;
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const PreviewSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const WebsitePreview = styled.div`
  border: 2px solid var(--pipeline-cyan);
  border-radius: 12px;
  overflow: hidden;
  background: var(--light-surface);
  height: 320px;
  position: relative;
  box-shadow: 0 4px 16px rgba(57, 204, 204, 0.2);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 30px;
    background: var(--dark-background);
    display: flex;
    align-items: center;
    z-index: 1;
  }
  
  &::after {
    content: '● ● ●';
    position: absolute;
    top: 8px;
    left: 12px;
    color: var(--pipeline-cyan);
    font-size: 8px;
    z-index: 2;
  }
`;

const PreviewContent = styled.div`
  width: 100%;
  height: calc(100% - 30px);
  margin-top: 30px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: var(--light-surface);
  
  h3 {
    color: var(--pipeline-cyan);
    font-size: 1.2rem;
    margin-bottom: 1rem;
    font-weight: 600;
  }
  
  p {
    color: var(--text-secondary);
    font-size: 0.9rem;
    line-height: 1.5;
    margin-bottom: 0.5rem;
  }
`;

const ProjectButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, var(--pipeline-cyan), var(--pipeline-cyan));
  color: var(--dark-background);
  border: none;
  border-radius: 6px;
  font-weight: 600;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  align-self: center;

  &:hover:not(:disabled),
  &:hover:not(:disabled):visited,
  &:hover:not(:disabled):active {
    transform: translateY(-2px);
    color: var(--dark-background) !important;
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background: linear-gradient(135deg, #666, #666);
  }
`;

const FlowContainer = styled.div`
  height: 420px;
  border: 1px solid var(--pipeline-cyan);
  border-radius: 12px;
  background: var(--light-surface);
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
  position: relative;
  overflow: hidden;
  
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
    min-width: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    overflow: hidden;
    transition: all 0.3s ease;
  }
  
  .react-flow__node-default.main {
    background: var(--light-surface);
    border: 2px solid var(--pipeline-cyan);
    border-radius: 8px;
    color: var(--primary-text);
    font-family: 'JetBrains Mono', monospace;
    font-weight: 500;
    font-size: 13px;
    text-align: center;
    box-shadow: 0 2px 8px rgba(57,204,204,0.15);
    padding: 10px 16px;
    min-width: 140px;
    max-width: 140px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .react-flow__node-default:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  }
  
  .react-flow__node-default.main:hover {
    border-color: var(--success-green);
    box-shadow: 0 4px 15px rgba(57,204,204,0.3);
  }
  
  .react-flow__edge.animated .react-flow__edge-path {
    animation: dash-flow 2s linear infinite;
  }
  
  @keyframes dash-flow {
    to {
      stroke-dashoffset: -10;
    }
  }
  
  .react-flow__controls {
    background: white;
    border: none;
    border-radius: 6px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    gap: 4px;
    padding: 4px;
  }
  
  .react-flow__controls-button {
    background: white;
    border: none;
    color: var(--primary-text);
    transition: all 0.2s ease;
    margin-bottom: 4px;
    
    &:hover {
      background: #f0f0f0;
      color: var(--primary-text);
    }
  }
`;

const FlowTitle = styled.h4`
  color: var(--pipeline-cyan);
  margin-bottom: 1rem;
  font-size: 1.3rem;
`;

const CustomControlButton = styled.button`
  width: 24px;
  height: 24px;
  background: white;
  border: none;
  border-radius: 2px;
  color: black;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.2s ease;
  margin-bottom: 4px;
  
  &:hover {
    background: #f0f0f0;
    color: black;
  }
`;

const TechStack = styled.div`
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(57, 204, 204, 0.2);
`;

const StackTitle = styled.h4`
  color: var(--pipeline-cyan);
  margin-bottom: 0.5rem;
`;

const TechList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 0.5rem;
`;

const TechBadge = styled.span`
  background: rgba(57, 204, 204, 0.15);
  color: var(--pipeline-cyan);
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  border: 1px solid rgba(57, 204, 204, 0.2);
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(57, 204, 204, 0.25);
    transform: translateY(-1px);
  }
`;

const initialNodes: Node[] = [
  {
    id: '1',
    position: { x: 250, y: 50 },
    data: { label: 'Git Push' },
    className: 'main',
  },
  {
    id: '2',
    position: { x: 250, y: 130 },
    data: { label: 'Jenkins CI' },
    className: 'main',
  },
  {
    id: '3',
    position: { x: 250, y: 210 },
    data: { label: 'Test & SonarQube' },
    className: 'main',
  },
  {
    id: '4',
    position: { x: 250, y: 290 },
    data: { label: 'Docker Build' },
    className: 'main',
  },
  {
    id: '5',
    position: { x: 250, y: 370 },
    data: { label: 'Push to Registry' },
    className: 'main',
  },
  {
    id: '6',
    position: { x: 250, y: 450 },
    data: { label: 'K8s Deploy' },
    className: 'main',
  },
];

const initialEdges: Edge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    type: 'smoothstep',
    animated: true,
    style: { 
      stroke: 'var(--pipeline-cyan)', 
      strokeWidth: 3,
      strokeDasharray: '5,5',
    },
  },
  {
    id: 'e2-3',
    source: '2',
    target: '3',
    type: 'smoothstep',
    animated: true,
    style: { 
      stroke: 'var(--success-green)', 
      strokeWidth: 3,
      strokeDasharray: '5,5',
    },
  },
  {
    id: 'e3-4',
    source: '3',
    target: '4',
    type: 'smoothstep',
    animated: true,
    style: { 
      stroke: 'var(--pipeline-cyan)', 
      strokeWidth: 3,
      strokeDasharray: '5,5',
    },
  },
  {
    id: 'e4-5',
    source: '4',
    target: '5',
    type: 'smoothstep',
    animated: true,
    style: { 
      stroke: 'var(--success-green)', 
      strokeWidth: 3,
      strokeDasharray: '5,5',
    },
  },
  {
    id: 'e5-6',
    source: '5',
    target: '6',
    type: 'smoothstep',
    animated: true,
    style: { 
      stroke: 'var(--pipeline-cyan)', 
      strokeWidth: 3,
      strokeDasharray: '5,5',
    },
  },
];

// Define stable nodeTypes and edgeTypes outside component to prevent recreation
const nodeTypes = {};
const edgeTypes = {};

const Projects: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const resetToOriginalPositions = useCallback(() => {
    setNodes(initialNodes);
  }, [setNodes]);

  return (
    <ProjectsSection id="projects">
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{ color: 'var(--pipeline-cyan)', fontSize: '2.5rem', marginBottom: '0.5rem' }}>
          Featured Project
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          A comprehensive showcase of DevOps practices and modern web development
        </p>
      </div>
      
      <ProjectContainer>
        <ProjectHeader>
          <ProjectTitle>DevOps Portfolio Website</ProjectTitle>
          <ProjectDescription>
            A modern, responsive portfolio website showcasing DevOps expertise with interactive CI/CD pipeline 
            visualizations, built with React, TypeScript, and styled-components. Features automated deployment 
            pipeline with GitHub Actions, Docker containerization, and cloud hosting.
          </ProjectDescription>
        </ProjectHeader>

        <ProjectGrid>
          <PreviewSection>
            <FlowTitle>Website Preview</FlowTitle>
            <WebsitePreview>
              <PreviewContent>
                <h3>DevOps Portfolio Website</h3>
                <p>Interactive CI/CD pipeline visualizations</p>
                <p>Modern React & TypeScript architecture</p>
                <p>Containerized deployment workflow</p>
                <p>Real-time pipeline monitoring</p>
              </PreviewContent>
            </WebsitePreview>
            
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
              <ProjectButton 
                as="a" 
                href="https://github.com/V4lued/devops_portfolio" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <FaGithub />
                GitHub
              </ProjectButton>
            </div>
          </PreviewSection>

          <div>
            <FlowTitle>CI/CD Pipeline Flow</FlowTitle>
            <FlowContainer>
              <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
                nodesDraggable={true}
                nodesConnectable={false}
                elementsSelectable={true}
                panOnDrag={true}
                preventScrolling={true}
                translateExtent={[[-150, -100], [800, 600]]}
                minZoom={0.5}
                maxZoom={1.5}
              >
                <Controls showZoom={false} showFitView={true} showInteractive={false}>
                  <CustomControlButton onClick={resetToOriginalPositions} title="Reset Positions">
                    ↻
                  </CustomControlButton>
                </Controls>
                <Background 
                  variant={BackgroundVariant.Dots} 
                  gap={20} 
                  size={1} 
                  color="#ffffff" 
                />
              </ReactFlow>
            </FlowContainer>
          </div>
        </ProjectGrid>

        <TechStack>
          <StackTitle>Technology Stack</StackTitle>
          <TechList>
            <TechBadge>React</TechBadge>
            <TechBadge>TypeScript</TechBadge>
            <TechBadge>ReactFlow</TechBadge>
            <TechBadge>Styled Components</TechBadge>
            <TechBadge>Git</TechBadge>
            <TechBadge>Jenkins</TechBadge>
            <TechBadge>Docker</TechBadge>
            <TechBadge>Kubernetes</TechBadge>
            <TechBadge>Netlify</TechBadge>
          </TechList>
        </TechStack>
      </ProjectContainer>
    </ProjectsSection>
  );
};

export default Projects; 