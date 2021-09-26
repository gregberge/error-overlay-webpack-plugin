import esbuild from 'rollup-plugin-esbuild'
import typescript from '@rollup/plugin-typescript'

const name = 'dist/index'

const bundle = (config) => ({
  ...config,
  input: 'src/index.ts',
  external: (id) => !/^[./]/.test(id),
})

const esbuildConfig = {
  target: 'es2015',
}

export default [
  bundle({
    plugins: [esbuild(esbuildConfig), typescript()],
    output: [
      {
        file: `${name}.js`,
        format: 'cjs',
        sourcemap: true,
        exports: 'auto',
      },
      {
        file: `${name}.esm.js`,
        format: 'es',
        sourcemap: true,
      },
    ],
  }),
]
