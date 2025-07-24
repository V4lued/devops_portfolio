import React, { useState, useRef, useEffect, useMemo } from 'react';
import ReactFlow, { 
  Background, 
  Controls,
  Handle,
  Position,
  ReactFlowProvider
} from 'reactflow';
import type { Node, Edge } from 'reactflow';
import 'reactflow/dist/style.css';
import styled from 'styled-components';
import { FaGit, FaCogs, FaVial, FaShieldAlt, FaBoxOpen, FaCloudUploadAlt, FaRobot, FaRocket, FaChartBar } from 'react-icons/fa';
import type { IconType } from 'react-icons';


const ShowcaseSection = styled.section`
  padding: 4rem 2rem;
  background: var(--light-surface);
`;

const ContentContainer = styled.div`
  max-width: 1400px;
  width: 100%;
  position: relative;
  z-index: 1;
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const PipelineContainer = styled.div`
  background: rgba(35, 39, 42, 0.95);
  border-radius: 20px;
  padding: 0;
  border: 1px solid rgba(57, 204, 204, 0.2);
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  @media (max-width: 768px) {
    height: 400px;
    border-radius: 16px;
    overflow: hidden;
  }

  @media (max-width: 480px) {
    height: 350px;
    border-radius: 12px;
  }
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(255, 153, 0, 0.10);

    @media (max-width: 768px) {
      transform: translateY(-2px);
    }
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

    @media (max-width: 768px) {
      border-radius: 16px 16px 0 0;
    }

    @media (max-width: 480px) {
      border-radius: 12px 12px 0 0;
    }
  }
`;

const ReactFlowWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  
  /* Hide ReactFlow attribution */
  .react-flow__attribution {
    display: none !important;
  }

  .react-flow__controls {
    background: white;
    border: 1px solid rgba(57, 204, 204, 0.3);
    border-radius: 8px;

    @media (max-width: 480px) {
      display: none;
    }
  }

  .react-flow__controls-button {
    background: transparent;
    border: none;
    color: var(--pipeline-cyan);
    
    &:hover {
      background: rgba(128, 128, 128, 0.2);
    }
  }

  .react-flow__minimap {
    display: none;
  }

  .react-flow__background {
    background: transparent !important;
  }

  .react-flow__node {
    cursor: pointer;
  }

  .react-flow__edge-path {
    stroke-width: 3;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
  
  .react-flow__edge.pending .react-flow__edge-path {
    stroke: var(--disabled-meta);
    stroke-dasharray: 8,8;
    opacity: 0.5;
  }
  
  .react-flow__edge.filling .react-flow__edge-path {
    stroke: var(--pipeline-cyan);
    stroke-dasharray: 8,8;
    animation: dash-flow 1s linear infinite;
    opacity: 0.9;
    filter: drop-shadow(0 0 4px rgba(57, 204, 204, 0.6));
  }
  
  .react-flow__edge.filled .react-flow__edge-path {
    stroke: var(--success-green);
    stroke-dasharray: none;
    opacity: 1;
    filter: drop-shadow(0 0 3px rgba(57, 204, 204, 0.4));
  }

  .react-flow__viewport {
    background: transparent;
  }



  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }

  @keyframes dash-flow {
    to {
      stroke-dashoffset: -20;
    }
  }

`;

const StatusDisplay = styled.div`
  background: rgba(35, 39, 42, 0.95);
  border-radius: 8px;
  padding: 1.5rem;
  margin: 2rem 0;
  border: 1px solid rgba(57, 204, 204, 0.3);
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: var(--text-secondary);
  
  h3 {
    color: var(--pipeline-cyan);
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }
  
  .status-running {
    color: var(--warning-yellow);
    font-weight: 500;
  }
  
  .status-success {
    color: var(--success-green);
    font-weight: 500;
  }
  
  .status-failed {
    color: var(--error-red);
    font-weight: 500;
  }
`;

const SimulateButton = styled.button`
  margin-top: 1.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, var(--pipeline-cyan), var(--pipeline-cyan));
  border: none;
  color: var(--dark-background);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.9rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(57, 204, 204, 0.3);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const StopButton = styled(SimulateButton)`
  background: var(--error-red);
  margin-left: 1rem;
  
  &:hover {
    background: #cc3333;
  }
`;



const StageGroup = styled.div`
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    filter: drop-shadow(0 4px 8px rgba(57, 204, 204, 0.3));
    transform: scale(1.02);
  }
