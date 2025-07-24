export const getStatusColor = (status: string) => {
  switch (status) {
    case 'success': return 'var(--success-green)';
    case 'warning': return 'var(--warning-yellow)';
    case 'error': return 'var(--error-red)';
    default: return 'var(--pipeline-cyan)';
  }
}; 