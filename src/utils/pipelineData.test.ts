import * as pipelineData from './pipelineData';
describe('pipelineData', () => {
  it('should export an object or array', () => {
    expect(typeof pipelineData === 'object').toBe(true);
  });
}); 