`;

const MobileInstructions = styled.div`
  display: none;
  text-align: center;
  color: var(--text-secondary);
  font-size: 0.85rem;
  margin-top: 1rem;
  padding: 0.5rem;
  font-style: italic;

  @media (max-width: 768px) {
    display: block;
  }
`;



// ReactFlow Node Component
const PipelineNode = ({ data }: { data: PipelineNodeData }) => {
  const Icon = data.icon;
  return (
    <StageGroup 
      style={{
        background: 'rgba(26, 34, 44, 0.8)',
        border: `2px solid ${
          data.stage.status === 'pending' ? 'var(--disabled-meta)' :
          data.stage.status === 'running' ? 'var(--warning-yellow)' :
          data.stage.status === 'success' ? 'var(--success-green)' :
          'var(--error-red)'
        }`,
        borderRadius: '12px',
        width: '220px',
        height: '140px',
        position: 'relative',
        transition: 'all 0.3s ease',
        animation: data.stage.status === 'running' ? 'blink 1s linear infinite' : 'none'
      }}
    >
      {/* Connection Handles */}
      <Handle type="target" position={Position.Left} style={{ background: 'transparent', border: 'none' }} />
      <Handle type="source" position={Position.Right} style={{ background: 'transparent', border: 'none' }} />
      <Handle type="target" position={Position.Top} style={{ background: 'transparent', border: 'none' }} />
      <Handle type="source" position={Position.Bottom} style={{ background: 'transparent', border: 'none' }} />
      
      <div style={{
        position: 'absolute',
        top: '15px',
        right: '15px',
        background: data.stage.status === 'pending' ? 'var(--disabled-meta)' :
                   data.stage.status === 'running' ? 'var(--warning-yellow)' :
                   data.stage.status === 'success' ? 'var(--success-green)' :
                   'var(--error-red)',
        color: 'var(--white)',
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '12px',
        fontWeight: '600'
      }}>
        {data.stepNumber}
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        padding: '1rem'
      }}>
        <Icon size={32} color="var(--pipeline-cyan)" style={{ opacity: 0.9, marginBottom: '0.5rem' }} />
        <div style={{
          color: 'var(--white)',
          fontFamily: 'Inter, sans-serif',
          fontSize: '18px',
          fontWeight: '600',
          textAlign: 'center',
          marginBottom: '0.25rem'
        }}>
          {data.stage.name}
        </div>
        <div style={{
          color: 'var(--white)',
          fontFamily: 'Inter, sans-serif',
          fontSize: '16px',
          textAlign: 'center'
        }}>
          {data.stage.subtitle}
        </div>
      </div>
    </StageGroup>
  );
};

type StageStatus = 'pending' | 'running' | 'success' | 'failed';
interface PipelineStage {
  id: string;
  name: string;
  subtitle: string;
  x: number;
  y: number;
  status: StageStatus;
  duration: number; // in seconds
}
interface PipelineConnector {
  id: string;
  d: string;
  status: 'pending' | 'filling' | 'filled';
}

interface PipelineNodeData {
  stage: PipelineStage;
  icon: IconType;
  stepNumber: number;
}

// Move these above getEdge and createConnectors
  const stageWidth = 220;
  const stageHeight = 140;

// Place getEdge and createConnectors here, above useState for connectors
const getEdge = (stage: PipelineStage, direction: 'left' | 'right' | 'top' | 'bottom') => {
  switch (direction) {
    case 'left':
      return { x: stage.x - stageWidth / 2, y: stage.y + stageHeight / 2 };
    case 'right':
      return { x: stage.x + stageWidth / 2, y: stage.y + stageHeight / 2 };
    case 'top':
      return { x: stage.x, y: stage.y };
    case 'bottom':
      return { x: stage.x, y: stage.y + stageHeight };
    default:
      return { x: stage.x, y: stage.y };
  }
};

const createConnectors = (stages: PipelineStage[]): PipelineConnector[] => [
  // Horizontal top row
  { id: 'source-build', d: `M ${getEdge(stages[0], 'right').x} ${getEdge(stages[0], 'right').y} C ${getEdge(stages[0], 'right').x + 40} ${getEdge(stages[0], 'right').y}, ${getEdge(stages[1], 'left').x - 40} ${getEdge(stages[1], 'left').y}, ${getEdge(stages[1], 'left').x} ${getEdge(stages[1], 'left').y}`, status: 'pending' },
  { id: 'build-test', d: `M ${getEdge(stages[1], 'right').x} ${getEdge(stages[1], 'right').y} C ${getEdge(stages[1], 'right').x + 40} ${getEdge(stages[1], 'right').y}, ${getEdge(stages[2], 'left').x - 40} ${getEdge(stages[2], 'left').y}, ${getEdge(stages[2], 'left').x} ${getEdge(stages[2], 'left').y}`, status: 'pending' },
  { id: 'test-security', d: `M ${getEdge(stages[2], 'right').x} ${getEdge(stages[2], 'right').y} C ${getEdge(stages[2], 'right').x + 40} ${getEdge(stages[2], 'right').y}, ${getEdge(stages[3], 'left').x - 40} ${getEdge(stages[3], 'left').y}, ${getEdge(stages[3], 'left').x} ${getEdge(stages[3], 'left').y}`, status: 'pending' },
  { id: 'security-artifact', d: `M ${getEdge(stages[3], 'right').x} ${getEdge(stages[3], 'right').y} C ${getEdge(stages[3], 'right').x + 40} ${getEdge(stages[3], 'right').y}, ${getEdge(stages[4], 'left').x - 40} ${getEdge(stages[4], 'left').y}, ${getEdge(stages[4], 'left').x} ${getEdge(stages[4], 'left').y}`, status: 'pending' },
  // Down to staging (vertical curve)
  { id: 'test-staging', d: `M ${getEdge(stages[2], 'bottom').x} ${getEdge(stages[2], 'bottom').y} C ${getEdge(stages[2], 'bottom').x} ${getEdge(stages[2], 'bottom').y + 40}, ${getEdge(stages[5], 'top').x} ${getEdge(stages[5], 'top').y - 40}, ${getEdge(stages[5], 'top').x} ${getEdge(stages[5], 'top').y}`, status: 'pending' },
  // Staging to E2E
  { id: 'staging-e2e', d: `M ${getEdge(stages[5], 'right').x} ${getEdge(stages[5], 'right').y} C ${getEdge(stages[5], 'right').x + 40} ${getEdge(stages[5], 'right').y}, ${getEdge(stages[6], 'left').x - 40} ${getEdge(stages[6], 'left').y}, ${getEdge(stages[6], 'left').x} ${getEdge(stages[6], 'left').y}`, status: 'pending' },
  // E2E to Prod
  { id: 'e2e-prod', d: `M ${getEdge(stages[6], 'right').x} ${getEdge(stages[6], 'right').y} C ${getEdge(stages[6], 'right').x + 40} ${getEdge(stages[6], 'right').y}, ${getEdge(stages[7], 'left').x - 40} ${getEdge(stages[7], 'left').y}, ${getEdge(stages[7], 'left').x} ${getEdge(stages[7], 'left').y}`, status: 'pending' },
  // Prod to Monitor (horizontal connection)
  { id: 'prod-monitor', d: `M ${getEdge(stages[7], 'right').x} ${getEdge(stages[7], 'right').y} C ${getEdge(stages[7], 'right').x + 40} ${getEdge(stages[7], 'right').y}, ${getEdge(stages[8], 'left').x - 40} ${getEdge(stages[8], 'left').y}, ${getEdge(stages[8], 'left').x} ${getEdge(stages[8], 'left').y}`, status: 'pending' },
];

// Define nodeTypes outside component to prevent recreation warnings
const nodeTypes = {
  pipelineStage: PipelineNode,
};

const PipelineShowcase: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentStage, setCurrentStage] = useState<string | null>(null);
  const [currentMessage, setCurrentMessage] = useState('Pipeline ready to run');
  const timeoutRefs = useRef<number[]>([]);
  const [failedStageIndex, setFailedStageIndex] = useState<number | null>(null);

  // Optimized layout: better spacing and positioning
  const stageYTop = 50;
  const stageYBottom = 250;
  const stageSpacing = 320;
  
  // Responsive left margin: centered on desktop, left-aligned on mobile
  const [leftMargin, setLeftMargin] = useState(250);
  
  useEffect(() => {
    const updateMargin = () => {
      const mobile = window.innerWidth <= 768;
             if (mobile) {
        setLeftMargin(100); // Better mobile spacing
      } else {
        setLeftMargin(200); // Better desktop centering with new spacing
      }
    };
    
    updateMargin();
    window.addEventListener('resize', updateMargin);
    return () => window.removeEventListener('resize', updateMargin);
  }, []);

  // 1. Define initialStages at the top - recalculate when leftMargin changes
  const initialStages: PipelineStage[] = useMemo(() => [
    { id: 'source', name: 'Source Control', subtitle: 'Git Push', x: leftMargin + 0 * stageSpacing, y: stageYTop, status: 'pending', duration: 2 },
    { id: 'build', name: 'Build', subtitle: 'Compile & Package', x: leftMargin + 1 * stageSpacing, y: stageYTop, status: 'pending', duration: 3 },
    { id: 'test', name: 'Test', subtitle: 'Unit & Integration', x: leftMargin + 2 * stageSpacing, y: stageYTop, status: 'pending', duration: 4 },
    { id: 'security', name: 'Security Scan', subtitle: 'SAST & DAST', x: leftMargin + 3 * stageSpacing, y: stageYTop, status: 'pending', duration: 3 },
    { id: 'artifact', name: 'Artifact Store', subtitle: 'Docker Registry', x: leftMargin + 4 * stageSpacing, y: stageYTop, status: 'pending', duration: 2 },
    { id: 'deploy-staging', name: 'Deploy Staging', subtitle: 'Kubernetes', x: leftMargin + 1.2 * stageSpacing, y: stageYBottom, status: 'pending', duration: 3 },
    { id: 'e2e-test', name: 'E2E Tests', subtitle: 'Selenium', x: leftMargin + 2.4 * stageSpacing, y: stageYBottom, status: 'pending', duration: 4 },
    { id: 'deploy-prod', name: 'Deploy Production', subtitle: 'Blue/Green', x: leftMargin + 3.6 * stageSpacing, y: stageYBottom, status: 'pending', duration: 3 },
    { id: 'monitor', name: 'Monitor', subtitle: 'Prometheus & Grafana', x: leftMargin + 4.8 * stageSpacing, y: stageYBottom, status: 'pending', duration: 1 },
  ], [leftMargin]);

  // 2. Initialize stages and connectors in the correct order
  const [stages, setStages] = useState<PipelineStage[]>(initialStages);
  const [connectors, setConnectors] = useState<PipelineConnector[]>(() => createConnectors(initialStages));
  
  // Update stages when leftMargin changes
  useEffect(() => {
    setStages(initialStages);
    setConnectors(createConnectors(initialStages));
  }, [initialStages]);

  // Map stage IDs to their icons
  const stageIcons: Record<string, IconType> = {
    source: FaGit,
    build: FaCogs,
    test: FaVial,
    security: FaShieldAlt,
    artifact: FaBoxOpen,
    'deploy-staging': FaCloudUploadAlt,
    'e2e-test': FaRobot,
    'deploy-prod': FaRocket,
    monitor: FaChartBar,
  };

  // Convert stages to ReactFlow nodes
  const reactFlowNodes: Node<PipelineNodeData>[] = useMemo(() => 
    stages.map((stage, index) => ({
      id: stage.id,
      type: 'pipelineStage',
      position: { x: stage.x - 110, y: stage.y }, // ReactFlow positions from top-left
      data: {
        stage,
        icon: stageIcons[stage.id],
        stepNumber: index + 1
      },
      draggable: false // Prevent dragging to maintain exact positioning
    })), [stages]
  );

  // Convert connectors to ReactFlow edges with proper source/target mapping
  const reactFlowEdges: Edge[] = useMemo(() => {
    const edgeMapping = [
      { id: 'source-build', source: 'source', target: 'build' },
      { id: 'build-test', source: 'build', target: 'test' },
      { id: 'test-security', source: 'test', target: 'security' },
      { id: 'security-artifact', source: 'security', target: 'artifact' },
      { id: 'test-staging', source: 'test', target: 'deploy-staging' },
      { id: 'staging-e2e', source: 'deploy-staging', target: 'e2e-test' },
      { id: 'e2e-prod', source: 'e2e-test', target: 'deploy-prod' },
      { id: 'prod-monitor', source: 'deploy-prod', target: 'monitor' }
    ];
    
    return edgeMapping.map(edge => {
      const connector = connectors.find(c => c.id === edge.id);
      const status = connector?.status || 'pending';
      
      return {
        id: edge.id,
        source: edge.source,
        target: edge.target,
        type: 'smoothstep',
        className: status,
        animated: status === 'filling',
        style: {
          strokeWidth: 4,
          stroke: status === 'filled' ? '#4ade80' : 
                 status === 'filling' ? '#39cccc' : 
                 '#94a3b8',
          strokeDasharray: status === 'filled' ? 'none' : '10,5',
          strokeOpacity: 1,
          zIndex: 10
        }
      };
    });
  }, [connectors]);

  // When resetting pipeline, also reset connectors
  const resetPipeline = () => {
    timeoutRefs.current.forEach(timeout => clearTimeout(timeout));
    timeoutRefs.current = [];
    setStages(prev => prev.map(stage => ({ ...stage, status: 'pending' })));
    setConnectors(createConnectors(stages.map(stage => ({ ...stage, status: 'pending' }))));
    setCurrentStage(null);
    setCurrentMessage('Pipeline ready to run');
    setFailedStageIndex(null); // Clear failed stage index on reset
    setIsRunning(false); // Reset running state to allow starting again
  };

  // Descriptive failure reasons for each stage (multiple scenarios)
  const failureReasons: Record<string, string[]> = {
    source: [
      'Git push failed due to network connectivity issues.',
      'Git push failed because of an authentication error.',
      'Git push failed: missing write permissions on the repository.',
    ],
    build: [
      'Build failed due to a compilation error in the source code.',
      'Build failed: missing dependency detected from the previous stage.',
      'Build failed due to insufficient memory on the build server.',
    ],
    test: [
      'Tests failed: a critical unit test assertion did not pass.',
      'Tests failed: an integration test could not connect to a mocked service.',
      'Tests failed due to a timeout waiting for async operations.',
    ],
    security: [
      'Security scan found high-severity vulnerabilities (e.g., outdated dependency).',
      'Security scan flagged a misconfiguration in static application security testing.',
      'Security scan detected hardcoded secrets in the codebase.',
    ],
    artifact: [
      'Artifact push failed due to registry credentials misconfiguration.',
      'Artifact push failed: Docker daemon not running on the server.',
      'Artifact push failed due to insufficient storage space in the registry.',
    ],
    'deploy-staging': [
      'Staging deployment timed out while pulling the Docker image.',
      'Staging deployment failed: Kubernetes configuration error.',
      'Staging deployment failed due to missing environment variables.',
    ],
    'e2e-test': [
      'E2E tests failed: Selenium could not locate an element.',
      'E2E tests failed: authentication flow broke in the staging environment.',
      'E2E tests failed due to a timeout waiting for page load.',
    ],
    'deploy-prod': [
      'Production deployment failed: blue/green switch did not complete.',
      'Production deployment failed: health check endpoint returned an error.',
      'Production deployment failed due to insufficient cluster capacity.',
    ],
    monitor: [
      'Monitoring setup failed: Grafana dashboards misconfigured.',
      'Monitoring setup failed: Prometheus scrape targets not reachable.',
      'Monitoring setup failed due to an invalid configuration file.',
    ],
  };

  const simulatePipeline = async () => {
    if (isRunning) return;

    // If there was a failed stage, resume from there
    let startIndex = 0;
    if (failedStageIndex !== null) {
      startIndex = failedStageIndex;
      setCurrentMessage('Retrying failed stage...');
    } else {
      resetPipeline();
      setCurrentMessage('Pipeline started...');
    }
    setIsRunning(true);

    const pipelineFlow = [
      { stage: 'source', connector: 'source-build' },
      { stage: 'build', connector: 'build-test' },
      { stage: 'test', connector: 'test-security', branchConnector: 'test-staging' },
      { stage: 'security', connector: 'security-artifact' },
      { stage: 'artifact' },
      { stage: 'deploy-staging', connector: 'staging-e2e' },
      { stage: 'e2e-test', connector: 'e2e-prod' },
      { stage: 'deploy-prod', connector: 'prod-monitor' },
      { stage: 'monitor' }
    ];

    let totalDelay = 0;

    for (let i = startIndex; i < pipelineFlow.length; i++) {
      const flowItem = pipelineFlow[i];
      const stage = stages.find(s => s.id === flowItem.stage);
      if (!stage) continue;

      // Start stage
      const startTimeout = setTimeout(() => {
        setStages(prev => prev.map(s =>
          s.id === flowItem.stage ? { ...s, status: 'running' } : s
        ));
        setCurrentStage(flowItem.stage);
        setCurrentMessage(`Running: ${stage.name} - ${stage.subtitle}`);
      }, totalDelay * 1000);

      timeoutRefs.current.push(startTimeout);

      // Complete stage
      const completeTimeout = setTimeout(() => {
        const success = Math.random() > 0.1; // 90% success rate
        setStages(prev => prev.map(s =>
          s.id === flowItem.stage ? { ...s, status: success ? 'success' : 'failed' } : s
        ));

        if (!success) {
          // Show descriptive failure scenario and allow retry
          const reasons = failureReasons[stage.id] || ['An unexpected error occurred.'];
          const reason = reasons[Math.floor(Math.random() * reasons.length)];
          setCurrentMessage(`❌ ${stage.name} failed: ${reason} Click "Simulate Pipeline" to retry.`);
          setFailedStageIndex(i); // Track failed stage index
          // Stop and clear all pending timeouts
          timeoutRefs.current.forEach(t => clearTimeout(t));
          timeoutRefs.current = [];
          setIsRunning(false);
          return;
        }

        setFailedStageIndex(null); // Clear failed stage index on success

        // Start filling connector
        setConnectors(prev => prev.map(c =>
          c.id === flowItem.connector ? { ...c, status: 'filling' } : c
        ));

        // Handle branch connector (test -> staging)
        if (flowItem.branchConnector) {
          setConnectors(prev => prev.map(c =>
            c.id === flowItem.branchConnector ? { ...c, status: 'filling' } : c
          ));
          // Complete branch connector after animation
          setTimeout(() => {
            setConnectors(prev => prev.map(c =>
              c.id === flowItem.branchConnector ? { ...c, status: 'filled' } : c
            ));
          }, 2000);
        }

        // Complete connector after animation
        setTimeout(() => {
          setConnectors(prev => prev.map(c =>
            c.id === flowItem.connector ? { ...c, status: 'filled' } : c
          ));
        }, 2000); // Match animation duration
      }, (totalDelay + stage.duration) * 1000);

      timeoutRefs.current.push(completeTimeout);
      totalDelay += stage.duration + 2; // Add animation time
    }

    // Final completion
    const finalTimeout = setTimeout(() => {
      setCurrentMessage('🎉 Pipeline completed successfully!');
      setCurrentStage(null);
      setIsRunning(false);
      setFailedStageIndex(null); // Clear failed stage index on success
    }, totalDelay * 1000);

    timeoutRefs.current.push(finalTimeout);
  };

  return (
    <ShowcaseSection id="pipeline">
      <ContentContainer>
        <HeaderSection>
          <h2 style={{ color: 'var(--pipeline-cyan)', fontSize: '2.5rem', marginBottom: '0.5rem' }}>
            CI/CD Pipeline Showcase
          </h2>
          <p style={{ color: 'var(--white)', fontSize: '1.1rem' }}>
            An interactive representation of a real DevOps pipeline. Watch the flow from source to production.
          </p>
        </HeaderSection>
        
        <PipelineContainer>
          <ReactFlowWrapper>
            <ReactFlowProvider>
              <ReactFlow
                nodes={reactFlowNodes}
                edges={reactFlowEdges}
                nodeTypes={nodeTypes}
                fitView
                nodesDraggable={false}
                nodesConnectable={false}
                elementsSelectable={false}
                panOnDrag={true}
                preventScrolling={true}
                translateExtent={[[-400, -200], [2000, 600]]}
                minZoom={0.3}
                maxZoom={1.5}
              >
                <Background color="transparent" />
                <Controls showZoom={false} showFitView={true} showInteractive={false} />
              </ReactFlow>
            </ReactFlowProvider>
          </ReactFlowWrapper>
        </PipelineContainer>

        <StatusDisplay>
          <h3>Pipeline Status</h3>
          {isRunning && currentStage && (
            <p className="status-running">Running: {stages.find(s => s.id === currentStage)?.name}</p>
          )}
          {!isRunning && currentMessage && (
            <p className={currentMessage.includes('successfully') ? 'status-success' : 
                         currentMessage.includes('Pipeline ready to run') ? 'status-success' : 'status-failed'}>
              {currentMessage}
            </p>
          )}
          {!isRunning && !currentMessage && (
            <p>Ready to execute pipeline</p>
          )}
        </StatusDisplay>

        <div style={{ textAlign: 'center' }}>
          {(!isRunning && failedStageIndex !== null) ? (
            <SimulateButton onClick={simulatePipeline}>
              Retry
            </SimulateButton>
          ) : (
            <SimulateButton onClick={simulatePipeline} disabled={isRunning}>
              {isRunning ? 'Pipeline Running...' : 'Simulate Pipeline'}
            </SimulateButton>
          )}
          {isRunning && (
            <StopButton onClick={resetPipeline}>
              Stop Pipeline
            </StopButton>
          )}
        </div>
        
        <MobileInstructions>
          💡 Pinch to zoom, drag to pan, and explore the full pipeline on mobile
        </MobileInstructions>
      </ContentContainer>
    </ShowcaseSection>
  );
};

export default PipelineShowcase; 