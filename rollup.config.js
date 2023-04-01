import postcssOKLabFunction from '@csstools/postcss-oklab-function'
import url from '@rollup/plugin-url'
import autoprefixer from 'autoprefixer'
import postcss from 'rollup-plugin-postcss'
import withSolid from 'rollup-preset-solid'

export default withSolid({
  input: 'src/index.tsx',
  targets: ['esm', 'cjs'],
  plugins: [
    postcss({
      plugins: [autoprefixer(), postcssOKLabFunction({ subFeatures: { displayP3: false } })],
    }),
    url(),
  ],
})
