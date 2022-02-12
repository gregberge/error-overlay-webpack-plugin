import esbuild from 'rollup-plugin-esbuild'

const name = 'dist/index'

const bundle = (config) => ({
  ...config,
  input: 'src/index.js',
  external: (id) => !/^[./]/.test(id),
})

export default [
  bundle({
    plugins: [
      esbuild({
        target: 'es2015',
      }),
    ],
    output: [
      {
        file: `${name}.cjs`,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: `${name}.mjs`,
        format: 'es',
        sourcemap: true,
      },
    ],
  }),
]
