import '@testing-library/jest-dom';

// Mock the CSS imports that main.tsx uses
jest.mock('./styles/globals.css', () => ({}));
jest.mock('./styles/variables.css', () => ({}));
jest.mock('./styles/pipeline.css', () => ({}));

beforeAll(() => {
  const root = document.createElement('div');
  root.id = 'root';
  document.body.appendChild(root);
});

it('main.tsx should import without error', async () => {
  await expect(import('./main')).resolves.not.toThrow();
}); 