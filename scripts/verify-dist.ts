const distIndex = Bun.file(new URL('../dist/index.js', import.meta.url))

if (!(await distIndex.exists())) {
  throw new Error('dist/index.js is missing. Run `bun run build` first.')
}

const code = await distIndex.text()
const forbiddenTokens = ['react/jsx-dev-runtime', 'jsxDEV']
const foundTokens = forbiddenTokens.filter((token) => code.includes(token))

if (foundTokens.length > 0) {
  throw new Error(
    `dist/index.js still contains development JSX runtime markers: ${foundTokens.join(', ')}`
  )
}

if (!code.includes('react/jsx-runtime')) {
  throw new Error('dist/index.js is not using react/jsx-runtime. Verify the Bun JSX transform.')
}

console.log('Verified dist/index.js uses the production JSX runtime.')
