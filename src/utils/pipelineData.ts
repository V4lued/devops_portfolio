export const pipelineStages = [
  { id: '1', type: 'default', data: { label: 'Source', status: 'success' }, position: { x: 0, y: 0 } },
  { id: '2', type: 'default', data: { label: 'Build', status: 'success' }, position: { x: 180, y: 0 } },
  { id: '3', type: 'default', data: { label: 'Test', status: 'success' }, position: { x: 360, y: 0 } },
  { id: '4', type: 'default', data: { label: 'Artifact', status: 'success' }, position: { x: 540, y: 0 } },
  { id: '5', type: 'default', data: { label: 'Deploy', status: 'success' }, position: { x: 720, y: 0 } },
  { id: '6', type: 'default', data: { label: 'Monitor', status: 'success' }, position: { x: 900, y: 0 } },
];

export const pipelineEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3' },
  { id: 'e3-4', source: '3', target: '4' },
  { id: 'e4-5', source: '4', target: '5' },
  { id: 'e5-6', source: '5', target: '6' },
]; 