import esbuild from 'rollup-plugin-esbuild'
import copy from 'rollup-plugin-copy'
import dts from "rollup-plugin-dts";

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
  {
    input: "./src/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "es" }],
    plugins: [dts()],
  },
  bundle({
    plugins: [
      esbuild(esbuildConfig),
      copy({
        targets: [
          { src: 'src/entries/**', dest: 'dist/entries' },
        ],
      }),
    ],
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
