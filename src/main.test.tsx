beforeAll(() => {
  const root = document.createElement('div');
  root.id = 'root';
  document.body.appendChild(root);
});

it('main.tsx should import without error', async () => {
  await expect(import('./main')).resolves.not.toThrow();
}); 