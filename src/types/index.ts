export interface PipelineStage {
  id: string;
  label: string;
  status: 'success' | 'warning' | 'error';
  position: { x: number; y: number };
}

export interface PipelineEdge {
  id: string;
  source: string;
  target: string;
}

export interface Tool {
  name: string;
  category: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  yearsOfExperience?: number;
  description: string;
  impact: string[];
  projects?: string[];
  icon?: string;
}

export interface SkillCategory {
  name: string;
  description: string;
  tools: Tool[];
  color: string;
}

export interface Project {
  name: string;
  description: string;
  tools: string[];
} 