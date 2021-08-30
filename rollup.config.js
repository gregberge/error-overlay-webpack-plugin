import esbuild from 'rollup-plugin-esbuild'

const name = 'dist/index'

const bundle = (config) => ({
  ...config,
  input: 'src/index.js',
  external: (id) => !/^[./]/.test(id),
})

const esbuildConfig = {
  target: 'es2015',
}

export default [
  bundle({
    plugins: [esbuild(esbuildConfig)],
    output: [
      {
        file: `${name}.js`,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: `${name}.esm.js`,
        format: 'es',
        sourcemap: true,
      },
    ],
  }),
]
